import { EMediaType, TAnime, TBook, TCharacter, TEmote, TGame, TManga, TMediaData, TMovie, TUser } from '@/types';

type TCsvRow = {
  [key: string]: string;
};

const csvToArray = (csvText: string): TCsvRow[] => {
  const rows = csvText
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row !== '');

  if (rows.length < 2) return [];

  const headers = rows[0]
    .split(',')
    .map((header) => header.trim().replace(/^"|"$/g, ''));

  const parseRow = (row: string): TCsvRow => {
    const values = row
      .match(/(?:[^,""]|"(?:[^"]|"")*")+/g)
      ?.map((value) => value.replace(/^"|"$/g, '').replace(/""/g, '"')) || [];

    return headers.reduce((obj: TCsvRow, header: string, idx: number) => {
      obj[header] = values[idx] || '';
      return obj;
    }, {});
  };

  return rows.slice(1).map(parseRow);
};

const fetchSheet = async (sheetId: string, sheetName: string) => {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    return csvToArray(csvText);
  } catch (error) {
    console.error(`Error fetching CSV for ${sheetName}:`, error);
    return [];
  }
};

export const fetchAllSheetsData = async (): Promise<{
  usersData: TUser[];
  mediaData: TMediaData;
}> => {
  const sheetId = process.env.VUE_APP_SHEET_ID || "";
  const sheetNames = [
    'Anime',
    'Books',
    'Characters',
    'Emotes',
    'Games',
    'Manga',
    'Movies',
    'Users',
  ];
  const sheetData: { [key: string]: TCsvRow[]; } = {};

  const fetchPromises = sheetNames.map(async (sheetName: string) => {
    sheetData[sheetName.toLowerCase()] = await fetchSheet(sheetId, sheetName);
  });

  await Promise.all(fetchPromises);

  const usersData = sheetData['users'] as TUser[] || [];
  const mediaData: TMediaData = {
    anime: sheetData['anime'] as unknown as TAnime[] || [],
    books: sheetData['books'] as unknown as TBook[] || [],
    characters: sheetData['characters'] as unknown as TCharacter[] || [],
    emotes: sheetData['emotes'] as unknown as TEmote[] || [],
    games: sheetData['games'] as unknown as TGame[] || [],
    manga: sheetData['manga'] as unknown as TManga[] || [],
    movies: sheetData['movies'] as unknown as TMovie[] || [],
  };

  return { usersData, mediaData };
};

// --- Google Sheets API (direct, using OAuth token) ---

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

/** Sheet names that support write operations */
export const SHEET_NAMES = [
  'Anime',
  'Books',
  'Characters',
  'Emotes',
  'Games',
  'Manga',
  'Movies',
  'Users',
] as const;

export type TSheetName = (typeof SHEET_NAMES)[number];

/** Data for update - keys must match your sheet column headers exactly */
export type TSheetUpdateData = Record<string, string | number | boolean | undefined | null>;

/**
 * Reusable function to update specific fields in any sheet row.
 * Fetches the current row, merges your changes, and writes back.
 * Perfect for form submissions where you only send the fields that changed.
 *
 * Example - from a form that updates anime notes and status:
 *   await updateSheetRow(token, 'Anime', 0, { notes: 'New notes', status: 'Completed' });
 *
 * @param accessToken - Google access token with spreadsheets scope
 * @param sheetName - Sheet tab name (e.g. 'Anime', 'Books', 'Manga')
 * @param rowIndex - 0-based index (0 = first data row in sheet)
 * @param data - Partial object; keys must match sheet column headers exactly
 */
export const updateSheetRow = async (
  accessToken: string,
  sheetName: TSheetName,
  rowIndex: number,
  data: TSheetUpdateData
): Promise<{ success: boolean; error?: string }> => {
  const sheetId = process.env.VUE_APP_SHEET_ID || '';
  if (!sheetId) {
    return { success: false, error: 'VUE_APP_SHEET_ID not configured' };
  }

  const sheetRow = rowIndex + 2; // row 1 = headers, row 2 = first data

  try {
    // 1. Fetch header row to get column order
    const headersRes = await fetch(
      `${SHEETS_API_BASE}/${sheetId}/values/${sheetName}!1:1?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!headersRes.ok) {
      const err = await headersRes.json().catch(() => ({}));
      return { success: false, error: err.error?.message || `Headers fetch failed: ${headersRes.status}` };
    }
    const headersData = await headersRes.json();
    const headers: string[] = headersData.values?.[0] || [];

    // 2. Fetch current row
    const rowRes = await fetch(
      `${SHEETS_API_BASE}/${sheetId}/values/${sheetName}!${sheetRow}:${sheetRow}?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!rowRes.ok) {
      const err = await rowRes.json().catch(() => ({}));
      return { success: false, error: err.error?.message || `Row fetch failed: ${rowRes.status}` };
    }
    const rowData = await rowRes.json();
    const currentRow: string[] = rowData.values?.[0] || [];

    // 3. Merge updates into row - only fields in data are changed
    const dataStr: Record<string, string> = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== undefined && v !== null) dataStr[k] = String(v);
    }
    const newRow = headers.map((h, i) => (h in dataStr ? dataStr[h] : (currentRow[i] ?? '')));

    // 4. Write back
    const colToLetter = (n: number) => {
      let s = '';
      while (n > 0) {
        n--;
        s = String.fromCharCode(65 + (n % 26)) + s;
        n = Math.floor(n / 26);
      }
      return s || 'A';
    };
    const endCol = colToLetter(newRow.length);
    const updateRes = await fetch(
      `${SHEETS_API_BASE}/${sheetId}/values/${sheetName}!A${sheetRow}:${endCol}${sheetRow}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [newRow] }),
      }
    );

    if (!updateRes.ok) {
      const err = await updateRes.json().catch(() => ({}));
      return { success: false, error: err.error?.message || `Update failed: ${updateRes.status}` };
    }
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error updating ${sheetName} row:`, error);
    return { success: false, error: message };
  }
};

/**
 * Map EMediaType to the corresponding sheet tab name.
 * Use when calling updateSheetRow from a form that has mediaType.
 */
export const getSheetNameForMediaType = (mediaType: EMediaType): TSheetName => {
  const map: Record<EMediaType, TSheetName> = {
    [EMediaType.ANIME]: 'Anime',
    [EMediaType.BOOK]: 'Books',
    [EMediaType.CHARACTER]: 'Characters',
    [EMediaType.GAME]: 'Games',
    [EMediaType.MANGA]: 'Manga',
    [EMediaType.MOVIE]: 'Movies',
  };
  return map[mediaType];
};

/**
 * Find the row index of a media item in its list (matches sheet order).
 * Uses title+owner+link for matching to handle duplicates.
 */
export const findMediaRowIndex = (
	mediaType: EMediaType,
	media: Record<string, unknown>,
	list: Record<string, unknown>[]
): number => {
	const title = String(media.title ?? (media as Record<string, unknown>).name ?? '');
	const owner = String(media.owner ?? '');
	const link = String(media.link ?? '');
	return list.findIndex((item) => {
		const it = String(item.title ?? (item as Record<string, unknown>).name ?? '');
		const io = String(item.owner ?? '');
		const il = String(item.link ?? '');
		return it === title && io === owner && il === link;
	});
};

/**
 * Convenience wrapper for updating Anime rows.
 * @see updateSheetRow
 */
export const updateAnimeRow = async (
  accessToken: string,
  rowIndex: number,
  data: TSheetUpdateData
): Promise<{ success: boolean; error?: string }> =>
  updateSheetRow(accessToken, 'Anime', rowIndex, data);

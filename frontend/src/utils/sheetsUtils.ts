type TCsvRow = {
  [key: string]: string;
};

type TMediaData = {
  anime: TCsvRow[];
  books: TCsvRow[];
  characters: TCsvRow[];
  emotes: TCsvRow[];
  games: TCsvRow[];
  manga: TCsvRow[];
  movies: TCsvRow[];
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

const fetchSheet = async (sheetId: string, sheetName: string): Promise<TCsvRow[]> => {
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
  usersData: TCsvRow[];
  mediaData: TMediaData;
}> => {
  const sheetId = process.env.VUE_APP_SHEET_ID;
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

  const usersData = sheetData['users'] || [];
  const mediaData = {
    anime: sheetData['anime'] || [],
    books: sheetData['books'] || [],
    characters: sheetData['characters'] || [],
    emotes: sheetData['emotes'] || [],
    games: sheetData['games'] || [],
    manga: sheetData['manga'] || [],
    movies: sheetData['movies'] || [],
  };

  return { usersData, mediaData };
};

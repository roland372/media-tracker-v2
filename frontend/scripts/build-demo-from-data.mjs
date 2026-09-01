/**
 * One-off: parse data.txt and write static demo JSON with randomized volatile fields.
 * Run: node scripts/build-demo-from-data.mjs "path/to/data.txt"
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/demo');
const dataPath = process.argv[2];

if (!dataPath) {
  console.error('Usage: node scripts/build-demo-from-data.mjs <path-to-data.txt>');
  process.exit(1);
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randBool = (trueChance = 0.2) => Math.random() < trueChance;

const randomDate = () => {
  const start = new Date('2015-01-01').getTime();
  const end = new Date('2026-08-31').getTime();
  const d = new Date(start + Math.random() * (end - start));
  return d.toISOString().slice(0, 10);
};

const randomDatePair = () => {
  const created = randomDate();
  const updatedStart = new Date(created).getTime();
  const end = new Date('2026-08-31').getTime();
  const updated = new Date(updatedStart + Math.random() * (end - updatedStart));
  return { createdAt: created, updatedAt: updated.toISOString().slice(0, 10) };
};

const parseTsvLine = (line) => line.split('\t');

const parseSection = (lines, startIndex) => {
  let i = startIndex;
  while (i < lines.length && lines[i].trim() === '') i++;
  if (i >= lines.length) return { rows: [], nextIndex: i };

  const headers = parseTsvLine(lines[i]);
  const rows = [];
  i++;
  while (i < lines.length && lines[i].trim() !== '') {
    const values = parseTsvLine(lines[i]);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });
    rows.push(row);
    i++;
  }
  return { rows, nextIndex: i };
};

const ANIME_STATUSES = ['Watching', 'Completed', 'On-Hold', 'Dropped', 'Plan to Watch'];
const BOOK_STATUSES = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'];
const GAME_STATUSES = ['Playing', 'Completed', 'On-Hold', 'Dropped', 'Plan to Play'];
const MANGA_STATUSES = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'];
const MOVIE_STATUSES = ['Watching', 'Completed', 'On-Hold', 'Dropped', 'Plan to Watch'];

const randomizeEpisodes = (status, maxHint) => {
  const max = Math.max(1, maxHint || randInt(1, 24));
  if (status === 'Plan to Watch') return { episodesMin: '0', episodesMax: String(max) };
  if (status === 'Completed') {
    const ep = maxHint > 0 ? maxHint : randInt(1, 24);
    return { episodesMin: String(ep), episodesMax: String(ep) };
  }
  if (status === 'Watching') {
    const min = randInt(1, Math.max(1, max - 1));
    return { episodesMin: String(min), episodesMax: String(max) };
  }
  if (status === 'Dropped' || status === 'On-Hold') {
    const min = randInt(0, Math.max(0, max - 1));
    return { episodesMin: String(min), episodesMax: String(max) };
  }
  return { episodesMin: '0', episodesMax: String(max) };
};

const randomizeMangaProgress = (status, row) => {
  const chaptersMaxHint = Number(row.chaptersMax) || randInt(10, 200);
  const volumesMaxHint = Number(row.volumesMax) || randInt(1, 30);

  if (status === 'Plan to Read') {
    return {
      chaptersMin: '0',
      chaptersMax: String(chaptersMaxHint || 0),
      volumesMin: '0',
      volumesMax: String(volumesMaxHint || 0),
    };
  }
  if (status === 'Completed') {
    return {
      chaptersMin: String(chaptersMaxHint),
      chaptersMax: String(chaptersMaxHint),
      volumesMin: String(volumesMaxHint),
      volumesMax: String(volumesMaxHint),
    };
  }
  const chMin = randInt(0, Math.max(0, chaptersMaxHint - 1));
  const volMin = randInt(0, Math.max(0, volumesMaxHint - 1));
  return {
    chaptersMin: String(chMin),
    chaptersMax: String(chaptersMaxHint),
    volumesMin: String(volMin),
    volumesMax: String(volumesMaxHint),
  };
};

const randomizeSeasons = (status, type, row) => {
  if (type !== 'TV-Show') {
    return { episodesMin: '0', episodesMax: '0', seasonsMin: '0', seasonsMax: '0' };
  }
  const seasonsMax = Number(row.seasonsMax) || randInt(1, 4);
  const episodesMax = Number(row.episodesMax) || randInt(6, 24);
  const ep = randomizeEpisodes(status, episodesMax);
  if (status === 'Completed') {
    return {
      ...ep,
      seasonsMin: String(seasonsMax),
      seasonsMax: String(seasonsMax),
    };
  }
  return {
    ...ep,
    seasonsMin: String(randInt(0, seasonsMax)),
    seasonsMax: String(seasonsMax),
  };
};

const omitFields = (row, fields) => {
  const copy = { ...row };
  for (const f of fields) delete copy[f];
  return copy;
};

const transformAnime = (rows) =>
  rows.map((row) => {
    const status = pick(ANIME_STATUSES);
    const dates = randomDatePair();
    const maxHint = Number(row.episodesMax) || Number(row.episodesMin) || 0;
    const episodes = randomizeEpisodes(status, maxHint);
    return omitFields(
      {
        ...row,
        status,
        favourites: randBool() ? 'TRUE' : 'FALSE',
        ...episodes,
        ...dates,
      },
      ['notes']
    );
  });

const transformBooks = (rows) =>
  rows.map((row) => {
    const status = pick(BOOK_STATUSES);
    const dates = randomDatePair();
    const pages = Number(row.pages) > 0 ? String(randInt(150, 900)) : String(randInt(200, 600));
    return omitFields(
      {
        ...row,
        status,
        favourites: randBool() ? 'TRUE' : 'FALSE',
        pages,
        ...dates,
      },
      ['notes']
    );
  });

const transformCharacters = (rows) =>
  rows.map((row) => {
    const dates = randomDatePair();
    return {
      ...row,
      favourites: randBool() ? 'TRUE' : 'FALSE',
      ...dates,
    };
  });

const transformGames = (rows) =>
  rows.map((row) => {
    const status = pick(GAME_STATUSES);
    const dates = randomDatePair();
    let playtime;
    if (status === 'Plan to Play') playtime = '0';
    else if (status === 'Playing') playtime = String(randInt(1, 40));
    else playtime = String(randInt(1, 80) + Math.random());
    playtime = String(Math.round(Number(playtime) * 10) / 10);
    return omitFields(
      {
        ...row,
        status,
        favourites: randBool() ? 'TRUE' : 'FALSE',
        playtime,
        musicDownloaded: pick(['Skip', 'Completed', 'Todo', '']),
        ...dates,
      },
      ['notes']
    );
  });

const transformManga = (rows) =>
  rows.map((row) => {
    const status = pick(MANGA_STATUSES);
    const dates = randomDatePair();
    const progress = randomizeMangaProgress(status, row);
    return omitFields(
      {
        ...row,
        status,
        favourites: randBool() ? 'TRUE' : 'FALSE',
        ...progress,
        ...dates,
      },
      ['notes']
    );
  });

const transformMovies = (rows) =>
  rows.map((row) => {
    const status = pick(MOVIE_STATUSES);
    const dates = randomDatePair();
    const seasons = randomizeSeasons(status, row.type, row);
    return omitFields(
      {
        ...row,
        status,
        favourites: randBool() ? 'TRUE' : 'FALSE',
        ...seasons,
        ...dates,
      },
      ['notes']
    );
  });

const content = readFileSync(dataPath, 'utf8');
const lines = content.split(/\r?\n/);

const sections = {};
const markers = ['anime', 'books', 'characters', 'games', 'movies'];
let i = 0;

while (i < lines.length) {
  const trimmed = lines[i].trim();
  if (markers.includes(trimmed)) {
    const sectionName = trimmed;
    i++;
    const { rows, nextIndex } = parseSection(lines, i);
    sections[sectionName] = rows;
    i = nextIndex;
    continue;
  }

  // Manga block (no section marker): header contains chaptersMin
  if (trimmed.startsWith('title\t') && trimmed.includes('chaptersMin') && !sections.manga) {
    const { rows, nextIndex } = parseSection(lines, i);
    sections.manga = rows;
    i = nextIndex;
    continue;
  }

  i++;
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const outputs = [
  ['anime.json', transformAnime(sections.anime || [])],
  ['books.json', transformBooks(sections.books || [])],
  ['characters.json', transformCharacters(sections.characters || [])],
  ['games.json', transformGames(sections.games || [])],
  ['manga.json', transformManga(sections.manga || [])],
  ['movies.json', transformMovies(sections.movies || [])],
];

for (const [file, data] of outputs) {
  writeFileSync(join(OUTPUT_DIR, file), JSON.stringify(data, null, 2));
  console.log(`Wrote ${data.length} records to ${file}`);
}

console.log('Done.');

import { TMediaData } from '@/types';

const DEMO_FILES: (keyof TMediaData)[] = [
  'anime',
  'books',
  'characters',
  'games',
  'manga',
  'movies',
];

export async function loadDemoMediaData(): Promise<TMediaData> {
  const entries = await Promise.all(
    DEMO_FILES.map(async (key) => {
      const response = await fetch(`/demo/${key}.json`);
      if (!response.ok) {
        console.error(`Failed to load demo data: ${key}.json`);
        return [key, []] as const;
      }
      const data = await response.json();
      return [key, data] as const;
    })
  );

  return Object.fromEntries(entries) as TMediaData;
}

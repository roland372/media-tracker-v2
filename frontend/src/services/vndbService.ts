export interface VNDBResponse {
  results: Array<{
    id: string;
    title: string;
    description: string;
    image: {
      url: string;
    };
    rating: number;
    votecount: number;
    length: number;
    length_minutes: number;
    length_votes: number;
    released: string;
    languages: string[];
    platforms: string[];
    developers: Array<{
      name: string;
      original: string;
    }>;
  }>;
}

export const fetchVNDBInfo = async (title: string): Promise<VNDBResponse | null> => {
  try {
    const response = await fetch('https://api.vndb.org/kana/vn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: ["search", "=", title],
        fields: "title, description, image.url, length, length_minutes, length_votes, released, developers.name, developers.original",
        results: 1
      }),
    });

    if (!response.ok) {
      throw new Error('VNDB API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching VNDB data:', error);
    return null;
  }
}; 

const dev = process.env.NODE_ENV !== 'production';
export const API_BASE_URL = dev
  ? 'http://localhost:3000/api'
  : 'https://anton-advent-calendar.vercel.app/api';

type ConverterFunction<T> = (res: T) => T;

export const fetchApi = async <T>(
  path: string,
  converter?: ConverterFunction<T>,
  revalidate?: number
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path} `);
  }

  if (converter) {
    return converter(await res.json());
  }

  return res.json();
};

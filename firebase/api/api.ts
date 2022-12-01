export const API_BASE_URL = 'http://localhost:3000/api';

type ConverterFunction<T> = (res: T) => T;

export const fetchApi = async <T>(
  path: string,
  converter?: ConverterFunction<T>
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}/${path}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  if (converter) {
    return converter(await res.json());
  }

  return res.json();
};

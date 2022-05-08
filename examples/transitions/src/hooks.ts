import { useState, useEffect } from "react";

type Movie = {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
};

type Movies = { items: Movie[] };

async function getMovies(): Promise<Movies> {
  return await fetch(
    `https://imdb-api.com/en/API/Top250Movies/${
      import.meta.env.VITE_IMDB_API_KEY
    }`
  ).then((res) => res.json());
}

export function useFetchMovies(): [
  movies: Movies | undefined,
  loading: boolean
] {
  const [movies, setMovies] = useState<Movies | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setMovies(await getMovies());
      setLoading(false);
    }
    getData();
  }, []);

  return [movies, loading];
}

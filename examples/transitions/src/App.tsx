import { useState, useTransition, useEffect, ChangeEvent } from "react";

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
const array = Array.from(Array(50).keys());

function Loading() {
  return (
    <svg
      className="animate-spin ml-3 mr-3 h-8 w-8 text-red-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

async function getMovies(): Promise<Movies> {
  return await fetch(
    `https://imdb-api.com/en/API/Top250Movies/${
      import.meta.env.VITE_IMDB_API_KEY
    }`
  ).then((res) => res.json());
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState("");
  const [movies, setMovies] = useState<Movies | undefined>();

  useEffect(() => {
    async function getData() {
      setMovies(await getMovies());
    }
    getData();
  }, []);

  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setQuery(value);
    startTransition(() => {
      setHighlight(value);
    });
  }

  return (
    <div>
      <div className="p-8 text-slate-800">
        <div className="text-3xl font-bold pb-3">
          React 18 Transitions Example
        </div>
        <div className="pb-2 flex items-center">
          <div>
            <input
              placeholder="Search top 250 Movies"
              type="text"
              onChange={handleChange}
              value={query}
              className="border-2 rounded-lg p-2"
            />
          </div>
          {isPending && <Loading />}
        </div>
        <div className="space-y-2">
          {array.map(() => {
            return (
              <>
                {movies?.items.map(({ title }) => {
                  const index = title
                    .toLowerCase()
                    .indexOf(highlight.toLowerCase());
                  if (index === -1) {
                    return <div>{title}</div>;
                  }
                  return (
                    <div>
                      {title.slice(0, index)}{" "}
                      <span className="bg-red-800 text-white">
                        {title.slice(index, index + highlight.length)}
                      </span>
                      {title.slice(index + highlight.length)}
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default App;

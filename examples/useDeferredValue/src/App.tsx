import {
  useState,
  useTransition,
  ChangeEvent,
  Fragment,
  useDeferredValue,
} from "react";
import Loading from "./Loading";
import { useFetchMovies } from "./hooks";

const array = Array.from(Array(10).keys());

function App() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState("");
  const [movies, loading] = useFetchMovies();

  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setQuery(value);
    startTransition(() => {
      setHighlight(value);
    });
  }

  const deferredValue = useDeferredValue(highlight);

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

        {loading && <Loading />}
        {!loading && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {array.map((idx) => {
                return (
                  <Fragment key={idx}>
                    {movies?.items.map(({ title, id, imDbRating, image }) => {
                      const index = title
                        .toLowerCase()
                        .indexOf(deferredValue.toLowerCase());
                      if (index === -1) return;

                      return (
                        <li key={id}>
                          <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  {title.slice(0, index)}{" "}
                                  <span className="bg-red-800 text-white">
                                    {title.slice(
                                      index,
                                      index + deferredValue.length
                                    )}
                                  </span>
                                  {title.slice(index + deferredValue.length)}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    <img src={image} loading="lazy" />
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>{imDbRating}</p>
                                </div>
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;

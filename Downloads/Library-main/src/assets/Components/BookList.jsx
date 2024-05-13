import book from "../../assets/bookcover.jpeg";
import useFetch from "../../hooks/useFetch.js";
import { Link } from "react-router-dom";
export default function BookList() {

  let search = 'Laravel from scratch';

  let { data: books, loading, error } = useFetch(`http://localhost:3000/books?q=${search}`);

      {error && <p>{error}</p>}
      {loading && <p>Loading....</p>}
  return (
    <>
        
      {!!books && (
        <div className="grid grid-cols-4 gap-4 my-3 mx-[40px] " >
          {books.map((b) => (
            // eslint-disable-next-line react/jsx-key
            <Link to={`/books/${b.id}`} key={b.id}>
                <img src={book} alt="" className="w-full " />
                <div className="text-center">
                  <h2>{b.title}</h2>
                  <h2>{b.description}</h2>
                </div>
                <div className="flex flex-wrap text-center">
                  {b.categories.map((c) => (
                    <div
                      key={c}
                      className="text-black rounded-full border bg-blue-400 gap-3 p-3 space-x-4"
                    >
                      {c}
                    </div>
                  ))}
                </div>
            
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

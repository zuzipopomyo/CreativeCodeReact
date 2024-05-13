import book from "../../assets/bookcover.jpeg";
import useFetch from "../../hooks/useFetch.js";
import { Link, useLocation } from "react-router-dom";

export default function BookList() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let search = params.get('search');

    let { data: books, loading, error } = useFetch(`http://localhost:3000/books${search ? `?title=${search}` : ""}`);

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>Loading....</p>}
            
            {books && books.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 my-3 mx-[40px]">
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <img src={book} alt="" className="w-full" />
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
            ) : (
                <p className="text-center">There are no books available.</p>
            )}
        </>
    );
}

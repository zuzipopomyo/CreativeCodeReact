import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme.js";
import trashIcon from '../../img/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import editIcon from '../../img/edit_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import useFireStore from "../../hooks/useFireStore.js";
import { AuthContext } from '../../Contexts/AuthContext.jsx';

export default function BookList() {
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const params = new URLSearchParams(location.search);

    // For using user
    // const { user } = useContext(AuthContext);
    // Use Firestore hook
    // const { getCollection, deleteDocument } = useFireStore();
    // // Fetch books for the current user
    // const { error, loading, data: books } = getCollection('books', ['uid', '==', user?.uid]);

    let { getCollection, deleteDocument } = useFireStore();

    let { user } = useContext(AuthContext);
    let { error, data: books, loading } = getCollection('books',['uid','==',user.uid]);



    // Function to delete a book
    const deleteBook = async (e, id) => {
        e.preventDefault();
        await deleteDocument('books', id);
    };

    // Get theme
    const { isDark } = useTheme();

    return (
        <>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center">Loading....</p>}

            {books && books.length > 0 ? (
                <div className={`grid grid-cols-4 gap-4 my-3 mx-[40px]`}>
                    {books.map((b) => (
                        <div key={b.id} className={`border-2 ${isDark ? "border-blue-400" : ''} p-3`}>
                            <Link to={`/books/${b.id}`}>
                                <img src={b.cover} alt="Book cover" className="w-full" />
                                <div className={`text-center ${isDark ? 'text-white' : ""}`}>
                                    <h2>{b.title}</h2>
                                    <p>{b.description}</p>
                                </div>
                            </Link>
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {b.categories.map((c) => (
                                        <span
                                            key={c}
                                            className="text-black rounded-full border bg-blue-400 p-2"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex space-x-3">
                                    <Link to={`/edit/${b.id}`}>
                                        <img src={editIcon} alt="Edit" className="w-6 h-6" />
                                    </Link>
                                    <button onClick={(e) => deleteBook(e, b.id)}>
                                        <img src={trashIcon} alt="Delete" className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">There are no books available.</p>
            )}
        </>
    );
}

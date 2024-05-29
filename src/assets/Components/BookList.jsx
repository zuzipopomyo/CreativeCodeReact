/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme.js";
import { db } from '../../assets/firebase/index.js';
import { collection, deleteDoc, orderBy, query, doc, onSnapshot } from 'firebase/firestore';
import bookCover from "../../assets/bookcover.jpeg";
import trashIcon from '../../img/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import editIcon from '../../img/edit_24dp_FILL0_wght400_GRAD0_opsz24.svg';

export default function BookList() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    // let search = params.get('search');

    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    let [books, setBooks] = useState([]);

    //firebase delete
    let deleteBook = async (e, id) => {
        e.preventDefault();
        try {
            let ref = doc(db, 'books', id);
            await deleteDoc(ref);
            setBooks(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            setError('Failed to delete the book.');
        }
    };

    useEffect(() => {
        setLoading(true);
        let ref = collection(db, 'books');
        let q = query(ref, orderBy('date', 'desc'));
        let unsubscribe = onSnapshot(q, snapshot => {
            if (snapshot.empty) {
                setError('No documents found');
                setLoading(false);
            } else {
                let books = [];
                snapshot.forEach(doc => {
                    let book = { id: doc.id, ...doc.data() };
                    books.push(book);
                });
                setBooks(books);
                setLoading(false);
                setError('');
            }
        }, (err) => {
            setError('Failed to load books.');
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    let { isDark } = useTheme();

    return (
        <>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center">Loading....</p>}
            
            {books && books.length > 0 ? (
                <div className={`grid grid-cols-4 gap-4 my-3 mx-[40px]`}>
                    {books.map((b) => (
                        <div key={b.id} className={`border-2 ${isDark ? "border-blue-400" : ''} p-3`}>
                            <Link to={`/books/${b.id}`}>
                                <img src={bookCover} alt="Book cover" className="w-full" />
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

/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme.js";
import { db } from '../../assets/firebase/index.js';
import { collection, deleteDoc, getDocs, orderBy, query, doc } from 'firebase/firestore';
import book from "../../assets/bookcover.jpeg";
import trash from '../../img/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg';

export default function BookList() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let search = params.get('search');

    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    let [books, setBooks] = useState([]);

    //firebase delete
    let deleteBook = async (e, id) => {
        e.preventDefault();
        //backend delete
        let ref = doc(db, 'books', id);
        await deleteDoc(ref);
        //frontend delete
        setBooks(prev => prev.filter(b=> b.id !== id))
    };

    useEffect(function () {
        setLoading(true);
        let ref = collection(db, 'books');
        let q = query(ref, orderBy('date', 'desc'));
        getDocs(q).then(docs => {
            if (docs.empty) {
                setError('no documents found');
                setLoading(false);
            } else {
                let books = [];
                docs.forEach(doc => {
                    let book = { id: doc.id, ...doc.data() };
                    books.push(book);
                });
                setBooks(books);
                setLoading(false);
                setError('');
            }
        });
    }, []);

    let { isDark } = useTheme();

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>Loading....</p>}
            
            {books && books.length > 0 ? (
                <div className={`grid grid-cols-4 gap-4 my-3 mx-[40px]`}>
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id} className={`border-2 ${isDark ? "border-blue-400" : ''}`}>
                            <img src={book} alt="" className="w-full p-3" />
                            <div className={`text-center ${isDark ? 'text-white' : ""}`}>
                                <h2>{b.title}</h2>
                                <h2>{b.description}</h2>
                            </div>
                            <div className="flex">
                                <div className="flex justify-between items-center gap-10">
                                    <div className="flex">
                                        {b.categories.map((c) => (
                                            <div
                                                key={c}
                                                className="text-black rounded-full border bg-blue-400 gap-3 p-3 space-x-4"
                                            >
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                    <div onClick={(e) => deleteBook(e, b.id)}>
                                        <img src={trash} alt="" />
                                    </div>
                                </div>
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

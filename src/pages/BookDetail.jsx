/* eslint-disable react/jsx-key */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../assets/firebase/index.js";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import NoteForm from "../assets/Components/NoteForm.jsx";
import NoteList from "../assets/Components/NoteList.jsx";

export default function BookDetail() {
  let { id } = useParams();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [book, setBook] = useState(null); // Initialize as null to check its presence later

  useEffect(() => {
    setLoading(true);
    let ref = doc(db, "books", id);
    onSnapshot(ref, (doc) => {
      if (doc.exists()) {
        let book = { id: doc.id, ...doc.data() };
        setBook(book);
        setLoading(false);
        setError("");
      } else {
        setError("No document found");
        setLoading(false);
      }
    });
  }, [id]);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {book && (
        <div className={`grid grid-cols-2 mx-[10rem] my-[3rem] h-screen`}>
          <div className="flex ">
            <img src={book.cover} alt="Book cover" />
          </div>
          <div className="space-y-5">
            <h1>{book.title}</h1>
            <div className="space-x-3 flex justify-between items-center">
              <div>
                {book.categories &&
                  book.categories.map((c) => (
                    <span
                      key={c}
                      className="border bg-blue-500 text-white rounded-lg p-3 "
                    >
                      {c}
                    </span>
                  ))}
              </div>
            </div>
            <div>{book.description}</div>
          </div>
        </div>
      )}

      <div className="mx-20">
        <h3 className="font-bold text-xl text-primary my-3 text-center">
          My Notes
        </h3>
        <NoteForm/>
        <NoteList/>
      </div>
    </>
  );
}

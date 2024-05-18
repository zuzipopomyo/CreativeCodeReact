/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import { db } from "../assets/firebase/index.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const Create = () =>{
  let [title, setTitle] = useState("");
  let [description, setDescripton] = useState("");
  let [newcategory, setNewCategory] = useState("");
  let [categories,setCategories] = useState([])

  // let {setPostData , data:book} = useFetch("http://localhost:3000/books","POST")

  let navigate = useNavigate();

  let addCategory = (e) => {
    if(newcategory && categories.includes(newcategory)){
      setNewCategory('')
      return;
    }
    setCategories(prev => [newcategory, ...prev]);
    setNewCategory("")
  }
  
  let addBook = (e) =>{
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
      date : serverTimestamp()
    }

    let ref =collection (db,'books')
    addDoc(ref,data)
    navigate("/")
  }

  let {isDark} = useTheme()
  return (
    <>
      <div className='h-screen'>
      <form className="w-full max-w-lg mx-auto my-5" onSubmit={addBook}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
              htmlFor="grid-password"
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book title"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
              htmlFor="grid-password"
            >
              Book Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescripton(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Description"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`}
              htmlFor="grid-password"
            >
              Categories
            </label>
            <div className="flex justify-center items-center space-x-2">
              <input
                value={newcategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Categories"
              />
              <button type="button">
              <svg
                onClick={addCategory}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mb-4 bg-blue-500 text-white "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              </button>
            </div>
            {categories.map(c=>(
                        <span key={c} className='border bg-blue-500 text-white rounded-lg p-3 '>{c}</span>
                        ))}
          </div>
        </div>

        <button
          to="/create"
          className="bg-blue-500 text-white px-3 py-2 rounded-2xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span className="hidden md:block">Create book</span>
        </button>
      </form>
      </div>
    </>
  );
}


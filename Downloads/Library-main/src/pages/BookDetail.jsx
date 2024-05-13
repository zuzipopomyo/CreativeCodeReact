/* eslint-disable react/jsx-key */

import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js';
import bookimg from "../assets/bookcover.jpeg"
export default function BookDetail() {
    let {id} = useParams();
    let { data : book , loading , error } = useFetch(`http://localhost:3000/books/${id}`)


  return (
    <>
        {error && <p>{error}</p>}
        {loading && <p>loading....</p>}
        {book && (
            <div className='grid grid-cols-2 mx-[10rem] my-[3rem]'>
                <div>
                    <img src={bookimg} alt="" />
                </div>
                <div className='space-y-5'>
                    <h1>{book.title}</h1>
                    <div className='space-x-3'>
                        {book.categories.map(c=>(
                        <span key={c} className='border bg-blue-500 text-white rounded-lg p-3 '>{c}</span>
                        ))}
                    </div>
                    <div>{book.description}</div>
                </div>
            </div>

        )}
    </>
  )
}

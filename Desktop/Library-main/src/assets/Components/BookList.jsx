/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import book from "../../assets/bookcover.jpeg";
import { Link, useLocation} from "react-router-dom";

import useTheme from "../../hooks/useTheme.js";
import {db} from '../../assets/firebase/index.js'
import {collection, getDocs} from 'firebase/firestore'
export default function BookList() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let search = params.get('search');

    let [error,setError] = useState("");
    let [loading,setLoading] = useState('');
    let [books,setBook] = useState([])

    useEffect(function() {
        let ref = collection(db,'books');
        getDocs(ref).then(docs=>{
            console.log(docs)
        })
    }())    
    let {isDark} = useTheme()
    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>Loading....</p>}
            
            {books && books.length > 0 ? (
                <div className={`grid grid-cols-4 gap-4 my-3 mx-[40px] `}>
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id} className={`border-2 ${isDark ? "border-blue-400" : ''}`}>
                            <img src={book} alt="" className="w-full p-3" />
                            <div className={`text-center ${isDark ? 'text-white' : ""}`}>
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

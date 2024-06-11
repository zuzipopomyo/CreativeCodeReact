import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useTheme from '../../hooks/useTheme';
import useLogOut from '../../hooks/useLogout';
import { AuthContext } from '../../Contexts/AuthContext';


export default function Navbar() {
    let [search, setSearch] = useState('');
    let navigate = useNavigate();

    let handleSearch = () => {
        navigate('/?search=' + search);
    }

    let {isDark,changeTheme} = useTheme();
    
    let{logOut} = useLogOut();
    let signOutUser = async () =>{
        await logOut();
        navigate('/login')
    }

    //auth contextProvider
    let {user} = useContext(AuthContext);
 

    return (
        <nav  className={`border border-b-1 ${isDark ? 'bg-black border-blue-500' : ''}`}>
            <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark ? 'text-white' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder='search books...' className='outline-none rounded-lg p-2' />
                    <button onClick={handleSearch} className='bg-blue-500 text-white px-3 py-2 rounded-2xl flex items-center gap-1'>
                     <span className="hidden md:block">Search Book</span>
                    </button>
                </li>
                <Link to="/" className='flex items-center gap-3 md:-ml-32 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>

                    <span className={`text-2xl font-bold text-primary hidden md:block ${isDark ? 'text-white' :''}`}>
                        Book Store
                    </span>
                </Link>
                <li className='flex gap-3 items-center'>
                    {/* create book */}
                    <Link to="/create" className='bg-blue-500 text-white px-3 py-2 rounded-2xl flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span className="hidden md:block">Create book</span>
                    </Link>
                    {/* profile image */}
                    <div className='w-11'>
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQYEBQcCA//EADsQAAEDAwEGAwYDBQkAAAAAAAEAAgMEBRESBhMhMUFRB2FxIoGRobHBFDJSFUJTcvEjJDM0Q2Ki0eH/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQMCBAX/xAAdEQEBAAIDAQEBAAAAAAAAAAAAAQIRAyExEjJB/9oADAMBAAIRAxEAPwC/IiLwvqiIiAiIgIiICIiAiIgIiICIiAiIgkIgRVEIiKKIiICIvE0sUEZkmkbGxv5nOOAEHtFXavbS0U7y1pnmI/hx8P8AkQsu1bRUVzc0QCVmp2kGRoxqxnHAnB4HmibjboiIoiLBut2o7VAZayUD9LG8XOPkEGciqVPt5QvkxPSzxR/rBDseo/6Vloq6mro9dNJqGBkYwRnyRNxkIiIoiIgkIgRVEIiKKIiICqe1tYWsrnZP90ZHHEM8BJJzdjuG8vVWxV3aawVFzEr6KSMGUM1xyZwXNzggjrg4RL45ks+yVYorjBLJIWQiRrpMDPAHP/nvWLVQSU074ZgBIw4cA4EZ9RwXyRkvtTt9TteRS0MjwP3pHhufdxXmHb6MuAnt72tzzjlz8iPuqIiL9V1m27R225Atgm0TAZ3Uvsk/Y+5cvuNRPUVkslU5zpi469Rzg9ljdMdFdNgrNY75BUwV9PI+shdq1CVzQWHgMYPQ/VWTZvamDsOJJwAOpVo2YkrLJf4KS5xSwCVmkRv6auIOPUfVX6hsWz1kex8dPC2Zhy2WZ2p4PqeXNYV92eFXtJQ3YSExtbiRnT2eLcepPyVuPSyVtURFy0EREEhECKohERRRERAWo2srX0NjnkiOJH4ja7tnr8MrbqteIDoxYSHOAeZW7sdz1+SJfHOJXB78gBo5ADovCL7wQ7yCoeP9Jgd7i4D7oxfBEUgZQQrHsPfYLFdZJKwO/DTx6HuaCS3ByDgc1XEVlV1ySs2Ymnlq5brTSZaC5pkzwByOHr5ZU0G1FBequSkotYZEMxlwxvB1IHMYXIlsLBUmkvVFMOkzQfQnB+qtrr7t9dfRSeahctBERBIRAiqIREUUREQFTvEFu8gaXZxC1pb6udg/QK4qmeIdTFHHDC1wM8rS1zccmZaQfI5bge9HOXihrq2xeyVqm2dpaqvpRJU1MTi8l5HsO5DGe2CuUnlnjwXbbc91PR0zWHDWxMA9MBd4s5jtrn+GlicDplrmHjylacfFq9W/w5tNHVx1JqqybduyI3loafI4bkrTbNzbWy7ePNb+M/Bl796Hh24EY/Lo/dzyxjj810td6jPajDwxtO9c91bWlmSWsaWgAdBkgrA2v2Itlr2dnrLeybfwua4ufKTlucH6rN8Uai/wxUP7GNYynJO+dRh2vVw0glvHHPyX1uNdVHYyQ3ggVD6PEwPV5GPjkj3qWTTrGWuSrItzS+40rW83TMAz/MFjrJoIDUVOhriHCN7wR3a0n7LJ1HZjzPqixbVUmtttLUnnLE1xHY44/NZSNhERBIRAiqIREUUREQFyzbWczbR1WCS1mljc9gBn55XVBzC5BfpA+4TNwdbJJA8nqdbvthHGTXYyux7OT/tCyUU7eJdEAfJw4H5hccV88M9oaehM1suMzIonu3lPJIcAO5FufPgfiusXMy06fTM3cLW+9eDBMMiOoww9HNyR6FfZrmvaHtIc0jIcDkFelqz2+TmFsGgOccDmTxK5d4gXEOMtEC7RG4NA/U/gST5NGB6uPZdUlkjiYZJntYwc3OOAFwXaKsbWXF8kcmtuuUk9MmRx4d+GlcZeOsa1ayrdVmiqd8G6vYezB/3NLfusVAsx1rZVobs9QAO1ZjznPckraqpeHVS+S21FO85EUgc3yBHL4hW1G08EREVIRAiqIREUUREQSOBB7LjN1glprlVQzg7xsrs568efv5rsqru1ezQvLWz0pZHWMGMu4CQdj6dCjnKbcyTOFvhsheix73UzWho5GQEn0A5q6bNeH7Kakjqri8GucNQjLcsi8vM+f9V1jjcvGf8Ae1N2boLu+IzUFdNQwHOlzXnDz/KD8106muojp4o5JpXOYxrXPIzqIHNfN9hqmcGGNzRwGDhfE2iuBP8AYH1yF38WPVjhw69a7bCIX62tpoZCHslEjS8eycAjHzXNa6gqqCYxVcRYejuYd6FdcZaKx7i3SwHqC8ZC91WyTbhSvgrpAGO5aBktPcJ8WuOTHik6vbi6loLnAAZJOAO6zLzbJrPc6igqSDJC7GocnA8QR6jCzdlLXNcrtA5jSIYHiSSTHAYOQPUrNhFz2KtM1tt0klU0slncHaDza0cs+fEqxKScqFGsmhERFSEQIqiERFFEREBEQoMu3wb2UvcPZZ9Vt18KKLdU7R1PE+q+69WE1Hnyu6w7tJJFQvfE4tdkDUOYyVh1lTU28Nj/ABLZd6MMMgw5nme4WwroDU0kkQOHOHs+vRV+oppp3VM8zw91O0B2OWc8h5AJWnFMb6z4IBR3KnO8MhnY4OeT+Y81uVqaS3u3lNMyfVTs9tjHc25HLPZbZWOOTVsVfavZe33argr6tshfG3duDHaQ8dM9e/XqppaWno4Ww0sLIom8msGArDVR72nezrjgtGOSw5Jqu+PwREWbQREQSEQIqiERFFEREBe4m65WN7kLwvvQjVWRDsc/JWepfG7REXreZBycgLFp6MRUL6dztZfq1OxzJyspzmsaXPIaBzJXz/EQ/wAVnxRd2Pla45IqCKOYYewaT7llLy1zXjLCCPJekLd9i0EzN3M9nYrfrT3Jumrcf1AH7fZZcs627472xURFg2EREEhECKohERFEREBZVu/zbPQ/RQiuPrnLytyoRF6nnQTgIOSIg9KERAWsuv8AjMPdv3RFxyfl3h+mCiIvO3EREHockRER/9k=" alt="" className='w-full rounded-full' />
                    </div>
                    <div className='cursor-pointer'>
                        { isDark && <svg onClick={()=>changeTheme("light")} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" /></svg>}                        
                        { !isDark && <svg onClick={()=>changeTheme("dark")} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" /></svg>}
                    </div>
                    <div className='space-x-4'>
                        {!user && 
                            <>
                                <Link to='/register'  className='bg-blue-500 text-white rounded-md p-2'>Register</Link>
                                <Link to='/login'  className='bg-blue-500 text-white rounded-md p-2'>Login</Link>
                            </>
                        }
                        {!!user && 
                        <button onClick={signOutUser} className='bg-red-500 text-white rounded-md p-2'>Sign Out</button>

                        }
                    </div>
                </li>
            </ul>
        </nav>
    )
}
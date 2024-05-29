/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import useSingIn from "../hooks/useSignin.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { error, loading, signIn } = useSingIn();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const user = await signIn(email, password);
        if (user) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen mx-auto flex items-center text-center justify-center h-64 w-full ">
            <div className="p-8 rounded-lg shadow-md pt-[5rem] h-screen w-[600px]">
                <div>
                    <h1 className='text-2xl'>Login Form</h1>
                </div>
                <form className="ms-0 w-ful my-10" onSubmit={login}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            className="px-3 py-2 border w-full bg-white placeholder-white rounded-lg focus:outline-none border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            className="px-3 py-2 border w-full bg-white placeholder-white rounded-lg focus:outline-none border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            className="px-3 py-2 border w-full bg-white placeholder-white rounded-lg focus:outline-none border-blue-400"
                            required
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-white border border-blue-400 w-[200px] mt-3 rounded-lg py-2 p-10 transition duration-200"
                    >
                        {loading && (
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth={4}
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        )}
                        Login
                    </button>
                    <div className="text-white w-full my-3">
                        <h3>
                            Don't have an account?{" "}
                            <button className="text-yellow-500">Register</button>
                        </h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

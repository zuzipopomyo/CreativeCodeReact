import { useState } from 'react';
import useSignup from '../hooks/useSignup';
import {useNavigate } from 'react-router-dom';

export const Register = () => {
  let { error, loading, signUp } = useSignup();

  let [userName, setUserName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate()

  let registerUser = async (e) => {
    e.preventDefault();
    let user = await signUp(email, password);
    if (user) {
      navigate('/')
  }
      
    }
   

  return (
    <div className="min-h-screen mx-auto flex items-center text-center justify-center h-64 w-full ">
      <div className="p-8 rounded-lg shadow-md pt-[5rem] h-screen w-[600px]">
        <div>
          <h1 className='text-2xl'>Register Form</h1>
        </div>
        <form className="ms-0 w-full my-10" onSubmit={registerUser}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Username"
              className="px-3 py-2 border w-full bg-white placeholder-gray-500 rounded-lg focus:outline-none border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="px-3 py-2 border w-full bg-white placeholder-gray-500 rounded-lg focus:outline-none border-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="px-3 py-2 border w-full bg-white placeholder-gray-500 rounded-lg focus:outline-none border-blue-400"
              required
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 text-white w-[200px] mt-3 rounded-lg py-2 transition duration-200"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

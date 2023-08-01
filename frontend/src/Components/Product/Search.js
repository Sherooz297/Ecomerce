import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // Use "navigate" instead of "Navigate"

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/ProductMenu/${keyword}`); // Correctly use "navigate" as a function
    } else {
      navigate("/ProductMenu"); // Correctly use "navigate" as a function
    }
  };

  return (
    <>
      <form className='w-[100vw] h-[100vh] max-w-full flex justify-center items-center bg-slate-300 fixed top-0 left-0-0' onSubmit={searchSubmitHandler}>
        <input
          type="text"
          className='shadow-sm bg-white border-none text-black text-2xl p-[1vmax,2vmax] w-[50%] outline-none rounded-sm font-thin text-1.1vmax font-cursive my-element h-[8%]'
          placeholder='Search a product ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          className='h-[8%] rounded-sm bg-violet-800 border-none p-[1vmax] w-[10%] text-2xl cursor-pointer hover:bg-violet-950 '
          type="submit" value="Search"
        />
      </form>
    </>
  );
};

export default Search;

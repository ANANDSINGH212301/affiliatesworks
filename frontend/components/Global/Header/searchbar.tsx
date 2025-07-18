import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <div className='hidden lg:block'>

    <div className='bg-primary-foreground px-5 flex  items-center gap-2 py-1 rounded-full '>
        <FaMagnifyingGlass size={15} className='text-slate-500' />
        <span   className='bg-transparent text-slate-500 pr-16 hidden md:block'>Search (Ctrl + k)</span>
    </div>
    </div>
  )
}

export default SearchBar

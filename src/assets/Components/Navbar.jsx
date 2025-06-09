import React from "react";
import Logo from "./console.png"
import { Link } from 'react-router-dom';

function Navbar() {
   return (
      <div className="flex h-[5rem] w-full bg-gray-800 text-white flex items-center">
         <img className="w-[90px] p-2 " src={Logo} />
         <h1 className="ml-[20rem] text-4xl font-semibold">
            SkidRow Reloaded
         </h1>

         <div className="underline flex items-end space-x-8 ml-[4rem] text-bold-800">
            <Link to="/">Games</Link>
            <Link to="/Favourites"><i class="fa-solid fa-heart"></i></Link>
            <Link to="/Cart"><i class="fa-solid fa-cart-shopping"></i></Link>
            <Link to="/Search"><i class="fa-solid fa-magnifying-glass"></i></Link>
         </div>
      </div>
   )
}

export default Navbar
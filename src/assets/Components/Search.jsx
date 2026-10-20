import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Games from "./Games";
import { KEY } from "../../rawg";

function Search({ handleitem, item, cart, handlecartitem }) {
   const [page, setpage] = useState(1);
   const [search, setsearch] = useState("");
   const [result, setresult] = useState([]);
   const [totalpage, settotalpage] = useState(1);
   const [genrelist, setgenrelist] = useState([]);
   const [currgenre, setcurrgenre] = useState("All Genres");
   const [platformlist, setplatformlist] = useState([]);
   const [currplatform, setcurrplatform] = useState("All Platforms");

   useEffect(() => {
      let temp = result
         .map((game_obj) => game_obj.genres?.[0]?.name)
         .filter(Boolean);
      const uniqueGenres = new Set(temp);
      setgenrelist(["All Genres", ...Array.from(uniqueGenres)]);
   }, [result]);

   useEffect(() => {
      const temp = result
         .flatMap((game) =>
            game.platforms?.map((p) => p.platform?.name).filter(Boolean) || []
         );
      const uniquePlatforms = new Set(temp);
      setplatformlist(["All Platforms", ...Array.from(uniquePlatforms)]);
   }, [result]);

   function handlegenre(genre) {
      setcurrgenre(genre);
   }

   function handleplatform(platform) {
      setcurrplatform(platform);
   }

   useEffect(() => {
      if (search.trim() === "") return;

      async function fetchdata() {
         try {
            const res = await fetch(
               `https://api.rawg.io/api/games?key=${KEY}&search=${search}&page=${page}`
            );
            const data = await res.json();
            if (page === 1) {
               setresult(data.results);
            } else {
               setresult((prev) => [...prev, ...data.results]);
            }
            const totalResults = data.count;
            settotalpage(Math.ceil(totalResults / 20));
         } catch (error) {
            console.log("Fetch error:", error);
         }
      }

      fetchdata();
   }, [search, page]);

   function handleSearch(e) {
      setsearch(e.target.value);
      setpage(1);
   }

   const loadmore = () => {
      if (page < totalpage) {
         setpage((prev) => prev + 1);
      }
   };

   const filteredresults = result.filter((game) => {
      if (currgenre === "All Genres") {
         return true;
      } else {
         return currgenre === game.genres?.[0]?.name;
      }
   });

   const filteredplatformresults = filteredresults.filter((game) => {
      if (currplatform === "All Platforms") {
         return true;
      } else {
         return game.platforms?.some(
            (p) => p.platform?.name === currplatform
         );
      }
   });

   return (
      <div className="p-4 text-black">
         {/* Search Input */}
         <div className="flex justify-center mt-5">
            <h1 className="text-2xl">Search: </h1>
            <input
               type="text"
               placeholder="Search a Game"
               onChange={handleSearch}
               value={search}
               className="ml-4 p-2 bg-gray-800 rounded text-white outline-none"
            />
         </div>

         {/* Filters + Results Section */}
         <div className="flex flex-col md:flex-row mt-6 gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4 pr-4 space-y-6">
               {/* Genre Filter */}
               {result.length > 0 && (
                  <div>
                     <h1 className="text-xl font-bold mb-2">Genre Filter</h1>
                     <div className="flex flex-wrap gap-2">
                        {genrelist.map((genre) => (
                           <div
                              key={genre}
                              onClick={() => handlegenre(genre)}
                              className={
                                 currgenre === genre
                                    ? "bg-blue-500 p-2 rounded-md text-white cursor-pointer"
                                    : "bg-blue-700 p-2 rounded-md text-white cursor-pointer"
                              }
                           >
                              {genre}
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Platform Filter */}
               {result.length > 0 && (
                  <div>
                     <h1 className="text-xl font-bold mb-2">Platform Filter</h1>
                     <div className="flex flex-wrap gap-2">
                        {platformlist.map((platform) => (
                           <div
                              key={platform}
                              onClick={() => handleplatform(platform)}
                              className={
                                 currplatform === platform
                                    ? "bg-blue-500 p-2 rounded-md text-white cursor-pointer"
                                    : "bg-blue-700 p-2 rounded-md text-white cursor-pointer"
                              }
                           >
                              {platform}
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            {/* Results Grid */}
            <div className="w-full md:w-3/4">
               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {filteredplatformresults.map((game_obj) => (
                     <Games
                        key={game_obj.id}
                        gameobj={game_obj}
                        handleitem={handleitem}
                        handlecartitem={handlecartitem}
                        item={item}
                        cart={cart}
                     />
                  ))}
               </div>

               {page < totalpage && (
                  <div className="flex justify-center mt-6">
                     <button
                        onClick={loadmore}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                     >
                        Load More
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Search;

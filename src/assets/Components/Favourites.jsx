import React, { useEffect, useState } from "react";

function Favourites({ item }) {
    const [search, setsearch] = useState("");
    function handlesearch(e) {
        setsearch(e.target.value);
    }

    const [games, setgames] = useState(item)
    function handledelete(id) {
        let updated = games.filter((game) => game.id != id)
        setgames(updated)
    }

    const [genre, setgenre] = useState([]);
    useEffect(() => {
        setgames(item)
        let temp = item.map((item_obj) => item_obj.genres[0].name)
        temp = new Set(temp)
        setgenre(["All Genres", ...Array.from(temp)])
    }, [item])

    const [currgenre, setcurrgenre] = useState("All Genres")
    function handlegenre(genre) {
        setcurrgenre(genre)
    }

    function setAscending() {
        let updated = [...games].sort((a, b) => a.rating - b.rating)
        setgames(updated)
    }

    function setDescending() {
        let updated = [...games].sort((a, b) => b.rating - a.rating)
        setgames(updated)
    }

    return (
        <div>
            <div className="flex justify-center items-center py-4">
                <strong>Search :</strong>
                <input className="ml-5 border border-black-800"
                    placeholder="Enter Game"
                    onChange={handlesearch}
                    type="text" value={search}>

                </input>
            </div>

            <div className="flex justify-center space-x-4">
                {genre.map((genre_obj) => {
                    return (
                        <div onClick={() => handlegenre(genre_obj)} className={
                            currgenre == genre_obj
                                ? "bg-blue-500  p-3 rounded-md text-white cursor-pointer"
                                : "bg-blue-700 p-3 rounded-md text-white cursor-pointer"
                        } >
                            {genre_obj}
                        </div>
                    )
                })}

            </div>

            <div>
                <div className="m-8">
                    <table className="w-full  border border-black ">
                        <thead className="bg-gray-800 text-white font-semibold">
                            <tr>
                                <th>Name</th>
                                <th>
                                    <i className="fa-solid fa-arrow-up cursor-pointer mr-1" onClick={setDescending}></i>
                                    Rating
                                    <i className="fa-solid fa-arrow-down cursor-pointer ml-1" onClick={setAscending}></i>
                                </th>
                                <th>Genres</th>
                                <th>PlayTime</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.filter((item_obj) => {
                                if (currgenre == "All Genres") {
                                    return true;
                                }
                                else {
                                    return currgenre === item_obj.genres[0].name;
                                }
                            })
                                .filter((itemobj) =>
                                    itemobj.name.toLowerCase().includes(search.toLowerCase())
                                ).map((itemobj) => (
                                    <tr>
                                        <td className="flex p-2">
                                            <img
                                                src={itemobj.background_image}
                                                className="h-[5rem] w-[9rem] object-cover rounded"
                                            />
                                            <h5 className="text-center ml-5">{itemobj.name}</h5>

                                        </td>
                                        <td className="text-center">{itemobj.rating}</td>
                                        <td className="text-center">{itemobj.genres[0].name}</td>
                                        <td className="text-center">{itemobj.playtime}</td>
                                        <td onClick={() => handledelete(itemobj.id)} className="text-red-800 underline cursor-pointer">Delete</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Favourites;
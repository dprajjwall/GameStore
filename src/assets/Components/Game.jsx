import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Games from "./Games";
import Pagelist from "./Pagelist";
import Background from "./background.jpg";
import { KEY } from "../../rawg";

function Game({search,handleitem,item,handlecartitem,cart}) {
    const [games, setgame] = useState([]);
    const [page, setpage] = useState(1);
    

    const setnext = () => {
        setpage(page + 1);
    }

    const setprev = () => {
        if (page > 1) {
            setpage(page - 1);
        }
    }

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=${page}`
        ).then(response => {
            setgame(response.data.results)
            console.log(response.data.results)
        }).catch(error => {
            console.error("Error fetching games:", error);
        });
    }, [page]);

    return (
        <>
            <div style={{ backgroundImage: `url(${Background})` }} className="bg-cover bg-center">
                <div className="flex flex-wrap space-x-4 space-y-5 px-4 py-4">
                    {games.map((game) => (
                            <Games gameobj={game} handleitem = {handleitem} item = {item} handlecartitem = {handlecartitem} cart = {cart}/>
                        ))}

                </div>
                <div>
                    <Pagelist pageno={page} next={setnext} prev={setprev} />
                </div>
            </div>
        </>
    )
}


export default Game
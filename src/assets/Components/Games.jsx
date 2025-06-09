import React from "react";
import { useNavigate } from "react-router-dom";
function Games({ gameobj, handleitem, item, handlecartitem, cart }) {
    const navigate = useNavigate();

    function alreadyadded() {
        return item.some((game) => game.name === gameobj.name)
    }

    function cartadded() {
        return cart.some((cartitem) => cartitem.name === gameobj.name)
    }
    return (
        <div className="relative">
            <div
                style={{ backgroundImage: `url(${gameobj.background_image})` }}
                className="bg-cover bg-center h-[15rem] w-[10rem] rounded-md flex flex-col justify-end text-white relative cursor-pointer  hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={() => navigate(`/games/${gameobj.id}`)}
            >
                {alreadyadded() ? (
                    <i className="fa-solid fa-x absolute top-2 right-2 text-white bg-gray-800/70 p-1 rounded-full hover:bg-gray-600 cursor-pointer"></i>

                ) : (

                    <i onClick={(e) => {
                        e.stopPropagation();
                        handleitem(gameobj)
                    }
                    }
                        className="fa-solid fa-heart absolute top-2 right-2 text-white bg-gray-800/70 p-1 rounded-full hover:bg-gray-600 cursor-pointer"></i>
                )



                }

                {cartadded() ? (
                    <i className="fa-solid fa-check absolute top-2 left-2 text-white rounded-full bg-gray-800/70 p-1 hover:bg-gray-600 cursor-pointer"></i>
                ) : (
                    <i onClick={(e) =>{
                       e.stopPropagation() 
                       handlecartitem(gameobj)
                    }
                    } className="fa-solid fa-cart-plus absolute top-2 left-2 text-white rounded-full bg-gray-800/70 p-1 hover:bg-gray-600 cursor-pointer"></i>
                )}

                <h5 className="bg-gray-800/60 w-full text-center p-1 text-sm font-medium">
                    {gameobj.name}
                </h5>
            </div>
        </div>
    );
}

export default Games;

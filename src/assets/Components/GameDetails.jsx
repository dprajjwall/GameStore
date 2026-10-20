import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { KEY } from "../../rawg";

function GameDetails({handlecartitem, cart}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [games, setgames] = useState(null);
  const [shots, setshots] = useState([]);
  const [video, setvideo] = useState(null);

  function alreadyadded() {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === games.id) {
        return true;
      }
    }
    return false;
  }


  useEffect(() => {
    async function fetchdata() {
      try {
        // Game Details
        const detailsres = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${KEY}`
        );
        const detaildata = await detailsres.json();
        setgames(detaildata);

        // Photo Details
        const shotres = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${KEY}`
        );
        const shotdata = await shotres.json();
        setshots(shotdata.results || []);

        // Video Details
        const videores = await fetch(
          `https://api.rawg.io/api/games/${id}/movies?key=${KEY}`
        );
        const videodata = await videores.json();
        setvideo(videodata.results[0] || null);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [id]);

  if (!games) {
    return (
      <div className="text-center p-10 text-xl font-semibold">
        Loading game details...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl text-center p-3 font-bold underline">{games.name}</h1>
      <div className="bg-teal-800 text-white m-5 p-4 rounded-lg">
        {/* Game poster and description side by side */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          {games.background_image && (
            <img
              src={games.background_image}
              alt={`${games.name} Poster`}
              className="w-full md:w-96 rounded-md shadow-md mb-4 md:mb-0 object-cover"
            />
          )}

          <p className="text-md">{games.description_raw}</p>
        </div>

        {alreadyadded() ? (
          <div className="bg-blue-600 mt-5 rounded-md w-30 p-3 cursor-pointer" onClick={()=>navigate('/Cart')}>Go To Cart</div>
        ):(
          <div className="bg-blue-600 mt-5 rounded-md w-30 p-3 cursor-pointer" onClick={()=>handlecartitem(games)}> Add To Cart</div>
        )

        }

        {/* Screenshots */}
        <h5 className="text-2xl mt-8 font-semibold">Screenshots</h5>
        <div className="flex flex-wrap mt-1 space-x-4 space-y-4 p-3">
          {shots.map((shot) => (
            <img
              key={shot.id}
              src={shot.image}
              alt="Game Screenshot"
              className="w-60 h-36 object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Video */}
        <h5 className="text-2xl mt-8 font-semibold">Video</h5>
        <div className="mt-1 p-3">
          {video && video.data ? (
            <video
              controls
              className="w-full max-w-xl rounded-md shadow-md"
              poster={video.preview}
            >
              <source src={video.data.max} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No video available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;

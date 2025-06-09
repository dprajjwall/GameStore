import React, { useState } from "react";

const platformPrices = {
  "PlayStation 3": 300,
  "PlayStation 4": 400,
  "Xbox 360": 250,
  "Xbox One": 350,
  "PC": 200,
};

const allowedPlatforms = Object.keys(platformPrices);

function Cart({ cart }) {
  const [quantities, setQuantities] = useState({});

  function updateQuantity(gameid,platformname,change){
    const key = `${gameid}-${platformname}`;
    setQuantities((prev) => {
        const newqty = Math.max(0,(prev[key]||0)+change)
        return {...prev,[key]:newqty};
    });
  }

  let total = 0;
  for(const[key,val] of Object.entries(quantities)){
    const platform = key.split("-").slice(1).join("-")
    const price = platformPrices[platform]||0;
    total+=(val*price);
  }

  return (
    <div>
      <div className="m-8 flex justify-center">
        <table className="w-full border border-black table-auto">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="p-2 border-b border-r border-black">Name</th>
              <th className="p-2 border-b border-r border-black">Genre</th>
              <th className="p-2 border-b border-black">Platforms</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cart.map((game) => (
              <tr key={game.id} className="border-b border-black">
                <td className="p-2 border-r border-black text-center">
                  <img
                    src={game.background_image}
                    className="h-[5rem] w-[9rem] object-cover rounded mx-auto"
                    alt={game.name}
                  />
                  <h5 className="mt-2">{game.name}</h5>
                </td>
                <td className="p-2 border-r border-black">
                  {game.genres[0]?.name}
                </td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {game.platforms
                      .map((p) => p.platform.name)
                      .filter((platformName) =>
                        allowedPlatforms.includes(platformName)
                      )
                      .map((platformName) => {
                        const key = `${game.id}-${platformName}`;
                        const quantity = quantities[key] || 0;

                        return (
                          <div
                            key={key}
                            className="flex flex-col items-center bg-gray-200 px-4 py-2 rounded-md"
                          >
                            <span className="font-semibold">{platformName}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() =>
                                  updateQuantity(game.id, platformName, -1)
                                }
                                className="px-2 py-1 bg-red-500 text-white rounded"
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(game.id, platformName, 1)
                                }
                                className="px-2 py-1 bg-green-500 text-white rounded"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4 text-xl font-semibold">
        Total Price: ₹{total}
      </div>
    </div>
  );
}

export default Cart;

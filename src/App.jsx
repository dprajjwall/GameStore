import { useState, useEffect, use } from 'react'
import axios from "axios";
import './App.css'
import Games from './assets/Components/Games'
import Game from './assets/Components/Game';
import Navbar from './assets/Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageList from './assets/Components/Pagelist';
import Favourites from './assets/Components/Favourites';
import Cart from './assets/Components/Cart';
import GameDetails from './assets/Components/GameDetails';
import Search from './assets/Components/Search';

function App() {
  const [item, setitem] = useState([]);

  function handleitem(gameobj) {
    const updatedobj = [...item, gameobj]
    setitem(updatedobj)
    console.log(updatedobj);
  }

  const[cart,setcart]= useState([]);
  function handlecartitem(gameobj){
    const updatedobj = [...cart,gameobj]
    setcart(updatedobj)
    console.log(updatedobj)
  }


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Game handleitem={handleitem} item={item} handlecartitem={handlecartitem} cart = {cart}/>
              </>
            } />

          <Route
            path="/Favourites"
            element={
              <>
                <Favourites item={item} />
              </>
            }
          />
          <Route
            path="/Cart"
            element = {
              <>
                <Cart cart = {cart}/>
              </>
            }
          />

          <Route
           path = "/games/:id"
           element = {
            <>
               <GameDetails handlecartitem={handlecartitem} cart = {cart}/>
            </>
           }
           />

           <Route
           path='/Search'
           element={
            <>
              <Search handleitem={handleitem} item={item} handlecartitem={handlecartitem} cart = {cart}/>
            </>
           }
           />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

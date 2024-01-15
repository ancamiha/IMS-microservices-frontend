import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import CartContent from './pages/CartContent';
import './App.css';
import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react';
import { checkLogin } from './apis/Auth';

export default function App() {
  const [ loggedIn, setLoggedIn ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await checkLogin();
        console.log(response.data);
        setLoggedIn(response.data);
      } catch (error) { }
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login updateLogin={(value) => setLoggedIn(value)} />} />
          <Route path='/products' element={<Products />}/>
          <Route path='/cart' element={<CartContent />} />
        </Routes>
      </Router>
    </>
  );
}

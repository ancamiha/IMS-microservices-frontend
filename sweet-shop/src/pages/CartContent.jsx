import React from 'react'
import CartList from '../components/CartList';
import { useNavigate } from "react-router-dom";

function CartContent() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <div>
        <CartList />
        <div className='container'>
          <button id="orderBtn" className="buttonStyle" onClick={handleOrderClick}>Order</button>
        </div>
    </div>
  );
}

export default CartContent
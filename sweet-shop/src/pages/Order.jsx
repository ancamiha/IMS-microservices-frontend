import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/order.css';
import { useForm } from "react-hook-form";
import { getCookie } from '../apis/Auth';
import { order } from '../apis/Order';

function Order() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [ userId, setUserId ] = useState("");

  const fields = [
    {label: "Delivery Address", name: "address"},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieResponse = await getCookie();
        setUserId(cookieResponse.data); 
      } catch (error) { 
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const onSubmit = data => {
    console.log(data)
    placeOrder(data)
  };

  const placeOrder = async (orderDetails) => {
    try {
      const response = await order(userId, orderDetails);
      console.log(response);
      alert("Order placed successfully.")
      navigate('/products')
    } catch (error) { 
      console.log(error.response);
      alert("An error occured while placing the order, please try again.")
    }
  }

  return (    
    <div>
      <div className='order_container'>
        <h1>Order products</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form__container'>

          {fields.map((x) => ( 
            <div className='mini__container'>
                <label className='form-label'> {x.label} </label>
                <div className='input-wrapper'>
                  <input className='form-control' required {...register(x.name, { required: true })} />
                </div>
            </div>
          ))}

          <div className='mini__container'>
              <input type="checkbox" onClick={() => setOrderConfirmed(!orderConfirmed)}/> Confirm order and accept Terms and Conditions.
          </div>

          <div className='centerize'>
              <button type='submit' className='buttonStyle' disabled={!orderConfirmed} style={{
                backgroundColor: orderConfirmed ? undefined : '#a0a0a0',
                cursor: orderConfirmed ? undefined : 'default',
                color: orderConfirmed ? undefined : 'white'
              }}> Submit </button>
          </div>
        </form>

        <div className='auth__message' style={{ color: 'red', margin: '10px 0' }}> </div>
      </div>

      <div className='back_btn'>
        <button type='button' className='buttonStyle' onClick={ () => navigate('/cart') }> Back </button>
      </div>
    </div>
  );
}

export default Order;

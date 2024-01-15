import React, { useEffect, useState } from 'react';
import "../styles/table.css"
import { MdDeleteOutline } from 'react-icons/md';
import { getCookie } from '../apis/Auth';
import { getCart } from '../apis/Cart'
import "../styles/cartcontent.css"
import { deleteProdFromCart } from '../apis/Cart'

const CartList = () => {

  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ userId, setUserId ] = useState("");
  const [ products, setProducts ] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await getCart(userId);
          setProducts(response.data);

          let total = 0;
          response.data.forEach(product => total += parseInt(product.price))
          setTotalPrice(total)
        } catch (error) { 
          console.log(error.response);
        }
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await getCart(userId);
          setProducts(response.data);

          let total = 0;
          response.data.forEach(product => total += parseInt(product.price))
          setTotalPrice(total)
        } catch (error) { 
          console.log(error.response);
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleDeleteFromCart = (userId, product) => {
    const prodToDel = products.find(p => p.id === product);
    const prod = {userId: userId, product: prodToDel.id, price: prodToDel.price}
    
    const deleteFromCart = async () => {
      try {
        const response = await deleteProdFromCart(prod);
        const index = products.findIndex(p => p.id === prodToDel.id);
        if (index !== -1) {
          products.splice(index, 1);
        }
        setProducts(products);
        setTotalPrice(totalPrice - prodToDel.price);

        console.log(response);
      } catch (error) { 
        console.log(error.response);
      }
    };

    deleteFromCart();
  }

  return (
    <div className='list_cart'>
      <div className='group_cart'>
        <div className='table-wrapper'>
          <table className='table table-default'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {products && products.map(product => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className='container_cart'>
                        <button className='buttonStyle add' onClick={() => handleDeleteFromCart(userId, product.id) }>
                          <MdDeleteOutline size='1.5em'/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan="2">Total:</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CartList
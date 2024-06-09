import React, { useEffect, useState } from 'react'
import PointsContext from "../context/pointsContext";
import { useContext } from "react";

export default function Cart() {

  const cValue = useContext(PointsContext);

  const [cartList, setCartList] = useState()
  const [price, setPrice] = useState()

  let items = [];

  const getCartItems = async () => {
    const authToken = localStorage.getItem("authTokens");
    const res = await fetch(`http://localhost:1400/users/getCartItems`, {
      method: 'POST',
      body: JSON.stringify({
        authToken: authToken
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await res.json();
    items = await data.cartItems;


    let i = 0;
    let itemPrice = 0;

    const a = items.map(item => {
      i++;
      itemPrice += item.price;
      return (
        <tr>
          <th scope='col' >{i}</th>
          <th scope='col' >{item.title}</th>
          <th scope='col' >{item.stock}</th>
          <th scope='col' >{item.price}</th>
          <th scope='col' ><button className='btn small bg-danger mt-2 ' onClick={(e) => { deleteCartItems(item._id) }}> Delete </button></th>
        </tr>
      )
    })
    setCartList(a)
    setPrice(itemPrice)
  }

  const getCartItemsHandler = () => {
    getCartItems();
  }

  useEffect(getCartItemsHandler, [])

  const deleteCartItems = async (id) => {
    const authToken = localStorage.getItem("authTokens");
    const res = await fetch(`http://localhost:1400/users/deleteCartItems`, {
      method: 'DELETE',
      body: JSON.stringify({
        authToken: authToken,
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await res.json();
    cValue.setUserPoints(cValue.userPoints-1);
    getCartItemsHandler();
  }



  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Available Quantity</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {
              cartList ? cartList : <h2 style={{ textAlign: "center" }}>........fetching Data........</h2>
            }
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: Rs {price}</h1></div>
      </div>
    </div>
  )
}
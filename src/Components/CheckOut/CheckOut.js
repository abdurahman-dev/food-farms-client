import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Header from "../Header/Header";

const CheckOut = () => {
  const { id } = useParams();
  console.log(id);
  const [logInUser] = useContext(userContext);
  const [checkOut, setCheckOut] = useState({});
  useEffect(() => {
    const url = `https://cherry-cobbler-14506.herokuapp.com/checkout/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCheckOut(data[0]);
      });
  }, [logInUser.productId]);

  const handleOrder = () => {
    const orderProfile = {
      customerName: logInUser.displayName,
      customerEmail: logInUser.email,
      productId: checkOut._id,
      productName: checkOut.productName,
      productPrice: checkOut.price,
    };
    fetch("https://cherry-cobbler-14506.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderProfile),
    }).then((response) => response.json());
  };

  return (
    <>
      <Header></Header>
      <div className="container pt-4">
        <h1>CheckOut</h1>
        <table className="table bg-danger text-light rounded shadow mt-4">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{checkOut.productName}</td>
              <td>1</td>
              <td>{checkOut.price}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td></td>
              <th>{checkOut.price}</th>
            </tr>
          </tbody>
        </table>
        <div className="ml-auto">
          <Link
            onClick={handleOrder}
            to="/order"
            className="btn btn-outline-danger "
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckOut;

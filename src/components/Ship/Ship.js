import React from "react";
import { useForm } from "react-hook-form";
import "./Ship.css";
import { useAuth } from "../Login/useAuth";
import { getDatabaseCart, clearLocalShoppingCart } from "../../utilities/databaseManager";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useState } from "react";

const Ship = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null)


  const auth = useAuth();


  const stripePromise = loadStripe("pk_test_s4xxHkyau47Qd1Oiuyn3DRjk00bx1Jjjmc");

  const onSubmit = (data) => {

    setShipInfo(data); 
  };

  const handlePlaceOrder = (payment) => {
     //TODO: NAYEM MOVE THIS AFTER PAYMENT
     console.log(auth.user.email);
     const savedCart = getDatabaseCart();
     const orderDetails = {
       name: auth.user.name,
       email: auth.user.email,
       cart: savedCart,
       shipment: shipInfo,
       payment: payment
     };
 
     fetch("http://localhost:4200/placeOrder", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(orderDetails),
     })
       .then((res) => res.json())
       .then((order) => {
         setOrderId(order._id)
         
        //clear local storage cart
        clearLocalShoppingCart();
        
        //give thanks to the user
     
       });
  } 

  return (
    <div className="container">
      <div className="row">
        <div style={{display: shipInfo && 'none'}} className="col-md-6">
          <h3>Shipping Information</h3>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              defaultValue={auth.user.name}
              ref={register({ required: true })}
              placeholder="Name"
            />

            {errors.name && <span className="error">Name is required</span>}

            <input
              name="email"
              defaultValue={auth.user.email}
              ref={register({ required: true })}
              placeholder="Email"
            />
            {errors.email && <span className="error">Email is required</span>}

            <input
              name="phone"
              ref={register({ required: true })}
              placeholder="Phone Number"
            />
            {errors.phone && (
              <span className="error">Phone Number is required</span>
            )}

            <input
              name="addressLine1"
              ref={register({ required: true })}
              placeholder="Address Line 1"
            />
            {errors.addressLine1 && (
              <span className="error">Address is required</span>
            )}

            <input
              name="addressLine2"
              ref={register}
              placeholder="Address Line 2"
            />

            <input
              name="city"
              ref={register({ required: true })}
              placeholder="City"
            />
            {errors.city && <span className="error">City is required</span>}

            <input
              name="country"
              ref={register({ required: true })}
              placeholder="Country"
            />
            {errors.country && (
              <span className="error">Country is required</span>
            )}

            <input
              name="zip"
              ref={register({ required: true })}
              placeholder="Zip Code"
            />
            {errors.zip && <span className="error">Zip code is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div style={{'marginTop' : '100px', display: shipInfo? "block" : 'none'}} 
        className="col-md-6">
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br/>
          {
              orderId && <div>
                <h3>Thank you for shopping with us.</h3>
                <p>Your order id is: {orderId}</p>
                </div>}
        </div>
      </div>
    </div>
  );
};

export default Ship;

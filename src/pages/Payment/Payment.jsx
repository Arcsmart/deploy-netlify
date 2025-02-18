import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import classes from "./Payment.module.css"
import { DataContext } from '../../components/DataProvider/Dataprovider'
import ProductCard from '../../components/Product/ProductCard'
import { useStripe, useElements,CardElement} from "@stripe/react-stripe-js";
import Currencyformat from '../../components/Currencyformat/Currencyformat'
import {axiosInstance} from "../../Api/axios"
import {ClipLoader} from "react-spinners"
import { db } from '../../components/Utility/Firebase'
import { collection,doc,setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../components/Utility/Action.type'

const Payment = () => {
   const navigate = useNavigate();
  const [{user,basket},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{return item.amount+amount},0)

   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0);
  ;

  const stripe = useStripe();    
  const elements = useElements(); 
  const[carderr,setCarderr]=useState()
  const[processing,setProcessing]=useState(false)
  

  const handChange=(e)=>{
    // console.log(e)
    e?.error?.message? setCarderr(e?.error?.message):setCarderr("")

  }
  const handPayment=async(e)=>{
    e.preventDefault()

    try{
      setProcessing(true)
      // 1 backend || functions --->contact to the client sectet
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total*100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // console.log(clientSecret)
      //2 client side (react side confirmation)
      const {paymentIntent} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method:{
            card:elements.getElement(CardElement)
          }
        }
      )
      // console.log(paymentIntent)

     
       const userRef = doc(db, "users", user.uid);
       const ordersCollection = collection(userRef, "orders");
       const orderDoc = doc(ordersCollection, paymentIntent.id);

       await setDoc(orderDoc, {
         basket: basket,
         amount: paymentIntent.amount,
         created: paymentIntent.created,
       });
      //  empty the basket after payment
      dispatch({type:Type.EMPTY_BASKET})
      
      

      setProcessing(false)
      navigate("/orders", { state: { msg: "you have placed new orders" } });
    }catch (error){
      console.log("the ERROR IS ",error)
      setProcessing(false)
     }
    }
  

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/*adderss  */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>{user?.email ? user.email : ""}</div>
          <div>123 React Lane</div>
          <div>Hossana,IL</div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review item And delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handPayment}>
                {carderr && <small style={{ color: "red" }}>{carderr}</small>}

                <CardElement onChange={handChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span> 
                      Total Order | <Currencyformat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                  {
                    processing? (<div className={classes.loader}>
                      <ClipLoader size={15}/> 
                      <small>please wait...</small>
                    </div>) :"pay now"
                    }
                  
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment
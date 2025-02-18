import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useContext } from 'react';
import { DataContext } from '../../components/DataProvider/Dataprovider';
import ProductCard from '../../components/Product/ProductCard'
import { Link } from 'react-router-dom';
import Currencyformat from '../../components/Currencyformat/Currencyformat';
import {Type} from '../../components/Utility/Action.type'
import classes from './Cart.module.css'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{basket,user},dispatch]=useContext(DataContext);

  const total=basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

  const increment=(item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement=(id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
  }


  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 &&(
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <Currencyformat amount={total}/>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../components/Utility/Firebase";
import { DataContext } from "../../components/DataProvider/Dataprovider";
import classes from "./Orders.module.css";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore"; 
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const [orders, setOrders] = useState([]); 
  const [{ user }] = useContext(DataContext); 

  useEffect(() => {
    if (user) {
      
      const userRef = doc(db, "users", user.uid);
      
      const ordersCollection = collection(userRef, "orders");

      
      const q = query(
        ordersCollection,
        orderBy("created", "desc") 
      );

      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          
          data: doc.data(), 
        }));
        
        setOrders(ordersData);
      });
      

      
      return () => unsubscribe();
    }
      
    
  }, [user]); 

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h1>Your orders</h1>
          <hr />
          {orders?.length===0 && <div style={{padding:"20px"}}>You have no orders yet</div>}
          {orders?.map((eachOrder) => (
            <div key={eachOrder.id}>
              <hr />
              <p>Order ID: {eachOrder.id}</p>
              <div className={classes.products_container}>
                {eachOrder.data?.basket?.map((orderItem) => (
                  <ProductCard
                    flex={true}
                    product={orderItem}
                    key={orderItem.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Orders;




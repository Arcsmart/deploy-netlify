import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'
const Product = () => {
      const [products,setproducts] = useState([]);
      const [isLoading,setIsloading]= useState(false)
         useEffect(()=>{
          setIsloading(true)
          axios.get("https://fakestoreapi.com/products")
          .then((res)=>{
            
            setproducts(res.data)
            setIsloading(false)     
          }).catch((error)=>{
              console.log(error)
              setIsloading(false)      
          })
         },[])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products.map((singleproduct) => {
           return <ProductCard product={singleproduct} key={singleproduct.id}  renderAdd={true}/>
           })}
        </section>
      )}
    </>
  );
  
}

export default Product

 
  



//  products.map((singleproduct) => {
//    <ProductCard Product={singleproduct} key={singleproduct.id} />;
//  });
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/Endpoint'
import ProductCard from '../../components/Product/ProductCard'
import classes from './Results.module.css'
import Loader from '../../components/Loader/Loader'

const Results = () => {
  const [results,setResults]=useState([])
  const {categoryName}=useParams()
  const [isLoading,setIsloading]=useState(false)
  useEffect(()=>{
    // setIsloading(true)
    console.log(categoryName)
      const fetchProducts = async () => {
      try {
        const response = await axios.get(`${productUrl}/products/category/${categoryName}`);
        setResults(response.data);
        setIsloading(false)
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsloading(false)
      }
    };

    fetchProducts();
    
    
  },[categoryName])
  return (
    <Layout>
      <h1 style={{ padding: "30px" }}>Results</h1>
      <p style={{ padding: "30px" }}>Category/{categoryName}</p>
      <hr />

      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          {results.map((Product) => (
            <ProductCard key={Product.id} product={Product} renderAdd={true} />
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Results
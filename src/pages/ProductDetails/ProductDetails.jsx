import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Product/ProductCard';
import { productUrl } from '../../Api/Endpoint';
import Loader from '../../components/Loader/Loader';
const ProductDetails = () => {
  const {productId}=useParams()
  const [product,setProduct]=useState()
  const [isLoading,setIsloading]=useState(false)
  useEffect(()=>{
    setIsloading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      
      setProduct(res.data)
      setIsloading(false)
    }).catch((err)=>{
      console.log(err)
      setIsloading(false)
    })
      
    
  },[])
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <ProductCard product={product} flex={true} renderDesc={true} renderAdd={true} />
        </div>
      )}
    </Layout>
  );
}

export default ProductDetails
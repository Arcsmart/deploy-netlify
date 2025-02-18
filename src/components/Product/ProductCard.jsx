import React, { useContext } from "react";
import Rating from '@mui/material/Rating'
import Currencyformat from "../Currencyformat/Currencyformat";
import classes from './Product.module.css'
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/Dataprovider";
import {Type} from '../Utility/Action.type'

function ProductCard({product,flex,renderDesc,renderAdd}){
   if (!product) {
     return <div>Loading...</div>; 
   }
    
      const {image,title,id,rating, price,description} = product;

      const [,dispatch]=useContext(DataContext)
    // console.log(product)
      const addToCart=()=>{
        dispatch({
          type: Type.ADD_TO_BASKET,
          item: { image, title, id, rating, price,description

           }
        });
      }


    return (
      <div
        className={`${classes.card_container} ${
          flex ? classes.product_flexed : ""
        }`}
      >
        <Link to={`/products/${id}`}>
          <img src={image} alt="" />
        </Link>
        <div>
          <h3>{title}</h3>
          {renderDesc && (
            <div style={{ maxWidth: "570px" }}> {description}</div>
          )}
          <div className={classes.rating}>
            <Rating value={rating.rate} precision={0.1} />
            {/* {count} */}
            <small>{rating.count}</small>
          </div>
          <div>
            <Currencyformat amount={price} />
          </div>
          {renderAdd && (
            <button className={classes.button} onClick={addToCart}>
              add to cart
            </button>
          )}
        </div>
      </div>
    );
}
export default ProductCard;

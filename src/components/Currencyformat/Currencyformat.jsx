import React from "react";
import numeral from 'numeral'
const Currencyformat=({amount})=>{
   const formatedAmount=numeral(amount).format("$,0.00") 
   return formatedAmount      
}
export default Currencyformat
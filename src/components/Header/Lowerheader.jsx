import React from 'react'
import { IoMdMenu } from "react-icons/io";
import classes from "./Header.module.css";
const Lowerheader = () => {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoMdMenu />
          <p>All</p>
        </li>
        <li> Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sells</li>
      </ul>
    </div>
  );
}

export default Lowerheader
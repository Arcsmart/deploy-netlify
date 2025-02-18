import React from 'react'
import {ImgCat} from './CategoryFullinfos'
import CategoryCard from './CategoryCard';
import classes from './Category.module.css'
const Category = () => {
  return (
    <>
      <section className={classes.category_container}>
        {ImgCat.map((infos) => (
          <CategoryCard key={infos} data={infos}  renderAdd={true} />
        ))}
      </section>
    </>
  );
}

export default Category
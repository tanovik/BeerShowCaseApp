import React from "react";
import classes from "./HomePage.module.css";
import BannerCarousel from '../../BannerCarousel/BannerCarousel'
import BeerItemsCarousel from '../../BeerItemsCarousel/BeerItemsCarousel'
import SearchBeerButtons from "../../SearchBeerButtons/SearchBeerButtons";


const HomePage: React.FC = () => {
  return (
    <div className={classes.home_page_wrapper}>
      <BannerCarousel />
      <SearchBeerButtons />
      <BeerItemsCarousel />
    </div>
  );
};


export default HomePage;




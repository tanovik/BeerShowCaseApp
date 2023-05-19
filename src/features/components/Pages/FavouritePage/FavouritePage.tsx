import React, { useEffect, useState } from "react";
import classes from "./FavouritePage.module.css";
import Preloader from "../../Preloader/Preloader";
import BeerItem from "../../BeerItem/BeerItem";
import beersHorizontal from "../../../../assets/images/beersHorizontal.jpg";
import { useAppSelector } from "../../../../app/hooks";
import { selectFavouriteList } from "../../../beerSelectors";

const FavouritePage: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const favBeerList = useAppSelector(selectFavouriteList);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  if (!favBeerList) {
    return <Preloader />;
  }

  return (
    <div className={classes.favouritePage}>
      {favBeerList.length === 0 ? (
        <div className={classes.emptyFavouritesList}>
          There are no beers in your favourites list
          <div>
            <img alt="beersHorizontal" src={beersHorizontal} className={classes.beerImage} />
          </div>
        </div>
      ) : (
        <div className={classes.beerItems}>
          <BeerItem
            list={favBeerList}
          />
        </div>
      )}
    </div>
  );
};

export default FavouritePage;



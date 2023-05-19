import React from "react";
import beerBottleIcon from "../../../assets/images/beerBottleIcon.png";
import { NavLink } from "react-router-dom";
import { BeerItemsType } from "../../../Api/BeerApi";
import Preloader from "../Preloader/Preloader";
import FavouriteButton from "./../FavouriteButton/FavouriteButton";
import classes from "./BeerItem.module.css";
import { useAppDispatch } from '../../../app/hooks';
import { setFavouriteBeerList } from "../../beerSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

type PropsType = {
  list: Array<BeerItemsType>;
};

const BeerItem: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!props.list) {
    return <Preloader />;
  }

  return (
    <>
      {props.list.map((u: BeerItemsType) => (
        <div key={u.id} className={classes.beerItem}>
          <NavLink to={"/beercard/" + u.id}>
            <div>
              <img alt='beerBottleIcon'
                src={
                  u.image_url == null ||
                    u.image_url === "https://images.punkapi.com/v2/keg.png"
                    ? beerBottleIcon
                    : u.image_url
                }
                className={classes.beerItemImage}
              />

              <div >{u.name}</div>
              <div className={classes.beerItem_record}>
                <p>ABV {u.abv} %</p>
                <p>IBU {u.ibu} %</p>
              </div>
            </div>
          </NavLink>

          <div
            onClick={() => {
              dispatch(setFavouriteBeerList(u));
            }}
            className={classes.favouriteButton}
          >
            <FavouriteButton beer={u} />
          </div>
        </div>
      ))}
    </>
  );
};

export default BeerItem;

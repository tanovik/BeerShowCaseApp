import React, { useEffect } from "react";
import beerBottleIcon from "../../../../assets/images/beerBottleIcon.png";
import { MaltType, HopsType } from "../../../../Api/BeerApi";
import Preloader from "../../Preloader/Preloader";
import classes from "./BeerCardPage.module.css";
import { useParams, useLocation } from "react-router-dom";
import { getBeerCard } from "../../../beerSlice";
import { selectBeerItem } from '../../../beerSelectors';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import FavouriteButton from "./../../FavouriteButton/FavouriteButton";
import { setFavouriteBeerList } from "../../../beerSlice";




const BeerCardPage: React.FC = () => {
  let { beerId } = useParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    beerId ? dispatch(getBeerCard(+beerId)) : <Preloader />;
  }, []);


  let beerItem = useAppSelector(selectBeerItem);

  if (!beerItem) {
    return <Preloader />;
  }
  let maltElement = beerItem.ingredients.malt.map((u: MaltType) => (
    <div key={u.name + u.amount.value}>
      {" "}
      {u.name} - {u.amount.value}
      {u.amount.unit}
    </div>
  ));
  let hopsElement = beerItem.ingredients.hops.map((u: HopsType) => (
    <div key={u.name + u.amount.value}>
      {" "}
      {u.name} - {u.amount.value}
      {u.amount.unit}
    </div>
  ));
  let foodPairingElement = beerItem.food_pairing.map((u: string) => (
    <div key={u}> {u} </div>
  ));
  return (

    <div className={classes.beerCardPage}>
      <div className={classes.beerCardPage_wrapper}>
        <div className={classes.beerIconContainer}>
          <img alt="beerImage"
            src={
              beerItem.image_url == null ||
                beerItem.image_url === "https://images.punkapi.com/v2/keg.png"
                ? beerBottleIcon
                : beerItem.image_url
            }
          />
        </div>

        <div className={classes.beerInfo}>
          <div className={classes.beerNameAndButton}>
            <h2 className={classes.beerNameText}>{beerItem.name}</h2>
            <div
              onClick={() => {
                beerItem && dispatch(setFavouriteBeerList(beerItem));
              }}
            >
              <FavouriteButton beer={beerItem} />
            </div>
          </div>

          <div className={classes.beerDescription}>
            {beerItem.description}
          </div>

          <table>
            <tbody>
              <tr>
                <th>ABV</th>
                <td>{beerItem.abv}%</td>
              </tr>
              <tr>
                <th>IBU</th>
                <td>{beerItem.ibu}</td>
              </tr>
              <tr>
                <th>First brewed</th>
                <td>{beerItem.first_brewed}</td>
              </tr>

              <tr>
                <th>Malt</th>
                <td>{maltElement}</td>
              </tr>
              <tr>
                <th>Hops</th>
                <td>{hopsElement}</td>
              </tr>
              <tr>
                <th>Yeast</th>
                <td>{beerItem.ingredients.yeast}</td>
              </tr>
              <tr>
                <th>Food pairing</th>
                <td>{foodPairingElement}</td>
              </tr>
              <tr>
                <th>Brewers tips</th>
                <td>{beerItem.brewers_tips}</td>
              </tr>
              <tr>
                <th>Contributed by</th>
                <td>{beerItem.contributed_by}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeerCardPage;

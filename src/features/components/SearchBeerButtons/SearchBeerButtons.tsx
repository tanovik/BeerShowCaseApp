import React from "react";
import { selectBeerButtonNames } from "../../beerSelectors";
import {
  BeerFilterType,
  getFilteredBeerList
} from "../../beerSlice";
import classes from "./SearchBeerButtons.module.css";
import "../../../App.css";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";



const SearchBeerButtoms: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const beerButtonNames = useAppSelector(selectBeerButtonNames);
  const onBeerButtonClick = (beerName: string) => {
    const filter: BeerFilterType = {
      term: beerName,
      abv_gt: null,
      abv_lt: null,
      ibu_gt: null,
      ibu_lt: null,
      food: null,
      ibu: null,
      abv: null,
      brewed_before: null,
      brewed_after: null,
    };
    dispatch(getFilteredBeerList(filter, 1));
    if (filter.term) {
      return (navigate(`/beersearch?term=${filter.term}`));
    }
  }
  return (
    <div className={classes.search_buttons_wrapper}>
      {beerButtonNames.map(el =>
        <button onClick={() => onBeerButtonClick(el)} key={el} className={"button_default_gray"}> {el}</button>)}
    </div>
  );
};

export default SearchBeerButtoms;



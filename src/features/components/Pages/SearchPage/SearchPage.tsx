import React, { useEffect, useState } from "react";
import {
  selectFilteredBeerItems,
  selectFilter,
  selectCurrentPage,
} from "../../../beerSelectors";
import {
  getFilteredBeerList,
} from "../../../beerSlice";
import BeerItem from "../../BeerItem/BeerItem";
import classes from "./SearchPage.module.css";
import BeerFormik from "../../Formik/FormikContainer";
import beersHorizontal from "../../../../assets/images/beersHorizontal.jpg";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";



const SearchPage: React.FC = () => {
  let history = useNavigate();
  const [searchParams] = useSearchParams();

  const filteredBeerItems = useAppSelector(selectFilteredBeerItems);
  const filter = useAppSelector(selectFilter);
  const currentPage = useAppSelector(selectCurrentPage);
  const [showButton, setShowButton] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {

    const parsed = Object.fromEntries([...Array.from(searchParams)]);

    let actualPage = currentPage;
    let actualFilter = filter;
    if (parsed.page) actualPage = +parsed.page;
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
    if (parsed.food) actualFilter = { ...actualFilter, food: parsed.food };
    if (parsed.brewed_before)
      actualFilter = {
        ...actualFilter,
        brewed_before: parsed.brewed_before,
      };
    if (parsed.brewed_after)
      actualFilter = {
        ...actualFilter,
        brewed_after: parsed.brewed_after,
      };

    if (parsed.abv_gt)
      actualFilter = {
        ...actualFilter,
        abv_gt: parsed.abv_gt,
        abv: parsed.abv_gt + '-' + String(+parsed.abv_gt + 1),

      };
    if (parsed.abv_lt)
      actualFilter = {
        ...actualFilter,
        abv_lt: parsed.abv_lt,
      };
    if (parsed.ibu_gt)
      actualFilter = {
        ...actualFilter,
        ibu_gt: parsed.ibu_gt,
        ibu: (parsed.ibu_gt === "5" || parsed.ibu_gt === "25")
          ? parsed.ibu_gt + '-' + String(+parsed.ibu_gt + 25)
          : parsed.ibu_gt === "50"
            ? parsed.ibu_gt + "-100"
            : null
      };
    if (parsed.ibu_lt)
      actualFilter = {
        ...actualFilter,
        ibu_lt: parsed.ibu_lt,
      };

    dispatch(getFilteredBeerList(actualFilter, actualPage));
  }, []);

  useEffect(() => {
    const newData: { [key: string]: any } = {};
    filter && Object.entries(filter)
      .filter(([key, value]) => value !== null && value !== '' && key !== 'ibu' && key !== 'abv' && key !== 'brewed_beforeDate' && key !== 'brewed_afterDate' && key !== 'page')
      .forEach(([key, value]) => (newData[key] = value));

    history(
      {
        pathname: "/beersearch",
        search: `?${createSearchParams(newData).toString()}`,
      }

    );
  }, [filter, currentPage]);

  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset > 120) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={classes.searchBeerPage}>
      <div className={classes.searchSideMenu_wrapper}>
        <div className={classes.searchSideMenu}>
          <BeerFormik />
        </div>
      </div>

      <div className={classes.beerItems_wrapper}>
        {filteredBeerItems.length === 0 ? (
          <div className={classes.emptyList}>
            No beers matched. Try to change your search criteria.
            <div>
              <img src={beersHorizontal} className={classes.beerImage} alt="beersHorizontal" />
            </div>
          </div>
        ) : (
          <div className={classes.beerItems}>
            <BeerItem
              list={filteredBeerItems}
            />
          </div>
        )}
      </div>


    </div>
  );
};

export default SearchPage;



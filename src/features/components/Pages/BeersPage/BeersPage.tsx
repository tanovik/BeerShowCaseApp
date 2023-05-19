import React, { useEffect, useState } from "react";
import classes from "./BeersPage.module.css";
import { selectCurrentPage, selectBeerItems } from "../../../beerSelectors";
import { getBeerList } from "../../../beerSlice";
import { Button, Tooltip } from "antd";
import BeerItem from "../../BeerItem/BeerItem";
import Paginator from "../../Paginator/Paginator";
import { useNavigate, createSearchParams } from "react-router-dom";
import allBeer from "../../../../assets/images/allBeer.png";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { UpOutlined } from "@ant-design/icons";
import SearchBeerButtons from "../../SearchBeerButtons/SearchBeerButtons";


const BeersPage: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();
  const beerItems = useAppSelector(selectBeerItems);
  const navigate = useNavigate();


  useEffect(() => {
    const newData: { [key: string]: any } = {};
    if (currentPage) newData.page = currentPage;
    navigate({
      pathname: "/beers",
      search: `?${createSearchParams(newData).toString()}`,
    });

  }, [currentPage]);


  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const onPageChanged = (pageNumber: number) => {
    dispatch(getBeerList("", pageNumber));
  };

  return (
    <div className={classes.beerPage}>
      <div className={classes.allBeerImg_wrapper}>
        <img alt="allBeer" src={allBeer} />
      </div>
      <div className={classes.beerPage_wrapper}>
        <SearchBeerButtons />

        <div className={classes.beerItems_wrapper}>
          <BeerItem list={beerItems} />
        </div>
        <div className={classes.paginator}>
          <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        </div>

        <div className={classes.backToTop}>
          {showButton && (
            <Tooltip title={"UP"} color="darkgray">
              <Button
                onClick={scrollToTop}
                className={classes.backToTopButton}
                icon={<UpOutlined className={classes.backToTopIcon}
                  style={{ color: "#cab02d" }}
                />}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeersPage;




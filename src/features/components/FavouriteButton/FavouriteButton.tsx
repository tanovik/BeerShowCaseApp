import React from "react";
import { BeerItemsType } from "../../../Api/BeerApi";
import { HeartTwoTone } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { selectFavouriteList } from "../../../features/beerSelectors";

type PropsType = {
  beer: BeerItemsType;
};

const FavouriteButton: React.FC<PropsType> = (props) => {
  const favBeerList = useAppSelector(selectFavouriteList);

  const setClass = (beer: BeerItemsType, favBeerList: Array<BeerItemsType>) => {
    let favouriteClass: Array<boolean> = [];
    favBeerList.find((favBeer) => favBeer.id === beer.id)
      ? favouriteClass.push(true)
      : favouriteClass.push(false);
    if (favouriteClass[0]) {
    }
    return favouriteClass;
  };

  return (
    <>

      <Tooltip title={setClass(props.beer, favBeerList)[0] ? "Remove from favourites" : "Add to favourites"} color="#cab02d">
        <Button
          type="primary"
          shape="circle"
          icon={<HeartTwoTone twoToneColor="#cab02d" />}
          ghost={setClass(props.beer, favBeerList)[0]}
          style={{
            backgroundColor: setClass(props.beer, favBeerList)[0] ? "white" : "#cab02d",
            borderColor: "#cab02d",
          }}
        />
      </Tooltip>
    </>
  );
};

export default FavouriteButton;

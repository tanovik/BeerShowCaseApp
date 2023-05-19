import { RootState } from "../app/store";

export const selectBeerItems = (state: RootState) => state.beerPage.beerItems;

export const selectFilteredBeerItems = (state: RootState) =>
  state.beerPage.filteredBeerItems;

export const selectBeerItem = (state: RootState) => state.beerPage.beerItem;

export const selectBeerId = (state: RootState) => state.beerPage.beerId;

export const selectFilter = (state: RootState) => state.beerPage.filter;

export const selectCurrentPage = (state: RootState) =>
  state.beerPage.currentPage;

export const selectTotalItemsCount = (state: RootState) =>
  state.beerPage.totalItemsCount;

export const selectFavouriteList = (state: RootState) =>
  state.beerPage.favouriteBeerList;
export const selectBeerButtonNames = (state: RootState) =>
  state.beerPage.beerButtonNames;

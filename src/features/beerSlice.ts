import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../app/store';
import { BeerItemsType, beerAPI } from "../Api/BeerApi";

export interface BeerItemsState {
  totalItemsCount: number,
  currentPage: number,
  beerItems: Array<BeerItemsType>,
  filteredBeerItems: Array<BeerItemsType>, 
  favouriteBeerList:Array<BeerItemsType>, 
  beerItem: BeerItemsType | null, 
  beerId : number | null, 
  filter:{
    term: null|string,
    abv_gt:  null|string,
    abv_lt:  null|string,
    ibu_gt:  null|string,
    ibu_lt:  null|string,
    food: null|string,
    ibu: null|string,
    abv: null|string,
    brewed_before: null| string,
    brewed_after: null| string,
  },
  beerButtonNames: string[],
}

const initialState: BeerItemsState = {
  totalItemsCount: 0,
  currentPage: 1,
  beerItems: [],
  filteredBeerItems: [], 
  favouriteBeerList:[],
  beerItem: null, 
  beerId : null, 
  filter:{
    term: '',
    abv_gt: null,
    abv_lt: null,
    ibu_gt: null,
    ibu_lt: null,
    food: null,
    ibu: null,
    abv: null,
    brewed_before: null,
    brewed_after: null,
  },
  beerButtonNames: [
    "lager", "porter", "weisse", "blonde", "india", "wheat", "stout", "black"
  ],
};

export type BeerFilterType = typeof initialState.filter

export const beerSlice = createSlice({
  name: 'beerPage',
  initialState,
  reducers: {
    setBeerList: (state, action: PayloadAction<Array<BeerItemsType>>) => {
        state.beerItems= [...action.payload]
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
  },
  setFilteredBeerList: (state, action: PayloadAction<Array<BeerItemsType>>) => {
    state.filteredBeerItems = action.payload
},
  setBeerFilter: (state, action: PayloadAction<BeerFilterType>) => {
    state.filter = {...action.payload}
},
  setBeerCard: (state, action: PayloadAction<BeerItemsType>) => {
    state.beerItem = action.payload
},
setFavouriteBeerList: (state, action: PayloadAction<BeerItemsType>) => {
  let clearedBeerList = [] 
    clearedBeerList = [...state.favouriteBeerList];
    clearedBeerList.find((savedBeer: BeerItemsType) => savedBeer.id === action.payload.id)
      ? clearedBeerList.splice(
          clearedBeerList.findIndex(
            (savedBeer: BeerItemsType) => savedBeer.id === action.payload.id
          ),
          1
        )
      : clearedBeerList.push(action.payload);
      state.favouriteBeerList= clearedBeerList
}
//   setError: (state, action: PayloadAction<BeerItemsType>) => {
//     state.currentPage = action.payload
// },

}
})




export const { setBeerList, setCurrentPage , setFilteredBeerList, setBeerFilter, setBeerCard, setFavouriteBeerList} = beerSlice.actions;

  export const getBeerList =( term:string, page:number):AppThunk=> async (dispatch)=>{
    dispatch(setCurrentPage(page));
    
    const data= await beerAPI.requestBeerList(null,null,null,null,null,null,null,null,page);
       dispatch(setBeerList(data))
     }

  export const getFilteredBeerList =( filter:BeerFilterType, page:number):AppThunk=> async (dispatch)=>{
      dispatch(setBeerFilter(filter));

       let data= await beerAPI.requestBeerList(filter.term,filter.abv_gt,filter.abv_lt,filter.ibu_gt,filter.ibu_lt,filter.food, filter.brewed_before, filter.brewed_after, page=1);
          dispatch(setFilteredBeerList(data))
        }

  export const getBeerCard= (beerId:number| null):AppThunk=>async (dispatch)=>{

          let data = await beerAPI.getBeerItem(beerId)
                dispatch(setBeerCard(data[0]));
    
         }



export default beerSlice.reducer;

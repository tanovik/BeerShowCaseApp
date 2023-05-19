import { useEffect } from 'react';
import './App.css';
import SearchPage from "./features/components/Pages/SearchPage/SearchPage";
import BeersPage from "./features/components/Pages/BeersPage/BeersPage";
import HomePage from "./features/components/Pages/HomePage/HomePage";
import Header from "./features/components/Header/Header";
import Footer from "./features/components/Footer/Footer";
import FavouritePage from "./features/components/Pages/FavouritePage/FavouritePage";
import BeerCardPage from "./features/components/Pages/BeerCardPage/BeerCardPage";
import NotFound from "./features/components/Pages/NotFoundPage/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from './app/hooks';
import { getBeerList } from "./features/beerSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBeerList("", 1));
  }, []);
  return (
    <div >
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers" element={<BeersPage />} />
          <Route path="/beercard/:beerId?" element={<BeerCardPage />} />
          <Route path="/favourites" element={<FavouritePage />} />
          <Route path="/beersearch" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

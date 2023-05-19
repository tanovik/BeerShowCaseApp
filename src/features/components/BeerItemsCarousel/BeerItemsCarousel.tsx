import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
  Mousewheel,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./BeerItemsCarousel.css";
import { useAppSelector } from "../../../app/hooks";
import { selectBeerItems } from "../../beerSelectors";
import { BeerItemsType } from "../../../Api/BeerApi"
import beerBottleIcon from "../../../assets/images/beerBottleIcon.png";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { useAppDispatch } from '../../../app/hooks';
import { setFavouriteBeerList } from "../../beerSlice";
import { NavLink } from "react-router-dom";
import Preloader from "../Preloader/Preloader";


SwiperCore.use([EffectCoverflow, Pagination, Navigation, Mousewheel, Autoplay]);



const BeerItemsCarousel = () => {
  const beerItems: BeerItemsType[] = useAppSelector(selectBeerItems)
  console.log('beerItems', beerItems)
  const dispatch = useAppDispatch();
  return (
    <div className="beer_items_swiper_wrapper">

      {beerItems.length > 0 ?
        <Swiper
          centeredSlides={true}
          slidesPerView={"auto"}
          loop
          mousewheel
          // autoplay={{
          //   delay: 4000,
          //   pauseOnMouseEnter: true,
          // }}
          navigation={true}
          modules={[Pagination, Navigation, Mousewheel, Autoplay]}
        >
          {beerItems && beerItems.map((elem, i) => {

            return (
              <SwiperSlide key={i}>
                <div className="slide_item">
                  <div className="slide_link">
                    <NavLink to={"/beercard/" + elem.id}>
                      <div className="slide_item_wrapper">

                        <div className="slide_flip_card">
                          <div className="slide_flip_card_inner">
                            <div className="slide_flip_card_front">
                              <img alt="beer"
                                src={
                                  elem.image_url == null ||
                                    elem.image_url === "https://images.punkapi.com/v2/keg.png"
                                    ? beerBottleIcon
                                    : elem.image_url
                                }
                              />
                            </div>
                            <div className="slide_flip_card_back">{elem.description}</div>
                          </div>
                        </div>

                      </div>
                      <div className="slide_item_title">{elem.name}</div>
                    </NavLink>
                  </div>

                  <div
                    onClick={() => {
                      dispatch(setFavouriteBeerList(elem));
                    }}
                    className="favourite_button"
                  >
                    <FavouriteButton
                      beer={elem}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        : <Preloader />
      }
    </div>
  );
};
export default BeerItemsCarousel;

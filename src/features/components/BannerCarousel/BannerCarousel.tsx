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
import classes from "./BannerCarousel.module.css";
import { BannerImagesType } from "../../../Api/BeerApi";
import HomePageBanner1 from "../../../assets/images/HomePageSlides/HomePageBanner1.png";
import HomePageBanner2 from "../../../assets/images/HomePageSlides/HomePageBanner2.png";
import HomePageBanner3 from "../../../assets/images/HomePageSlides/HomePageBanner3.png";

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Mousewheel, Autoplay]);

const bannerImages: BannerImagesType[] = [
  { id: 1, source: HomePageBanner1 },
  { id: 2, source: HomePageBanner2 },
  { id: 3, source: HomePageBanner3 },
];

const BannerCarousel = () => {
  return (
    <div className={classes.banner_swiper_wrapper}>
      <Swiper
        centeredSlides={true}
        slidesPerView={"auto"}
        loop
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
      >
        {bannerImages.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <div className={classes.banner_image_wrapper}>
                <img src={img.source} alt="beerBanner" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default BannerCarousel;

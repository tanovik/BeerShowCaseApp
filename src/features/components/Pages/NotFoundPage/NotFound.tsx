
import { FC } from "react";
import classes from "./NotFound.module.css";
import { NavLink } from "react-router-dom";

const NotFound: FC = () => {
  console.log("NotFound")
  return (
    <div className={classes.notfound_wrapper}>
      <div className={classes.notfound_upper_text_wrapper}>
        <h1>404</h1>
      </div>

      <div className={classes.notfound_text_wrapper}>
        <div className={classes.notfound_text}>

          <h2>Sorry, Page Not Found</h2>
          <h3>The page you requested could not be found</h3>
          <NavLink to={"/"} >
            <button className='button_default_gray'>GO BACK HOME</button>
          </NavLink>

        </div>
      </div>
    </div>
  );
};


export default NotFound;
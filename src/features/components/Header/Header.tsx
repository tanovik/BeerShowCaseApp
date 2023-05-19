import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import HomePageIcon from "../../../assets/images/HomePageIcon.png";
import HeaderForm from "./FormHeader";
import cn from "classnames";

export const Header: React.FC = () => {
  const [show, setShow] = useState(true)
  const location = useLocation();

  const setActiveStyle = ({ isActive }: { isActive: boolean }) => ({ boxShadow: isActive ? "inset 0px 0px 24px 5px rgba(0,0,0,0.15)" : "", color: isActive ? "rgb(130, 130, 130)" : '' });

  const controlHeader = () => {
    if (window.scrollY > 50) {
      setShow(false)
    } else {
      setShow(true)
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', controlHeader)
    return () => {
      window.removeEventListener('scroll', controlHeader)
    }
  }, [])

  return (
    <div className={cn(classes.header,
      { [classes.headerUp]: show === true },
      { [classes.headerDown]: show === false })}>
      <div className={'header_homeLink'}>
        <NavLink to={"/"} >
          <img alt="home" src={HomePageIcon} className={cn(classes.homePageIcon,
            { [classes.homePageIconUp]: show === true },
            { [classes.homePageIconDown]: show === false })} />
        </NavLink>
      </div>

      <div className={classes.searchAndLinks}>
        <div className={classes.searchGroup} style={{ visibility: (location.pathname !== "/beersearch" ? 'visible' : 'hidden') }}>
          <HeaderForm />
        </div>

        <div className={cn(classes.headerLinks,
          { [classes.headerLinksUp]: show === true },
          { [classes.headerLinksDown]: show === false })}>
          {/* <NavLink to={"/beers"} > */}
          <NavLink to={"/beers"} style={setActiveStyle}>
            <div>BEERS</div>
          </NavLink>
          <NavLink to={"/beersearch"} style={setActiveStyle}>
            <div>SEARCH</div>
          </NavLink>
          <NavLink to={"/favourites"} style={setActiveStyle}>
            <div>FAVOURITES</div>
          </NavLink>
        </div>
      </div>

    </div>
  );
};


export default Header;
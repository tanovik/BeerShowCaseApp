import React from "react";

import classes from "./Footer.module.css";
import facebookIcon from "../../../assets/images/socialMediaIcons/facebookIcon.png";
import instagramIcon from "../../../assets/images/socialMediaIcons/instagramIcon.png";
import twitterIcon from "../../../assets/images/socialMediaIcons/twitterIcon.png";


export const Footer: React.FC = () => {
  return (
    <div className={classes.footerPage}>
      <div className={classes.footerIcons}>
        <img alt="facebookIcon" src={facebookIcon} className={classes.icon} />
        <img alt="instagramIcon" src={instagramIcon} className={classes.icon} />
        <img alt="twitterIcon" src={twitterIcon} className={classes.icon} />
      </div>
      <div>
        <hr></hr>
      </div>
      <div className={classes.lowTab}>
        Copyright © 2023 T N. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

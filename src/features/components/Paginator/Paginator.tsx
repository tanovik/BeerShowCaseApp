import React, { useState } from "react";
import classes from "./Paginator.module.css";
import cn from "classnames";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";


type PropsType = {
  currentPage?: number;
  pageSize?: number;
  onPageChanged?: (pageNumber: number) => void;
  portionSize?: number;

};

let Paginator: React.FC<PropsType> = ({
  currentPage = 1,
  pageSize = 25,
  onPageChanged = () => { },
  portionSize = 5 }) => {
  let totalItemsCount = 323
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPagePortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPagePortionNumber = portionNumber * portionSize;

  return (
    <div className={classes.paginator} >

      <button
        className={"button_default_gray"}
        onClick={() => {
          setPortionNumber(portionNumber - 1);
        }}
        style={{ visibility: (portionNumber > 1 ? 'visible' : 'hidden') }}
      >
        <LeftOutlined />
      </button>


      <div className={classes.page_numbers}>
        {pages
          .filter(
            (p) => p >= leftPagePortionNumber && p <= rightPagePortionNumber
          )
          .map((p) => {
            return (
              <div
                className={cn(
                  { [classes.selectedPage]: currentPage === p },
                  classes.pageNumber
                )}
                key={p}
                onClick={(e) => {
                  onPageChanged(p);
                  window.scrollTo(0, 0);
                }}
              >
                {p}
              </div>
            );
          })}

      </div>
      <button
        className={"button_default_gray"}

        onClick={() => {
          setPortionNumber(portionNumber + 1);

        }}
        style={{ visibility: (portionCount > portionNumber ? 'visible' : 'hidden') }}
      >
        <RightOutlined />
      </button>
      {/* )} */}
    </div>
  );
};

export default Paginator;

import React from "react";
import classes from "./FormHeader.module.css";
import { useNavigate } from "react-router-dom";
import { selectFilter } from "../../beerSelectors";
import { BeerFilterType } from "../../beerSlice";
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getFilteredBeerList } from "../../beerSlice";



type FormType = {
  term: null | string;
};


const HeaderForm: React.FC = () => {
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      term: filter.term,
    }
  });
  const onFormSubmit = (data: FormType) => {
    const filter: BeerFilterType = {
      term: data.term,
      abv_gt: null,
      abv_lt: null,
      ibu_gt: null,
      ibu_lt: null,
      food: null,
      ibu: null,
      abv: null,
      brewed_before: null,
      brewed_after: null,
    };
    dispatch(getFilteredBeerList(filter, 1));
    reset();
    if (filter.term) {
      return (navigate(`/beersearch?term=${filter.term}`));
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)} className={classes.searchGroupStartPage}>
        <input type="text" id="term" className={classes.searchInputStartPage} placeholder={"Enter beer name"} {...register('term')} />
        <button type="submit" className={"button_default_gray"}>
          <SearchOutlined />
        </button>
      </form>
    </div>
  )
}

export default HeaderForm;


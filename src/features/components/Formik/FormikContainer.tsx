import React from "react";
import classNames from 'classnames'
import classes from "./Formik.module.css";
import { selectFilter } from "../../beerSelectors";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BeerFilterType } from "../../beerSlice";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getFilteredBeerList } from "../../beerSlice";
import { Field } from "formik";
import SelectForm from "./SelectForm";
import DatePickerFormik from "./FormikDatePicker";

const validationSchema = Yup.object().shape({
  term: Yup.string().max(10, "Must be 10 characters or less"),
});
export type OptionType = { label: string | null, value: string | null }
type FormType = {
  term: null | string;
  abv_gt: null | string;
  abv_lt: null | string;
  ibu_gt: null | string;
  ibu_lt: null | string;
  food: null | OptionType;
  ibu: null | OptionType;
  abv: null | OptionType;
  brewed_before: null | Date;
  brewed_after: null | Date;
};



const BeerFormik: React.FC = () => {
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const abvOptions = [
    { label: "4-5%", value: "4-5" },
    { label: "5-6%", value: "5-6" },
    { label: "6-7%", value: "6-7" },
  ];

  const ibuOptions = [
    { label: "5-25", value: "5-25" },
    { label: "25-50", value: "25-50" },
    { label: "50-100", value: "50-100" },

  ];
  const foodOptions = [
    { label: "chicken", value: "chicken" },
    { label: "fish", value: "fish" },
    { label: "salad", value: "salad" },
    { label: "crab", value: "crab" },
    { label: "cheese", value: "cheese" },

  ];


  const convertDateToString = (val: Date) => {
    return val.toISOString().replace(/T.*/, '').split('-').reverse().slice(1).join('-');
  };

  const convertStringToDate = (dateStr: string) => {
    return new Date(dateStr.split('-').reverse().join('-') + '-01');
  }


  const resetFilter = () => {
    const filter: BeerFilterType = {
      term: "",
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

  };

  const initialValues: FormType = {
    term: filter.term,
    abv_gt: filter.abv_gt,
    abv_lt: filter.abv_lt,
    ibu_gt: filter.ibu_gt,
    ibu_lt: filter.ibu_lt,
    abv: filter.abv
      ? { label: filter.abv + '%', value: filter.abv }
      : null,
    ibu: filter.ibu
      ? { label: filter.ibu, value: filter.ibu }
      : null,
    food: filter.food
      ? { label: filter.food, value: filter.food }
      : null,
    brewed_before: filter.brewed_before
      ? convertStringToDate(filter.brewed_before)
      : null,
    brewed_after: filter.brewed_after
      ? convertStringToDate(filter.brewed_after)
      : null,

  };

  return (
    <div>
      <div >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: FormType, onSubmitProps) => {
            console.log('values from onSub', values)


            const filter: BeerFilterType = {
              term: values.term,
              abv_gt:
                values.abv?.value === "4-5"
                  ? "4"
                  : values.abv?.value === "5-6"
                    ? "5"
                    : values.abv?.value === ""
                      ? null
                      : values.abv?.value === "6-7"
                        ? "6"
                        : null,
              abv_lt:
                values.abv?.value === "4-5"
                  ? "5"
                  : values.abv?.value === "5-6"
                    ? "6"
                    : values.abv?.value === ""
                      ? null
                      : values.abv?.value === "6-7"
                        ? "7"
                        : null,
              ibu_gt:
                values.ibu?.value === "5-25"
                  ? "5"
                  : values.ibu?.value === "25-50"
                    ? "25"
                    : values.ibu?.value === "50-100"
                      ? "50"
                      : values.ibu?.value === ""
                        ? null
                        : values.ibu?.value === "100-120"
                          ? "100"
                          : null,
              ibu_lt:
                values.ibu?.value === "5-25"
                  ? "25"
                  : values.ibu?.value === "25-50"
                    ? "50"
                    : values.ibu?.value === "50-100"
                      ? "100"
                      : values.ibu?.value === ""
                        ? null
                        : values.ibu?.value === "100-120"
                          ? "120"
                          : null,
              abv: values.abv
                ? values.abv.value
                : null,
              ibu: values.ibu
                ? values.ibu.value
                : null,
              food: values.food
                ? values.food.value
                : null,

              brewed_before: values.brewed_before
                ? convertDateToString(values.brewed_before)
                : null,
              brewed_after: values.brewed_after
                ? convertDateToString(values.brewed_after)
                : null,
            };
            dispatch(getFilteredBeerList(filter, 1));
            onSubmitProps.setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form className={classes.form}>
                <div className={classes.name_input_wrapper}>

                  <div >

                    <div className={classes.formikInputTitle}>
                      Search by name
                    </div>
                    <Field
                      id="term"
                      name="term" placeholder="Enter beer name"
                      className={classNames(classes.inputField, { [classes.invalid]: errors.term })}
                    />
                  </div>
                  {errors.term ? <div className={classes.form_error_message}>{errors.term}</div> : null}
                </div>


                <div>
                  <div className={classes.formikControls}>
                    <div className={classes.formikInputTitle}>
                      Alcohol by Volume
                    </div>

                    <SelectForm
                      name="abv"
                      placeholder="Select ABV ..."
                      options={abvOptions}
                      setFieldValue={setFieldValue}
                      value={values.abv}
                    />


                    <div className={classes.formikInputTitle}>
                      International Bitterness Units
                    </div>

                    <SelectForm
                      name="ibu"
                      placeholder="Select IBU ..."
                      options={ibuOptions}
                      setFieldValue={setFieldValue}
                      value={values.ibu}
                    />
                    <div className={classes.formikInputTitle}>Food pairing</div>
                    <SelectForm
                      name="food"
                      placeholder="Select food pairing ..."
                      options={foodOptions}
                      setFieldValue={setFieldValue}
                      value={values.food}
                    />
                    <div className={classes.formikInputTitle}>
                      Brewed before:
                    </div>
                    <DatePickerFormik
                      name="brewed_before"
                    // name="brewed_beforeDate"
                    />

                    <div className={classes.formikInputTitle}

                    >
                      Brewed after:
                    </div>
                    <DatePickerFormik
                      name="brewed_after"
                    // name="brewed_afterDate"
                    />
                  </div>
                  <div className={classes.buttons} >
                    <button

                      className={"button_default_gray"}
                      type="submit">
                      Search
                    </button>

                    <button
                      className={"button_default_gray"}
                      type="reset"
                      onClick={resetFilter}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BeerFormik;


import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Formik.module.css";





type DatePickerPropsType = {
  name: string;
};

const DatePickerFormik: React.FC<DatePickerPropsType> = (props) => {
  const { name } = props;

  return (
    <div className={classes.date_picker_wrapper}>
      <Field name={name} >
        {({ form, field }: { [key: string]: any }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <DatePicker
              id={name}
              {...field}
              selected={value}
              dateFormat="MM/yyyy"
              onChange={(val: Date) => setFieldValue(name, val)}
              className={classes.dateField}
              placeholderText="Select a date"
              input={true}
              isClearable
              fixedHeight
              popperClassName="datePicker_popper"
            />
          );
        }}
      </Field>
    </div>
  );
};


export default DatePickerFormik;
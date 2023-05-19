import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select, { StylesConfig, SingleValue, ActionMeta, GroupBase } from 'react-select';
import { OptionType } from './FormikContainer'
import "./SelectForm.css";

const customStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (base, state) => ({
    backgroundColor: "#dbdbdb85",
    color: "gray",
    alignItems: "spaceBetween",
    display: "flex",
    height: "40px",
    borderRadius: "5px",

  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,

  }),
  placeholder: (base) => ({
    ...base,
    color: "#bdbdbb",

  }),

  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    borderRadius: "5px",

  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: "#dbdbdb85",
    color: "#777777",

    height: "56px",
    padding: 20,
    cursor: "pointer",
    ":active": {
      ...styles[":active"],
      color: "#cab02d",
      backgroundColor: "#2F2F2F",
    },
    ":hover": {
      ...styles[":hover"],
      color: "#d4d2d2",
      backgroundColor: "#868585",
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "darkgray",
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : '',
    marginRight: 5,
    cursor: "pointer",
    ":hover": {
      ...base[":hover"],
      color: "gray",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#cab02d",
    padding: 5,
  }),
  clearIndicator: (base) => ({
    ...base,
    cursor: "pointer",
    color: "darkgray",
    ":hover": {
      ...base[":hover"],
      color: "gray",
    },

  }),


};


type SelectProps = {
  name: string
  options: Array<OptionType>
  setFieldValue: (name: string, option: SingleValue<OptionType>) => void
  placeholder: string
  value: OptionType | null
  // isMulti: boolean,
};

const SelectForm: React.FC<SelectProps> = ({
  name,
  setFieldValue,
  options,
  placeholder,
  value
}) => {
  const handleSelectionChange = (option: SingleValue<OptionType> | null, actionMeta: ActionMeta<OptionType>) => {
    if (option) {
      setFieldValue(name, option)
    }
    if (actionMeta.action === 'clear') {
      setFieldValue(name, null)
    }
  }
  return (
    <>
      <Select
        value={value}
        name={name}
        options={options}
        onChange={handleSelectionChange}
        placeholder={placeholder}
        styles={customStyles}
        isMulti={false}
        isClearable
        classNamePrefix="searchForm"
      />
    </>
  );
};
export default SelectForm;
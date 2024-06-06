/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import MultiSelect from "../inputs/MultiSelect";
import { AppContext } from "../../context/AppContext";

const CategorySelector = ({
  initialValue = [],
  onChange = () => {},
  maxCount = 5,
}) => {
  const [selected, setSelected] = useState(initialValue);
  const { categoryOptions } = useContext(AppContext);
  return (
    <MultiSelect
      options={categoryOptions}
      value={selected}
      onChange={(values) => {
        setSelected(values);
        onChange(values);
      }}
      maxCount={maxCount}
    />
  );
};

export default CategorySelector;

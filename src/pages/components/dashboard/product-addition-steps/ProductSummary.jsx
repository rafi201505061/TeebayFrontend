/* eslint-disable react/prop-types */
import { useContext } from "react";
import ProductCreationStepHOC from "./ProductCreationStepHOC";
import { AppContext } from "../../../../context/AppContext";

const ProductSummary = ({
  title = "",
  description = "",
  categories = [],
  price = "",
  rentPrice = "",
  rentType = "",
}) => {
  const { categoryMap } = useContext(AppContext);
  return (
    <ProductCreationStepHOC title="Summary" justify="flex-start">
      <p>Title: {title}</p>
      <p>
        Categories: {categories.map((id) => categoryMap[id].title).join(",")}
      </p>
      <p>Description: {description}</p>
      <p>{`Price: $${price}, To Rent: $${rentPrice} ${rentType}`}</p>
    </ProductCreationStepHOC>
  );
};

export default ProductSummary;

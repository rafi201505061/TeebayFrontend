/* eslint-disable react/prop-types */
import CategorySelector from "../../../../components/generic/CategorySelector";
import ProductCreationStepHOC from "./ProductCreationStepHOC";

const ProductCategories = ({ categories = [], setCategories = () => {} }) => {
  return (
    <ProductCreationStepHOC title="Select categories">
      <CategorySelector
        initialValue={categories}
        onChange={(val) => setCategories(val)}
      />
    </ProductCreationStepHOC>
  );
};

export default ProductCategories;

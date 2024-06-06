/* eslint-disable react/prop-types */
import TextInput from "../../../../components/inputs/TextInput";
import ProductCreationStepHOC from "./ProductCreationStepHOC";

const ProductTitle = ({
  value = "",
  onChange = () => {},
  onEnter = () => {},
}) => {
  return (
    <ProductCreationStepHOC title="Select a title for your product">
      <TextInput value={value} onChange={onChange} onEnter={onEnter} />
    </ProductCreationStepHOC>
  );
};

export default ProductTitle;

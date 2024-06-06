/* eslint-disable react/prop-types */
import ProductCreationStepHOC from "./ProductCreationStepHOC";
import TextArea from "../../../../components/inputs/TextArea";

const ProductDescription = ({
  value = "",
  onChange = () => {},
  onEnter = () => {},
}) => {
  return (
    <ProductCreationStepHOC title="Add description">
      <TextArea value={value} onChange={onChange} onEnter={onEnter} />
    </ProductCreationStepHOC>
  );
};

export default ProductDescription;

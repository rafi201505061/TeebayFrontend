/* eslint-disable react/prop-types */
import { Radio } from "antd";
import RentDurationSelector from "../../../../components/generic/RentDurationSelector";
import NumericInput from "../../../../components/inputs/NumericInput";
import ProductCreationStepHOC from "./ProductCreationStepHOC";

const ProductPriceInputForm = ({
  value = "",
  onChange = () => {},
  rentPrice = "",
  onRentPriceChange = () => {},
  rentDuration = null,
  listingType = null,
  onRentDurationChange = () => {},
  onListingTypeChange = () => {},
}) => {
  return (
    <ProductCreationStepHOC title="Listing Details">
      <Radio.Group
        onChange={(e) => onListingTypeChange(e.target.value)}
        value={listingType}
        style={{ marginBottom: 20 }}
      >
        <Radio value={"BUY"}>For Sale</Radio>
        <Radio value={"RENT"}>For rent</Radio>
      </Radio.Group>
      {listingType === "BUY" ? (
        <NumericInput value={value} onChange={onChange} placeholder="Price" />
      ) : (
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ flex: 1 }}>
            <NumericInput
              value={rentPrice}
              onChange={onRentPriceChange}
              placeholder="Rent Charge"
            />
          </div>
          <div style={{ flex: 1 }}>
            <RentDurationSelector
              value={rentDuration}
              onChange={onRentDurationChange}
            />
          </div>
        </div>
      )}
    </ProductCreationStepHOC>
  );
};

export default ProductPriceInputForm;

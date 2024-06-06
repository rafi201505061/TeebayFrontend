/* eslint-disable react/prop-types */
import NumericInput from "../inputs/NumericInput";

const PriceRangeSelector = ({
  minPrice = "",
  maxPrice = "",
  onChangeMinPrice = () => {},
  onChangeMaxPrice = () => {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
        margin: "10px 0px",
        alignItems: "center",
      }}
    >
      <NumericInput
        value={minPrice}
        onChange={onChangeMinPrice}
        placeholder="From"
      />
      <p style={{ color: "var(--Gray)", fontSize: 20, fontWeight: 500 }}>-</p>
      <NumericInput
        value={maxPrice}
        onChange={onChangeMaxPrice}
        placeholder="to"
      />
    </div>
  );
};

export default PriceRangeSelector;

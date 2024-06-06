/* eslint-disable react/prop-types */
import { Button, Radio } from "antd";
import TextInput from "../inputs/TextInput";
import CategorySelector from "./CategorySelector";
import RentDurationSelector from "./RentDurationSelector";
import { HomeUtils } from "../../pages/utils/home-screen-utils";
import styles from "./css/filter-container.module.css";
import PriceRangeSelector from "./PriceRangeSelector";
import classNames from "classnames";
import useMobileDevice from "../../hooks/useMobileDevice";
const FilterContainer = ({
  state,
  updateState,
  setRefreshToken,
  open = true,
  setOpenFilter,
}) => {
  const acquisitionType = state.acquisitionType;
  const isMobile = useMobileDevice();

  return (
    <div
      className={classNames({
        [styles["container"]]: true,
        [styles["container-hidden"]]: !open,
        [styles["container-show"]]: open,
      })}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Search</h1>
      </div>

      <div>
        <h4>Title</h4>
        <TextInput
          value={state.title}
          onChange={(title) => updateState({ title })}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: 4 }}>Category</h4>
        <CategorySelector
          initialValue={state.categories}
          onChange={(categories) => updateState({ categories })}
          maxCount={1}
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <div>
          <Radio
            checked={acquisitionType === "BUY"}
            onClick={() => {
              updateState({
                acquisitionType: "BUY",
                minPrice: "",
                maxPrice: "",
              });
            }}
          >
            Buy
          </Radio>
          {acquisitionType === "BUY" && (
            <PriceRangeSelector
              minPrice={state.minPrice}
              maxPrice={state.maxPrice}
              onChangeMinPrice={(minPrice) => {
                updateState({ minPrice });
              }}
              onChangeMaxPrice={(maxPrice) => {
                updateState({ maxPrice });
              }}
            />
          )}
        </div>
        <div>
          <Radio
            checked={acquisitionType === "RENT"}
            onClick={() => {
              updateState({
                acquisitionType: "RENT",
                minPrice: "",
                maxPrice: "",
              });
            }}
          >
            Rent
          </Radio>
          {acquisitionType === "RENT" && (
            <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
              <PriceRangeSelector
                minPrice={state.minPrice}
                maxPrice={state.maxPrice}
                onChangeMinPrice={(minPrice) => {
                  updateState({ minPrice });
                }}
                onChangeMaxPrice={(maxPrice) => {
                  updateState({ maxPrice });
                }}
              />
              <RentDurationSelector
                value={state.rentType}
                onChange={(rentType) => updateState({ rentType })}
              />
            </div>
          )}
        </div>
      </div>
      <div className="center" style={{ gap: 8, marginTop: 16 }}>
        <Button
          type="default"
          onClick={() => {
            setRefreshToken((prev) => prev + 1);
            updateState(HomeUtils.INITIAL_FILTER_STATE);
          }}
        >
          Clear
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setRefreshToken((prev) => prev + 1);
            updateState({ pageNo: 0 });
            if (isMobile) {
              setOpenFilter(false);
            }
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterContainer;

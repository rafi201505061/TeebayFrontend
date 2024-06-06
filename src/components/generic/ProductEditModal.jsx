/* eslint-disable react/prop-types */
import { Modal, Radio } from "antd";
import styles from "./css/product-edit-modal.module.css";
import TextInput from "../inputs/TextInput";
import CategorySelector from "./CategorySelector";
import TextArea from "../inputs/TextArea";
import NumericInput from "../inputs/NumericInput";
import RentDurationSelector from "./RentDurationSelector";
import { ProductUtils } from "../../pages/utils/product-utils";
import { useState } from "react";
import { ProductService } from "../../services/product-service";
const validateState = (state) => {
  return (
    state.title &&
    state.categories.length > 0 &&
    state.description !== "" &&
    state.listingType &&
    ((state.listingType === "BUY" && state.price) ||
      (state.listingType === "RENT" && state.rentPrice && state.rentType))
  );
};
const ProductEditModal = ({
  open = false,
  onCancel = () => {},
  onSuccess = () => {},
  id,
  initialState = ProductUtils.PRODUCT_DETAILS_INITIAL_STATE,
}) => {
  const [state, setState] = useState(initialState);
  const [updating, setUpdating] = useState(false);
  const updateState = (partial) => {
    setState((prev) => ({ ...prev, ...partial }));
  };
  const handleEdit = async () => {
    try {
      setUpdating(true);
      const product = await ProductService.updateProduct(id, state);
      onSuccess(product);
      setUpdating(false);
      onCancel();
    } catch (error) {
      setUpdating(false);
    }
  };
  return (
    <Modal
      open={open}
      onOk={handleEdit}
      onCancel={onCancel}
      className="product-edit-modal"
      confirmLoading={updating}
      okButtonProps={{ disabled: !validateState(state) }}
    >
      <div className={styles["body"]}>
        <div>
          <h4>Title</h4>
          <TextInput
            value={state.title}
            onChange={(title) => {
              updateState({ title });
            }}
          />
        </div>
        <div>
          <h4>Categories</h4>
          <CategorySelector
            initialValue={state.categories}
            onChange={(categories) => {
              updateState({ categories });
            }}
          />
        </div>
        <div>
          <h4>Description</h4>
          <TextArea
            value={state.description}
            onChange={(description) => {
              updateState({ description });
            }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
        >
          <Radio.Group
            onChange={(e) => updateState({ listingType: e.target.value })}
            value={state.listingType}
            style={{ marginBottom: 20 }}
          >
            <Radio value={"BUY"}>For Sale</Radio>
            <Radio value={"RENT"}>For rent</Radio>
          </Radio.Group>
          {state.listingType === "BUY" ? (
            <NumericInput
              value={state.price}
              onChange={(price) => updateState({ price })}
              placeholder="Price"
            />
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
                  value={state.rentPrice}
                  onChange={(rentPrice) => updateState({ rentPrice })}
                  placeholder="Rent Charge"
                />
              </div>
              <div style={{ flex: 1 }}>
                <RentDurationSelector
                  value={state.rentType}
                  onChange={(rentType) => updateState({ rentType })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductEditModal;

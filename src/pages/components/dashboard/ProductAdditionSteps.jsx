/* eslint-disable react/prop-types */
import { Button } from "antd";
import { useContext, useState } from "react";
import ProductTitle from "./product-addition-steps/ProductTitle";
import ProductCategories from "./product-addition-steps/ProductCategories";
import ProductDescription from "./product-addition-steps/ProductDescription";
import ProductPriceInputForm from "./product-addition-steps/ProductPriceInputForm";
import ProductSummary from "./product-addition-steps/ProductSummary";
import { ProductService } from "../../../services/product-service";
import { CommonUtils } from "../../../utils/common-utils";
import { TOAST_TYPE } from "../../../enums/toast-type";
import { AppContext } from "../../../context/AppContext";
import { X } from "@phosphor-icons/react";
import { ProductUtils } from "../../utils/product-utils";

const ProductAdditionSteps = ({ onSuccess = () => {}, onClose = () => {} }) => {
  const { user } = useContext(AppContext);
  const [productDetails, setProductDetails] = useState(
    ProductUtils.PRODUCT_DETAILS_INITIAL_STATE
  );
  const [step, setStep] = useState(0);
  const [creating, setCreating] = useState(false);
  const updateProductDetails = (partialDetails) => {
    setProductDetails((prev) => ({ ...prev, ...partialDetails }));
  };
  const handleCreate = async () => {
    try {
      setCreating(true);

      const product = await ProductService.createProduct({
        ...productDetails,
        price: Number.parseFloat(productDetails.price),
        rentPrice: Number.parseFloat(productDetails.rentPrice),
        ownerId: user?.id,
      });
      CommonUtils.showToast(TOAST_TYPE.SUCCESS, "Product added successfully.");
      onSuccess(product);
      onClose();
      setCreating(false);
    } catch (error) {
      CommonUtils.showToast(TOAST_TYPE.ERROR, error?.message);
      setCreating(false);
    }
  };
  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };
  const handlePrev = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const validateStep = () => {
    return !(step === 0
      ? !productDetails.title
      : step === 1
      ? productDetails.categories.length === 0
      : step === 2
      ? !productDetails.description
      : step === 3
      ? !["BUY", "RENT"].includes(productDetails.listingType) ||
        (productDetails.listingType === "BUY" && !productDetails.price) ||
        (productDetails.listingType === "RENT" &&
          (!productDetails.rentPrice || !productDetails.rentType))
      : false);
  };
  const isStepValid = validateStep();

  return (
    <div
      className="center"
      style={{
        height: "100%",
        position: "fixed",
        inset: 0,
        background: "white",
        zIndex: 101,
      }}
    >
      <X
        size={24}
        color="var(--Gray)"
        onClick={onClose}
        style={{ position: "absolute", top: 20, right: 20, cursor: "pointer" }}
      />
      <div
        style={{
          display: "flex",
          width: "60%",
          maxWidth: 400,
          flexDirection: "column",
        }}
      >
        <div style={{ width: "100%" }}>
          {step === 0 ? (
            <ProductTitle
              value={productDetails.title}
              onChange={(title) => {
                updateProductDetails({ title });
              }}
              onEnter={handleNext}
            />
          ) : step === 1 ? (
            <ProductCategories
              categories={productDetails.categories}
              setCategories={(categories) => {
                updateProductDetails({ categories });
              }}
            />
          ) : step === 2 ? (
            <ProductDescription
              value={productDetails.description}
              onChange={(description) => {
                updateProductDetails({ description });
              }}
              onEnter={handleNext}
            />
          ) : step === 3 ? (
            <ProductPriceInputForm
              value={productDetails.price}
              onChange={(price) => {
                updateProductDetails({ price });
              }}
              listingType={productDetails.listingType}
              rentPrice={productDetails.rentPrice}
              rentDuration={productDetails.rentType}
              onListingTypeChange={(listingType) => {
                updateProductDetails({ listingType });
              }}
              onRentDurationChange={(rentType) => {
                updateProductDetails({ rentType });
              }}
              onRentPriceChange={(rentPrice) => {
                updateProductDetails({ rentPrice });
              }}
              onEnter={handleNext}
            />
          ) : step === 4 ? (
            <ProductSummary {...productDetails} />
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: step === 0 ? "flex-end" : "space-between",
            marginTop: 36,
          }}
        >
          {step === 0 ? null : (
            <Button type="primary" onClick={handlePrev}>
              Back
            </Button>
          )}

          {step === 4 ? (
            <Button type="primary" onClick={handleCreate} loading={creating}>
              Submit
            </Button>
          ) : (
            <Button type="primary" onClick={handleNext} disabled={!isStepValid}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAdditionSteps;

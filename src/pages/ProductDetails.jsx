/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { ProductService } from "../services/product-service";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductItemSkeleton from "../skeletons/ProductItemSkeleton";
import EmptyProductList from "./components/dashboard/EmptyProductList";
import { Button } from "antd";
import Navbar from "../components/generic/Navbar";
import ProductBuyConfirmationModal from "../components/generic/ProductBuyConfirmationModal";
import ProductBorrowModal from "../components/generic/ProductBorrowModal";
import styles from "./css/product-details.module.css";
const ProductDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [openBuyConfirmationModal, setOpenBuyConfirmationModal] =
    useState(false);

  const [openBorrowConfirmationModal, setOpenBorrowConfirmationModal] =
    useState(false);

  const retrieveDetails = async (source) => {
    try {
      setLoading(true);
      const data = await ProductService.retrieveProductDetails({
        id: params.id,
        source,
      });
      setDetails(data);
      setLoading(false);
    } catch (error) {
      setDetails(null);
      setLoading(false);
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    retrieveDetails(source);
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (details?.id) ProductService.updateViewCount(details?.id);
  }, [details?.id]);

  return loading ? (
    <ProductItemSkeleton />
  ) : details ? (
    <div className={styles["container"]}>
      <Navbar />
      <div className={styles["content-container"]}>
        <div className={styles["content"]}>
          <div className="space-between" style={{ position: "relative" }}>
            <h2>{details?.title}</h2>
          </div>
          <div
            style={{
              padding: "2px 10px",
              borderRadius: 6,
              background:
                details?.listingType === "BUY" ? "var(--Green)" : "#d35400",
              width: "fit-content",
              color: "white",
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            <p style={{ width: "fit-content" }}>
              {details?.listingType === "BUY" ? "For Sale" : "For Rent"}
            </p>
          </div>
          <p className="secondary-text">
            {details.categories.map((item) => item.title).join(", ")}
          </p>
          <p className="secondary-text" style={{ marginTop: 4 }}>
            {details.listingType === "BUY"
              ? `Price: $${details.price}`
              : `Rent: $${details.rentPrice} ${details.rentType}`}
          </p>
          <p className="description-text">{details.description}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
            {details.listingType === "RENT" ? (
              <Button
                type="primary"
                onClick={() => {
                  setOpenBorrowConfirmationModal(true);
                }}
              >
                Rent
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setOpenBuyConfirmationModal(true);
                }}
                style={{ marginTop: 20 }}
              >
                Buy
              </Button>
            )}
          </div>
        </div>
      </div>
      <ProductBuyConfirmationModal
        open={openBuyConfirmationModal}
        onCancel={() => {
          setOpenBuyConfirmationModal(false);
        }}
        id={details?.id}
        version={details?.version}
      />
      <ProductBorrowModal
        open={openBorrowConfirmationModal}
        onCancel={() => {
          setOpenBorrowConfirmationModal(false);
        }}
        id={details?.id}
        version={details?.version}
      />
    </div>
  ) : (
    <EmptyProductList />
  );
};

export default ProductDetails;

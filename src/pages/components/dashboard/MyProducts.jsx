/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import styles from "./css/my-products.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import ProductAdditionSteps from "./ProductAdditionSteps";
import { ProductService } from "../../../services/product-service";
import axios from "axios";
import ProductListHOC from "./ProductListHOC";
import { Plus } from "@phosphor-icons/react";
const pageSize = 15;
const MyProducts = () => {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);
  const initialLoading = useRef(true);
  const pageNo = Math.floor(products.length / pageSize);

  const [showCreateProductSteps, setShowCreateProductSteps] = useState(false);
  const retrieveProductsOfUser = async (source) => {
    try {
      setLoading(true);
      const data = await ProductService.retrieveProductsOfUser({
        id: user?.id,
        pageNo,
        pageSize,
        source,
      });
      const toInsert = data.filter(
        (item) => !products.some((i) => i.id === item.id)
      );

      if (pageNo === 0) setProducts(toInsert);
      else setProducts((prev) => [...prev, ...toInsert]);
      setLoading(false);
      setHasMore(data.length === pageSize);
      initialLoading.current = false;
    } catch (error) {
      if (!axios.isCancel(error)) {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    if (user?.id) retrieveProductsOfUser(source);
    return () => {
      source.cancel();
    };
  }, [user?.id, refreshToken]);
  return (
    <div className={styles["container"]}>
      {/* <div className={styles["top-bar"]}> */}
      <Button
        type="primary"
        shape="round"
        icon={<Plus />}
        onClick={() => setShowCreateProductSteps(true)}
        style={{ position: "absolute", bottom: 20, right: 20, zIndex: 1000 }}
      />

      <div style={{ width: "100%" }}>
        <ProductListHOC
          products={products}
          hasMore={hasMore}
          loading={loading}
          pageNo={pageNo}
          onLoadMore={() => {
            setRefreshToken((prev) => prev + 1);
          }}
          allowDelete
          allowEdit
          onEditSuccess={(id, updatedProduct) => {
            setProducts((prev) =>
              prev.map((product) =>
                product.id === id ? updatedProduct : product
              )
            );
          }}
          onDeleteSuccess={(id) => {
            const newProducts = products.filter((product) => product.id !== id);
            setProducts(newProducts);
            if (newProducts.length === 0) setRefreshToken((prev) => prev + 1);
          }}
        />
      </div>
      <br />

      {showCreateProductSteps && (
        <ProductAdditionSteps
          onClose={() => {
            setShowCreateProductSteps(false);
          }}
          onSuccess={(product) => {
            setProducts((prev) => [product, ...prev]);
          }}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default MyProducts;

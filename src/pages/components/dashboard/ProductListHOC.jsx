/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import ProductItem from "../../../components/generic/ProductItem";
import styles from "./css/product-list.module.css";
import ProductItemSkeleton from "../../../skeletons/ProductItemSkeleton";
import EmptyProductList from "./EmptyProductList";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ProductListHOC = ({
  products = [],
  pageNo = 0,
  loading = true,
  hasMore = false,
  onLoadMore = () => {},
  // contentPadding = "60px 32px",
  enableDetailsNavigation = false,
  allowDelete = false,
  allowEdit = false,
  onDeleteSuccess = () => {},
  onEditSuccess = () => {},
}) => {
  const navigate = useNavigate();
  const [lastElementRef, setLastElementRef] = useState(null);
  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;
  useEffect(() => {
    let observer;
    if (lastElementRef) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMoreRef.current) {
          onLoadMore();
        }
      });
      observer.observe(lastElementRef);
    }
  }, [lastElementRef]);
  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        {pageNo === 0 && loading ? (
          [0, 1].map((item) => <ProductItemSkeleton key={item} />)
        ) : products.length === 0 ? (
          <EmptyProductList />
        ) : (
          <>
            {products.map((item, index) => (
              <ProductItem
                key={item.id}
                {...item}
                onClick={() => {
                  if (enableDetailsNavigation) {
                    navigate("/products/" + item.productId);
                  }
                }}
                allowDelete={allowDelete}
                allowEdit={allowEdit}
                onEditSuccess={(newProduct) =>
                  onEditSuccess(item.id, newProduct)
                }
                onDeleteSuccess={() => {
                  onDeleteSuccess(item.id);
                }}
                marginBottom={index === products.length - 1 ? 160 : 0}
                ref={(node) => setLastElementRef(node)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListHOC;

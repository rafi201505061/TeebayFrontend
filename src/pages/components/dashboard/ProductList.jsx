/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import ProductListHOC from "./ProductListHOC";
const pageSize = 15;
const ProductList = ({ retrieveData }) => {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const initialLoading = useRef(true);

  const retrieveProductsOfUser = async (source) => {
    try {
      setLoading(true);
      const data = await retrieveData({
        id: user?.id,
        pageNo,
        pageSize,
        source,
      });
      if (pageNo === 0) setProducts(data);
      else setProducts((prev) => [...prev, ...data]);
      setLoading(false);
      setHasMore(data.length === pageSize);
      initialLoading.current = false;
    } catch (error) {
      if (axios.isCancel(error)) {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (user?.id) retrieveProductsOfUser(source);
    return () => {
      source.cancel();
    };
  }, [user?.id, pageNo]);
  return (
    <ProductListHOC
      products={products}
      pageNo={pageNo}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={() => {
        setPageNo((prev) =>
          Math.max(prev + 1, Math.floor(products.length / pageSize))
        );
      }}
    />
  );
};

export default ProductList;

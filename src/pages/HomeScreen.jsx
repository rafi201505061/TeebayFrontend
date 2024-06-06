/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProductService } from "../services/product-service";
import axios from "axios";
import Navbar from "../components/generic/Navbar";
import ProductListHOC from "./components/dashboard/ProductListHOC";
import { HomeUtils } from "./utils/home-screen-utils";
import FilterContainer from "../components/generic/FilterContainer";
import useMobileDevice from "../hooks/useMobileDevice";
const pageSize = 15;

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);
  const [state, setState] = useState(HomeUtils.INITIAL_FILTER_STATE);
  const isMobile = useMobileDevice();
  const [openFilter, setOpenFilter] = useState(!isMobile);
  const updateState = (partial) => {
    setState((prev) => ({ ...prev, ...partial }));
  };
  const retrieveProducts = async (source) => {
    try {
      setLoading(true);
      const data = await ProductService.retrieveProducts({
        ...state,
        pageSize,
        categoryId: state.categories.join(","),
        source,
      });
      if (state.pageNo === 0) {
        setProducts(data);
      } else setProducts((prev) => [...prev, ...data]);
      setHasMore(data.length === pageSize);
      setLoading(false);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    retrieveProducts(source);
    return () => {
      source.cancel();
    };
  }, [refreshToken, state.pageNo]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Navbar
        onClick={() => {
          setOpenFilter((prev) => !prev);
        }}
        showMenu={true}
      />
      <div
        style={{
          display: "flex",
          height: "calc(100% - 68px)",
          width: "100%",
          marginTop: 68,
          position: "relative",
        }}
      >
        <FilterContainer
          state={state}
          updateState={updateState}
          setRefreshToken={setRefreshToken}
          open={openFilter}
          setOpenFilter={setOpenFilter}
        />
        <div
          style={{
            paddingLeft: isMobile ? 0 : openFilter ? 310 : 0,
            transition: "all .3s",
            width: "100%",
          }}
        >
          <ProductListHOC
            products={products}
            loading={loading}
            pageNo={state.pageNo}
            hasMore={hasMore}
            onLoadMore={() => {
              updateState({
                pageNo: Math.floor(products.length / pageSize),
              });
            }}
            enableDetailsNavigation
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

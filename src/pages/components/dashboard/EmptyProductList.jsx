import { AnchorSimple } from "@phosphor-icons/react";

const EmptyProductList = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <AnchorSimple fontSize={100} color="var(--Black)" />
      <h1>No Products Found</h1>
    </div>
  );
};

export default EmptyProductList;

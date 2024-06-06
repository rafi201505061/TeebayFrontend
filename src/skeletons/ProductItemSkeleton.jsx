import Skeleton from "react-loading-skeleton";
import styles from "./css/product-item-skeleton.module.css";
const ProductItemSkeleton = () => {
  return (
    <div className={styles["container"]}>
      <div className="space-between" style={{ position: "relative" }}>
        <Skeleton style={{ height: 30, width: 200 }} />
      </div>
      <Skeleton style={{ height: 20, width: "80%" }} />

      <Skeleton style={{ height: 20, width: "40%" }} />

      <Skeleton count={4} style={{ height: 20, width: "100%" }} />

      <div className="space-between">
        <Skeleton style={{ height: 20, width: "30%" }} />
        <Skeleton style={{ height: 20, width: "30%" }} />
      </div>
    </div>
  );
};

export default ProductItemSkeleton;

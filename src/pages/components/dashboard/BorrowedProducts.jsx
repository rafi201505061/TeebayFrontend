import { ProductService } from "../../../services/product-service";
import ProductList from "./ProductList";

const BorrowedProducts = () => {
  const retrieveProducts = async ({ id, pageNo, pageSize, source }) => {
    return await ProductService.retrieveBorrowedProductsOfUser({
      id,
      pageNo,
      pageSize,
      source,
    });
  };
  return <ProductList retrieveData={retrieveProducts} />;
};

export default BorrowedProducts;

/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ProductService } from "../../services/product-service";
import { TOAST_TYPE } from "../../enums/toast-type";
import { CommonUtils } from "../../utils/common-utils";

const ProductBuyConfirmationModal = ({
  open = false,
  id,
  version,
  onCancel = () => {},
}) => {
  const { user } = useContext(AppContext);

  const [buying, setBuying] = useState(false);

  const handleBuy = async () => {
    try {
      setBuying(true);
      await ProductService.buy({
        id,
        userId: user?.id,
        version,
      });
      onCancel();
      setBuying(false);
      CommonUtils.showToast(
        TOAST_TYPE.SUCCESS,
        "You have successfully bought the product."
      );
    } catch (error) {
      setBuying(false);
      CommonUtils.showToast(TOAST_TYPE.ERROR, error?.message ?? "");
    }
  };
  return (
    <Modal
      open={open}
      onOk={handleBuy}
      onCancel={onCancel}
      className="product-delete-modal"
      confirmLoading={buying}
      cancelButtonProps={{ name: "No" }}
      okButtonProps={{ danger: true }}
      okText="Yes"
      cancelText="No"
    >
      <div style={{ padding: "20px 0px" }}>
        <h1>Are you sure you want to buy this product?</h1>
      </div>
    </Modal>
  );
};

export default ProductBuyConfirmationModal;

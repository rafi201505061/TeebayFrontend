/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ProductService } from "../../services/product-service";
import DateRange from "../DateRange";
import { CommonUtils } from "../../utils/common-utils";
import { TOAST_TYPE } from "../../enums/toast-type";

const ProductBorrowModal = ({
  open = false,
  id,
  version,
  onCancel = () => {},
}) => {
  const [borrowing, setBorrowing] = useState(false);
  const { user } = useContext(AppContext);
  const [range, setRange] = useState({
    fromTimestamp: null,
    toTimestamp: null,
  });
  const handleBorrow = async () => {
    try {
      setBorrowing(true);
      await ProductService.borrow({
        id,
        userId: user?.id,
        version,
      });
      setBorrowing(false);
      onCancel();
      CommonUtils.showToast(
        TOAST_TYPE.SUCCESS,
        "You have successfully booked the product."
      );
    } catch (error) {
      setBorrowing(false);
      CommonUtils.showToast(TOAST_TYPE.ERROR, error?.message ?? "");
    }
  };
  return (
    <Modal
      title="Rental Period"
      open={open}
      onOk={handleBorrow}
      onCancel={onCancel}
      className="product-delete-modal"
      confirmLoading={borrowing}
      cancelButtonProps={{ name: "No" }}
      okButtonProps={{ danger: true }}
      okText="Yes"
      cancelText="No"
    >
      <div style={{ padding: "20px 0px", display: "flex" }}>
        <DateRange
          fromTimestamp={range.fromTimestamp}
          toTimestamp={range.toTimestamp}
          updateState={setRange}
          key={`${open}`}
        />
      </div>
    </Modal>
  );
};

export default ProductBorrowModal;

/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";
import { ProductService } from "../../services/product-service";
import { CommonUtils } from "../../utils/common-utils";
import { TOAST_TYPE } from "../../enums/toast-type";
const ProductDeleteConfirmationModal = ({
  id,
  onCancel = () => {},
  onDeleteSuccess = () => {},
  open = false,
}) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await ProductService.deleteProduct({ id });
      onDeleteSuccess();
      setDeleting(false);
      CommonUtils.showToast(TOAST_TYPE.SUCCESS, "Product deleted successfully");
    } catch (error) {
      CommonUtils.showToast(TOAST_TYPE.ERROR, error?.message);
      setDeleting(false);
    }
  };
  return (
    <Modal
      title="Delete Product"
      open={open}
      onOk={handleDelete}
      onCancel={onCancel}
      className="product-delete-modal"
      confirmLoading={deleting}
      cancelButtonProps={{ name: "No" }}
      okButtonProps={{ danger: true }}
      okText="Yes"
      cancelText="No"
    >
      <div style={{ padding: "20px 0px" }}>
        <p>Are you sure you want to delete?</p>
      </div>
    </Modal>
  );
};

export default ProductDeleteConfirmationModal;

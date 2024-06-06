/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styles from "./css/product-item.module.css";
import { forwardRef, useState } from "react";
import DangerIconButton from "../buttons/DangerIconButton";
import NormalIconButton from "../buttons/NormalIconButton";
import ProductEditModal from "./ProductEditModal";
import { Typography } from "antd";
import ProductDeleteConfirmationModal from "./ProductDeleteConfirmationModal";
import { CommonUtils } from "../../utils/common-utils";
import useMobileDevice from "../../hooks/useMobileDevice";
const ProductItem = forwardRef(
  (
    {
      id,
      title = "",
      description = "",
      categories = [],
      price = "",
      rentPrice = "",
      listingType = "",
      rentType = "",
      createdAt = 0,
      views = 0,
      allowDelete = false,
      allowEdit = false,
      onEditSuccess = () => {},
      onDeleteSuccess = () => {},
      onClick = () => {},
      bought = false,
      rented = false,
      acquiredAt = "",
      rentFrom = "",
      rentTo = "",
    },
    ref
  ) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
      useState(false);
    const isMobile = useMobileDevice();

    return (
      <div ref={ref} className={styles["container"]} onClick={onClick}>
        <div className="space-between" style={{ position: "relative" }}>
          <h2>{title}</h2>
          <div className={styles["action-container"]}>
            {allowEdit && (
              <NormalIconButton
                onClick={() => {
                  setOpenEditModal(true);
                }}
              />
            )}

            {allowDelete && (
              <DangerIconButton
                onClick={() => {
                  setOpenDeleteConfirmationModal(true);
                }}
                loading={false}
              />
            )}
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          {bought || rented ? (
            bought ? (
              <p
                style={{ color: "var(--Green)", fontSize: 14, fontWeight: 500 }}
              >
                Bought on:{" "}
                {CommonUtils.prettifyDate(Number(new Date(acquiredAt)))}
              </p>
            ) : (
              <p style={{ color: "#d35400", fontSize: 14, fontWeight: 500 }}>
                Rented on:{" "}
                {CommonUtils.prettifyDate(Number(new Date(acquiredAt)))} from{" "}
                {CommonUtils.prettifyDate(rentFrom)} to{" "}
                {CommonUtils.prettifyDate(rentTo)}
              </p>
            )
          ) : (
            <div
              style={{
                padding: "2px 10px",
                borderRadius: 6,
                background: listingType === "BUY" ? "var(--Green)" : "#d35400",
                width: "fit-content",
                color: "white",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <p style={{ width: "fit-content" }}>
                {listingType === "BUY" ? "For Sale" : "For Rent"}
              </p>
            </div>
          )}
        </div>

        <p className={styles["secondary-text"]}>
          {categories.map((item) => item.title).join(", ")}
        </p>
        <p className={styles["secondary-text"]} style={{ marginTop: 4 }}>
          {listingType === "BUY"
            ? `Price: $${price}`
            : `Rent: $${rentPrice} ${rentType}`}
        </p>
        <Typography.Paragraph
          className={styles["description-text"]}
          ellipsis={{
            rows: isMobile ? 2 : 4,
            expandable: "collapsible",
            expanded: expanded,
            onExpand: (_, info) => {
              setExpanded(info.expanded);
            },

            symbol: expanded ? "Less details" : "More details",
          }}
        >
          {description}
        </Typography.Paragraph>
        <div className="space-between">
          <p
            className={styles["secondary-text"]}
          >{`Posted On: ${CommonUtils.prettifyDate(
            Number(new Date(createdAt))
          )}`}</p>
          <p className={styles["secondary-text"]}>{`${views} views`}</p>
        </div>
        <ProductEditModal
          open={openEditModal}
          onCancel={() => {
            setOpenEditModal(false);
          }}
          id={id}
          initialState={{
            title,
            description,
            categories: categories.map((item) => item.id),
            price,
            rentPrice,
            rentType,
            listingType,
          }}
          onSuccess={onEditSuccess}
        />
        <ProductDeleteConfirmationModal
          open={openDeleteConfirmationModal}
          id={id}
          onDeleteSuccess={onDeleteSuccess}
          onCancel={() => {
            setOpenDeleteConfirmationModal(false);
          }}
        />
      </div>
    );
  }
);

export default ProductItem;

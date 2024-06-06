/* eslint-disable react/prop-types */
import "./css/nav-item.css";
import classNames from "classnames";

const NavItem = ({ Icon, name, marginTop = 0, active = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames({
        item: true,
        "item-active": active,
      })}
      style={{ marginTop }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Icon size={20} color={active ? "white" : "#4D657C"} />
        <p className="item-text">{name}</p>
      </div>
    </div>
  );
};

export default NavItem;

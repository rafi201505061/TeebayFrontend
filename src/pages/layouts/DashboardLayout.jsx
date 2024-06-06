import { useContext, useState } from "react";
import styles from "../css/dashboard-layout.module.css";
import {
  BabyCarriage,
  Bag,
  Book,
  BookmarksSimple,
  Coins,
  SignOut,
} from "@phosphor-icons/react";
import NavItem from "../components/dashboard/NavItem";
import MyProducts from "../components/dashboard/MyProducts";
import SoldProducts from "../components/dashboard/SoldProducts";
import BoughtProducts from "../components/dashboard/BoughtProducts";
import BorrowedProducts from "../components/dashboard/BorrowedProducts";
import LentProducts from "../components/dashboard/LentProducts";
// import { useNavigate } from "react-router-dom";
import Navbar from "../../components/generic/Navbar";
import classNames from "classnames";
import useMobileDevice from "../../hooks/useMobileDevice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { LocalStorageService } from "../../services/local-storage-service";
const ROUTES = [
  {
    key: "MY_PRODUCTS",
    name: "My Products",
    Icon: Book,
    marginTop: 0,
    content: <MyProducts />,
  },
  {
    key: "SOLD_PRODUCTS",
    name: "Sold Products",
    Icon: Coins,
    marginTop: 4,
    content: <SoldProducts />,
  },
  {
    key: "RENT_PRODUCTS",
    name: "Lent Products",
    Icon: BookmarksSimple,
    marginTop: 4,
    content: <LentProducts />,
  },
  {
    key: "BOUGHT_PRODUCTS",
    name: "Bought Products",
    Icon: BabyCarriage,
    marginTop: 4,
    content: <BoughtProducts />,
  },
  {
    key: "BORROWED_PRODUCTS",
    name: "Borrowed Products",
    Icon: Bag,
    marginTop: 4,
    content: <BorrowedProducts />,
  },
];
const DashboardLayout = () => {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("MY_PRODUCTS");
  const [openPanel, setOpenPanel] = useState(true);
  const isMobile = useMobileDevice();
  return (
    <div className={styles["container"]}>
      <Navbar
        onClick={() => {
          setOpenPanel((prev) => !prev);
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
        <div
          className={classNames({
            [styles["nav-panel"]]: true,
            [styles["nav-panel-open"]]: openPanel,
            [styles["nav-panel-hidden"]]: !openPanel,
          })}
        >
          <div style={{ padding: "0px 12px" }}>
            {ROUTES.map((item) => (
              <NavItem
                key={item.key}
                Icon={item.Icon}
                name={item.name}
                marginTop={item.marginTop}
                active={item.key === activeKey}
                onClick={() => {
                  setActiveKey(item.key);
                  if (isMobile) setOpenPanel(false);
                }}
              />
            ))}
            <Button
              type="primary"
              onClick={() => {
                setUser(null);
                LocalStorageService.deleteAuthToken();
                navigate("/");
              }}
              icon={<SignOut />}
              danger={true}
              style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
            >
              Log Out
            </Button>
          </div>
        </div>
        <div
          className={styles["content-panel"]}
          style={{ paddingLeft: isMobile || !openPanel ? 0 : 242 }}
        >
          <div style={{ height: "calc(100% - 68px)", overflow: "auto" }}>
            {ROUTES.find((item) => item.key === activeKey)?.content ?? null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

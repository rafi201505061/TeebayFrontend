import { NavLink } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>Not Found</h1>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default NotFoundScreen;

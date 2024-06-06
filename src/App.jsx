/* eslint-disable react-hooks/exhaustive-deps */
import LoginScreen from "./pages/LoginScreen";
import { Route, Routes } from "react-router-dom";
import SignUpScreen from "./pages/SignUpScreen";
import ToastContainerElement from "./components/generic/ToastContainerElement";
import { LocalStorageService } from "./services/local-storage-service";
import { AuthService } from "./services/auth-service";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import HomeSkeleton from "./skeletons/HomeSkeleton";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import { CategoryService } from "./services/category-service";
import HomeScreen from "./pages/HomeScreen";
import ProductDetails from "./pages/ProductDetails";
import NotFoundScreen from "./pages/NotFoundScreen";

function App() {
  const { user, setUser, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const retrieveCategories = async () => {
    const categories = await CategoryService.retrieveAllCategories();
    setCategories(categories);
  };
  const validateAccessToken = async () => {
    try {
      setLoading(true);
      const accessToken = LocalStorageService.getAuthToken();
      if (accessToken) {
        const user = await AuthService.checkAccessToken(accessToken);
        setUser(user);
      }
      setLoading();
    } catch (error) {
      LocalStorageService.deleteAuthToken();
    }
  };
  useEffect(() => {
    validateAccessToken();
    retrieveCategories();
  }, []);
  return (
    <>
      {loading ? (
        <HomeSkeleton />
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {user && <Route path="/dashboard" element={<DashboardLayout />} />}
          {!user && <Route path="/login" element={<LoginScreen />} />}
          {!user && <Route path="/sign-up" element={<SignUpScreen />} />}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      )}
      <ToastContainerElement />
    </>
  );
}

export default App;

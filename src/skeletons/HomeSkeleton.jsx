import Skeleton from "react-loading-skeleton";
import AuthLayout from "../pages/layouts/AuthLayout";
const HomeSkeleton = () => {
  return (
    <AuthLayout title="">
      <Skeleton style={{ height: 34, width: "100%" }} />
      <Skeleton style={{ height: 34, width: "100%" }} />
      <Skeleton style={{ height: 34, width: "100%" }} />
      <Skeleton style={{ height: 34, width: "100%" }} />
    </AuthLayout>
  );
};

export default HomeSkeleton;

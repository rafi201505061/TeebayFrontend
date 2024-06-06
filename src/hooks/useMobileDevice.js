import { useMediaQuery } from "react-responsive";

const useMobileDevice = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  return isMobile;
};

export default useMobileDevice;

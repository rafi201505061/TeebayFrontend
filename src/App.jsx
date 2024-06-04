import { ToastContainer } from "react-toastify";
import SignUpScreen from "./pages/SignUpScreen";

function App() {
  return (
    <>
      <SignUpScreen />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App;

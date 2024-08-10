import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const Logout = () => {
    secureLocalStorage.removeItem("district_head_authenticated");
    secureLocalStorage.removeItem("district_head_access_token");
    return <Navigate replace to="/login" />;
};
export default Logout
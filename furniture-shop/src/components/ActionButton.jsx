import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";

const ActionButton = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <button
            type="submit"
            className={`continueShopping text-white flex items-center justify-center bg-pink-600 px-[50px] py-[15px] ${isLoggedIn ? "btn-enabled" : "btn-disabled"}`}
            disabled={!isLoggedIn}
        >
            Continue Shopping
        </button>
    );
};

export default ActionButton;

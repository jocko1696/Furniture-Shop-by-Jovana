import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";

const ActionButton = ({ paymentMethod, handleSubmit }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <button
            type="submit"
            className={`continueShopping text-white flex items-center justify-center bg-pink-600 px-[50px] py-[15px] ${isLoggedIn ? "btn-enabled" : "btn-disabled"}`}
            disabled={!isLoggedIn}
            onClick={handleSubmit} // Call handleSubmit when clicked
        >
            {paymentMethod === "stripe" ? "Proceed to Stripe" : "Continue Shopping"}</button>
    );
};

export default ActionButton;

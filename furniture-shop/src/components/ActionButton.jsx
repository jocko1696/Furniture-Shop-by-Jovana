import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom"; // If you're using React Router

const ActionButton = ({ paymentMethod, handleSubmit }) => {
    const { isLoggedIn } = useContext(AuthContext);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     if (paymentMethod === "stripe") {
    //         // If Stripe payment is selected, redirect to Stripe checkout
    //         window.location.href = "/stripe-payment"; // Replace with your Stripe route
    //     } else if (paymentMethod === "cod") {
    //         // If Cash on Delivery is selected, submit the data to the database
    //         // Call your API to process the order and store customer data
    //         submitToDatabase(formData); // Call your function to save data in the database
    //
    //         // Redirect to success page after successful COD submission
    //         navigate("/success"); // Navigate to your success page
    //     }
    // };

    // const submitToDatabase = (data) => {
    //     // Replace this with the actual API call to save customer data
    //
    //     console.log("Submitting customer data to the database:", data);
    //     // Example: fetch("/api/submit-order", { method: "POST", body: JSON.stringify(data), ... });
    // };


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

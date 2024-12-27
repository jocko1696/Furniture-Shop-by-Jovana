import React, {useState} from 'react';

const Faq = () => {
    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards, PayPal, and Stripe for secure online transactions. Cash on delivery is available for select locations.",
        },
        {
            question: "Do you offer international shipping?",
            answer:
                "Yes, we ship to multiple countries worldwide. Shipping costs and delivery times vary depending on the destination.",
        },
        {
            question: "Can I track my order?",
            answer:
                "Yes, you can track your order using the tracking link sent to your email after the order is dispatched.",
        },
        {
            question: "How do I return a product?",
            answer:
                "To return a product, contact our customer support within 30 days of delivery to initiate a return. Ensure the product is unused and in its original packaging.",
        },
        {
            question: "Do you assemble the furniture?",
            answer:
                "Yes, we offer assembly services for an additional fee. You can select this option at checkout or request it from our support team.",
        },
        {
            question: "Are the materials eco-friendly?",
            answer:
                "Many of our products are made using sustainable and eco-friendly materials. Check the product description for specific details.",
        },
        {
            question: "What should I do if my order arrives damaged?",
            answer:
                "If your order arrives damaged, please take photos of the damage and contact our support team within 48 hours for a resolution.",
        },
        {
            question: "How can I contact customer service?",
            answer:
                "You can reach our customer service via email at support@furniturestore.com or call us at +123-456-7890. Live chat is also available during business hours.",
        },
        {
            question: "What is your refund policy?",
            answer:
                "We offer a full refund within 30 days of purchase if the product is returned in its original condition. Refunds for damaged or defective products are processed after inspection.",
        },
        {
            question: "Do you offer discounts for bulk purchases?",
            answer:
                "Yes, we provide special discounts for bulk orders. Please contact our sales team for a custom quote.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 py-10 px-5">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-10">
                    Frequently Asked Questions
                </h1>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ${
                                openIndex === index ? "ring-2 ring-indigo-500" : ""
                            }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-900 font-semibold text-lg focus:outline-none focus:ring"
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={`w-6 h-6 transform ${
                                        openIndex === index ? "rotate-180" : ""
                                    } transition-transform duration-300`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pt-4 pb-5 text-gray-700">
                                    {/* Add padding at the top for extra space */}
                                    <p className="pt-2">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
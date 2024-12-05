import React, { useState, useEffect } from "react";
import validate from "validate.js";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        _id: "", // Added _id field for identifying products in updates
        name: "",
        price: "",
        sale: "",
        categories: [],
        quantity: "",
        sold: 0,
        description: "",
        image: "",
        code: "",
        tags: [],
    });
    const [errors, setErrors] = useState({});
    const [mode, setMode] = useState("add"); // 'add', 'update', 'delete'
    const [products, setProducts] = useState([]); // List of products from the database

    // Fetch all products from the backend when not in "add" mode
    useEffect(() => {
        if (mode === "update" || mode === "delete") {
            fetch("http://localhost:5000/products") // Replace with your actual API endpoint
                .then((response) => response.json())
                .then((data) => setProducts(data))
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, [mode]);

    const constraints = {
        name: { presence: { allowEmpty: false } },
        price: { presence: { allowEmpty: false }, numericality: { greaterThan: 0 } },
        sale: { numericality: { greaterThanOrEqualTo: 0, allowBlank: true } },
        categories: {
            presence: { allowEmpty: false, message: "must select at least one category." },
        },
        quantity: {
            presence: { allowEmpty: false },
            numericality: { greaterThanOrEqualTo: 0 },
        },
        description: { presence: { allowEmpty: false } },
        image: {
            presence: { allowEmpty: false },
            format: {
                pattern: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp)$/,
                message: "must be a valid image URL ending in .jpg, .png, .gif, etc.",
            },
        },
        code: {
            presence: { allowEmpty: false },
            format: {
                pattern: /^[A-Z0-9]{8}$/,
                message: "must be exactly 8 uppercase letters or digits.",
            },
        },
        tags: {
            presence: { allowEmpty: false, message: "must select at least one tag." },
        },
    };

    const handleModeChange = (e) => {
        const selectedMode = e.target.value;
        setMode(selectedMode);

        // Reset form data when changing mode
        setFormData({
            _id: "",
            name: "",
            price: "",
            sale: "",
            categories: [],
            quantity: "",
            sold: 0,
            description: "",
            image: "",
            code: "",
            tags: [],
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item !== value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleProductSelect = (e) => {
        const selectedProduct = products.find((p) => p._id === e.target.value);

        // Auto-fill form with selected product data for update
        if (selectedProduct) {
            setFormData({
                _id: selectedProduct._id, // Store the product ID for update
                name: selectedProduct.name,
                price: selectedProduct.price,
                sale: selectedProduct.sale || "",
                categories: selectedProduct.categories || [],
                quantity: selectedProduct.quantity,
                sold: selectedProduct.sold || 0,
                description: selectedProduct.description,
                image: selectedProduct.image,
                code: selectedProduct.code,
                tags: selectedProduct.tags || [],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "add" || mode === "update") {
            const validationErrors = validate(formData, constraints);
            if (validationErrors) {
                setErrors(validationErrors);
                return;
            }
        }

        setErrors({});

        if (mode === "add") {
            // Add product to the database
            fetch("http://localhost:5000/createProducts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => console.log("Product added:", data))
                .catch((error) => console.error("Error adding product:", error));
        } else if (mode === "update") {
            // Update product in the database
            fetch(`http://localhost:5000/updateProduct/${formData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => console.log("Product updated:", data))
                .catch((error) => console.error("Error updating product:", error));
        } else if (mode === "delete") {
            // Delete product from the database
            fetch(`http://localhost:5000/deleteProduct/${formData._id}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => console.log("Product deleted:", data))
                .catch((error) => console.error("Error deleting product:", error));
        }
    };

    return (
        <div className="adminForm max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-primary-bg mb-8">Product Management</h2>

            <div className="form-group mb-6">
                <label htmlFor="mode" className="block font-medium mb-2">
                    Action
                </label>
                <select
                    id="mode"
                    value={mode}
                    onChange={handleModeChange}
                    className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                >
                    <option value="add">Add Product</option>
                    <option value="update">Update Product</option>
                    <option value="delete">Delete Product</option>
                </select>
            </div>

            {mode !== "add" && (
                <div className="form-group mb-6">
                    <label htmlFor="productSelect" className="block font-medium mb-2">
                        Select Product
                    </label>
                    <select
                        id="productSelect"
                        onChange={handleProductSelect}
                        className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    >
                        <option value="">Select a product...</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                    {errors.name && <span className="text-red-500">{errors.name[0]}</span>}
                </div>

                {/* Price Field */}
                <div className="form-group mb-6">
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                    {errors.price && <span className="text-red-500">{errors.price[0]}</span>}
                </div>

                {/* Sale Price Field */}
                <div className="form-group mb-6">
                    <input
                        type="number"
                        id="sale"
                        name="sale"
                        value={formData.sale}
                        onChange={handleChange}
                        placeholder="Sale Price (Optional)"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                    {errors.sale && <span className="text-red-500">{errors.sale[0]}</span>}
                </div>

                {/* Categories Field */}
                <div className="form-group mb-6">
                    <label className="block font-medium mb-2">Categories</label>
                    <div className="flex items-center gap-4">
                        {[
                            { label: "Beds", value: "beds" },
                            { label: "Nightstands & Tables", value: "nightstands-and-tables" },
                            { label: "Dressers & Armoires", value: "dressers-and-armoires" },
                            { label: "Sofas & Loveseats", value: "sofas-and-loveseats" },
                            { label: "Coffee Tables", value: "coffee-tables" },
                        ].map((category) => (
                            <div key={category.value}>
                                <input
                                    type="checkbox"
                                    id={category.value}
                                    name="categories"
                                    value={category.value}
                                    checked={formData.categories.includes(category.value)}
                                    onChange={handleChange}
                                />
                                <label htmlFor={category.value} className="ml-2">
                                    {category.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    {errors.categories && (
                        <span className="text-red-500">{errors.categories[0]}</span>
                    )}
                </div>

                {/* Quantity Field */}
                <div className="form-group mb-6">
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                    {errors.quantity && (
                        <span className="text-red-500">{errors.quantity[0]}</span>
                    )}
                </div>

                {/* Description Field */}
                <div className="form-group mb-6">
          <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
          ></textarea>
                    {errors.description && (
                        <span className="text-red-500">{errors.description[0]}</span>
                    )}
                </div>

                {/* Image URL Field */}
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL (e.g., https://example.com/image.jpg)"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                    {errors.image && <span className="text-red-500">{errors.image[0]}</span>}
                </div>

                {/* Tags Field */}
                <div className="form-group mb-6">
                    <label className="block font-medium mb-2">Tags</label>
                    <div className="flex items-center gap-4">
                        {[
                            { label: "Featured", value: "featured" },
                            { label: "Latest", value: "latest" },
                            { label: "Best Seller", value: "best-seller" },
                            { label: "Special Offer", value: "special-offer" },
                            { label: "New Arrival", value: "new-arrival" },
                            { label: "Trending", value: "trending" },
                        ].map((tag) => (
                            <div key={tag.value}>
                                <input
                                    type="checkbox"
                                    id={tag.value}
                                    name="tags"
                                    value={tag.value}
                                    checked={formData.tags.includes(tag.value)}
                                    onChange={handleChange}
                                />
                                <label htmlFor={tag.value} className="ml-2">
                                    {tag.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    {errors.tags && <span className="text-red-500">{errors.tags[0]}</span>}
                </div>


                {/* Code Field */}
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="8-Character SKU Code"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                    {errors.code && <span className="text-red-500">{errors.code[0]}</span>}
                </div>

                {/* Submit Button */}
                <div className="form-group">
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-primary-bg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;


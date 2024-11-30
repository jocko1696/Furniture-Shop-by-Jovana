import React, { useState } from 'react';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        sale: '',
        category: [],
        quantity: '',
        sold: 0,
        description: '',
        image: [],
        code: 'SKU',
        tags: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (type === 'file') {
            setFormData((prev) => ({
                ...prev,
                [name]: Array.from(e.target.files),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data
        console.log(formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-primary-bg mb-8">Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Name Field */}
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Product Name"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                </div>

                {/* Price Field */}
                <div className="form-group mb-6">
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Price"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
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
                </div>

                {/* Category Field */}
                <div className="form-group mb-6">
                    <select
                        id="category"
                        name="category"
                        multiple
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    >
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="beauty">Beauty</option>
                    </select>
                </div>

                {/* Quantity Field */}
                <div className="form-group mb-6">
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="Quantity"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                </div>

                {/* Sold Field */}
                <div className="form-group mb-6">
                    <input
                        type="number"
                        id="sold"
                        name="sold"
                        value={formData.sold}
                        readOnly
                        placeholder="Sold (Default 0)"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none bg-gray-200"
                    />
                </div>

                {/* Description Field */}
                <div className="form-group mb-6">
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Description"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    ></textarea>
                </div>

                {/* Image Field */}
                <div className="form-group mb-6">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        multiple
                        onChange={handleChange}
                        placeholder="Product Images"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
                </div>

                {/* Code Field */}
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        readOnly
                        placeholder="Product Code (SKU)"
                        required
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none bg-gray-200"
                    />
                </div>

                {/* Tags Field */}
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        required
                        placeholder="Tags (separate with commas)"
                        className="mt-2 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-bg"
                    />
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

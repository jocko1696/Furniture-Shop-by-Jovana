import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ title: 'React POST Request Example' })
        };
        // Fetch product details from API using the ID
        fetch(`http://localhost:5000/products/${id}`,requestOptions)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductDetail;

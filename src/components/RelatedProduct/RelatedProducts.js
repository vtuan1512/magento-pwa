import React from 'react';
import useRelatedProducts from '../../peregrine/lib/talons/RelatedProduct/useRelatedProducts';
import Image from "@magento/venia-ui/lib/components/Image";
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
const RelatedProducts = ({ sku }) => {
    const { productData, isLoading, error } = useRelatedProducts(sku);
    if (isLoading) return <p>Loading related products...</p>;
    if (error) return <p>Error loading related products.</p>;
    if (!productData || !productData.related_products) return <p>No related products available.</p>;

    return (
        <div>
            <h2>Related Products</h2>
            <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
                {productData.related_products.map(product => (
                    <li key={product.uid} style={{ margin: '10px', textAlign: 'center' }}>
                        <Image resource={product.small_image.url} alt={product.small_image.label} width="150" height="150" />
                        <Link
                            to={resourceUrl(`/${product.url_key}${product.url_suffix || ''}`)}
                        >
                            <span style={{ fontWeight: "bold" }}>{product.name}</span>
                        </Link>
                        <p>Price: {product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedProducts;

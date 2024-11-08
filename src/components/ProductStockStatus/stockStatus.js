import React from 'react';
import useProductStockStatus from '../../peregrine/lib/talons/ProductStockStatus/useProductStockStatus.js';
const ProductStockstatus = props => {
    const {productSku} = props;
    const {stockStatus} = useProductStockStatus({
        sku: productSku,
    });
    return (
        <>
            {stockStatus && <p>{stockStatus.replace(/_/g,' ')}</p>}
        </>
    );
};
export default ProductStockstatus;

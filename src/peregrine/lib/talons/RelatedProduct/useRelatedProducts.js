import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import GET_PRODUCT_WITH_RELATED_PRODUCTS from './GET_RELATED_PRODUCTS.gql.js';

const useRelatedProducts = (sku) => {
    const { error, loading, data } = useQuery(GET_PRODUCT_WITH_RELATED_PRODUCTS, {
        variables: { sku },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const productData = useMemo(() => {
        if (data && data.products.items[0]) {
            return data.products.items[0];
        }
        return null;
    }, [data]);

    return {
        error,
        isLoading: loading,
        productData
    };
};

export default useRelatedProducts;

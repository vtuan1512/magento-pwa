import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import GET_PRODUCT_STOCK_STATUS from './productStockStatus.gql.js';
const useProductStockStatus = (props) => {
    const { sku } = props;
    const { error, loading, data } = useQuery(GET_PRODUCT_STOCK_STATUS, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            sku: sku
        }
    });
    const stockStatus = useMemo(() => {
        if (data && data.products.items[0]) {
            return data.products.items[0].stock_status;
        }
        return null;
    }, [data]);
    return {
        error,
        isLoading: loading,
        stockStatus
    };
};
export default useProductStockStatus;

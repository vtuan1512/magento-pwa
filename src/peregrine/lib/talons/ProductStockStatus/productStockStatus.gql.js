import gql from "graphql-tag";
const GET_PRODUCT_STOCK_STATUS = gql`
    query getProductStockStatus($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                uid
                stock_status
            }
        }
    }
`;
export default GET_PRODUCT_STOCK_STATUS;

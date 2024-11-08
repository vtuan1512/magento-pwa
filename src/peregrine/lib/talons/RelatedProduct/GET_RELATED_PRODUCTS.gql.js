import gql from "graphql-tag";

const GET_PRODUCT_WITH_RELATED_PRODUCTS = gql`
    query getProductWithRelatedProducts($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                id
                uid
                name
                related_products {
                    id
                    uid
                    name
                    small_image {
                        label
                        url
                    }
                    url_key
                    url_suffix
                    price_range {
                        minimum_price {
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default GET_PRODUCT_WITH_RELATED_PRODUCTS;

import { gql } from '@apollo/client';

export const GET_BANNERS = gql`
    query getBanners($is_active: Int!) {
        banners (is_active: $is_active ) {
            totalCount
            items {
                banners_id
                title
                image
                link
                sort_order
                is_active
                created_at
            }
        }
    }
`;

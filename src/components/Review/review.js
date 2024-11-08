import React from "react";
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { GET_PRODUCTS_REVIEWS } from "./review.gql.js";
import { fullPageLoadingIndicator } from "@magento/venia-ui/lib/components/LoadingIndicator";
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import { useStyle } from "@magento/venia-ui/lib/classify";
import { useHistory } from 'react-router-dom';


const Reviews = props => {
    const productSku = props.productDetails.sku;
    const { loading, error, data } = useQuery(GET_PRODUCTS_REVIEWS, {
        variables: { sku: productSku },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const classes = useStyle(props.classes);
    const history = useHistory(); // Initialize useHistory

    if (!data) {
        if (loading) {
            return fullPageLoadingIndicator;
        }
        if (error) {
            return <ErrorView message={error.message} />;
        }
    }

    const Getreviews = data.products.items[0].reviews.items;

    const relatedItems = Getreviews.map((item, index) => {
        return (
            <div key={index} className={classes.reviewContainer} style={{ padding: "20px"}}>
                <h3 style={{ margin: 0 , color: 'red', fontWeight: "bold"}}>{item.nickname}</h3>
                <h4 style={{ margin: "5px 0", fontWeight: "bold" }}>{item.summary}</h4>
                <p style={{ margin: "5px 0" }}>{item.text}</p>
                <p style={{ fontSize: "0.9em", color: "#666" }}>Review by {item.nickname} {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
        );
    });
    const handleButtonClick = () => {
        history.push('/target-route');
    };

    return (
        <div>
            <h2 className={classes.heading}>
                <FormattedMessage
                    id={'reviews.review'}
                    defaultMessage={'Product Reviews'}
                />
            </h2>
            <div>{relatedItems}</div>
            <button onClick={handleButtonClick} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}>
                Go to Another Page
            </button>
        </div>
    );
};

export default Reviews;

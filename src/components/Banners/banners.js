import React from 'react';
import {useQuery} from '@apollo/client';
import {fullPageLoadingIndicator} from "@magento/venia-ui/lib/components/LoadingIndicator";
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import {Link} from '@magento/venia-drivers';
import Image from "@magento/venia-ui/lib/components/Image";
import {GET_BANNERS} from "./banners.gql";
import sliderClasses from "@magento/pagebuilder/lib/ContentTypes/Slider/slider.module.css";
import SlickSlider from "react-slick";

const Banners = () => {
    const IMAGE_WIDTH = 1900;
    const IMAGE_HEIGHT = 500;

    const {loading, error, data} = useQuery(GET_BANNERS, {
        variables: {is_active: 1},
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    if (!data) {
        if (loading) {
            return fullPageLoadingIndicator;
        }
        if (error) {
            return <ErrorView message={error.message}/>;
        }
    }

    const bannersData = data.banners.totalCount > 0 ? data.banners.items : null;

    var sliderSettings = bannersData ? {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }

        ]
    } : null;

    const items = bannersData ? bannersData.map((item) => {
        return (
            <div>
                <Link to={item.link}>
                    <Image
                        alt={item.title}
                        resource={item.image}
                        height={IMAGE_HEIGHT}
                        width={IMAGE_WIDTH}
                    />
                </Link>
            </div>
        );
    }) : null;

    const content = bannersData ?
        (<div className={sliderClasses.root}>
            <SlickSlider {...sliderSettings}>
                {items}
            </SlickSlider>
        </div>) : null;

    return (
        <div>{content}</div>
    );
}

export default Banners;

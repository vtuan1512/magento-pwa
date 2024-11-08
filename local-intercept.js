/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);

    const ProductDetailsComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );

    const StockStatus = ProductDetailsComponent.addImport(
        "ProductStockStatus from '/src/components/ProductStockStatus'"
    );
    ProductDetailsComponent.insertAfterJSX(
        '<h1 className={classes.productName}>',
        `<${StockStatus} productSku={productDetails.sku} />`
    );

    const RelatedProducts = ProductDetailsComponent.addImport(
        "RelatedProducts from '/src/components/RelatedProduct'"
    );
    ProductDetailsComponent
        .insertAfterJSX('<Form />', `<${RelatedProducts} sku={productDetails.sku} />`)
        .setJSXProps('RelatedProducts', {
            'classes': '{classes}',
            'productDetails': '{productDetails}',
            'options': '{options}',
            'mediaGalleryEntries': '{mediaGalleryEntries}'
        });
    const Productreview = ProductDetailsComponent.addImport(
        "Review from '/src/components/Review/review.js'"
    );
    ProductDetailsComponent
        .insertAfterJSX('<Form />', `<${Productreview} />`)
        .setJSXProps('Review', {
            'classes': '{classes}',
            'productDetails': '{productDetails}',
        });


}

module.exports = localIntercept;


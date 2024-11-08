import React from "react";
import CmsBlockGroup from "@magento/venia-ui/lib/components/CmsBlock";
const CustomBlog = () => {
    const h1style = {
        textAlign: "center",
        margin: "1rem"
    };

    return (
        <div style={{ marginBottom: '300px' }}>
            <h1 style={h1style}>Hello, this is custom Home Page.</h1>
            <CmsBlockGroup identifiers={['test-block']} />
        </div>
    );
};

export default CustomBlog;

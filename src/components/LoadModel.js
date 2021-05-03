import React from "react";
import { isMobile } from "react-device-detect";
import ErrorBoundary from "./ErrorBoundary";
const AB_2 = React.lazy(() => import('./Models/AB_2.js'));
const AB_3 = React.lazy(() => import('./Models/AB_3.js'));
const AB_4 = React.lazy(() => import('./Models/AB_4.js'));
const AB_EXTRA = React.lazy(() => import('./Models/AB_Extra.js'));
const AB_2_MOBILE = React.lazy(() => import('./Models/AB_2_mobile.js'));
const AB_3_MOBILE = React.lazy(() => import('./Models/AB_3_mobile.js'));
const AB_4_MOBILE = React.lazy(() => import('./Models/AB_4_mobile.js'));
const AB_EXTRA_MOBILE = React.lazy(() => import('./Models/AB_Extra_mobile.js'));


const Asset = (props) => {
    if (props.model === "AB_2" ){
        if(isMobile) return <AB_2_MOBILE />;
        return <AB_2 />;
    }
    else if (props.model === "AB_3"){
        if(isMobile) return <AB_3_MOBILE />;
        return <AB_3 />;
    }
    else if (props.model === "AB_4") {
        if(isMobile) return <AB_4_MOBILE />;
        return <AB_4 />;
    }
    else if (props.model === "AB_Extra") {
        if(isMobile) return <AB_EXTRA_MOBILE />;
        return <AB_EXTRA />;
    }
}

export default function LoadModel(props) {
    return (
        <React.Suspense fallback={null}>
            <ErrorBoundary>
                <Asset model={props.model} />
            </ErrorBoundary>
        </React.Suspense>
    );
}
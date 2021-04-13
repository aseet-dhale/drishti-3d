import React from "react";
import ErrorBoundary from "./ErrorBoundary";
const AB_2 = React.lazy(() => import('../assets/AB_2.js'));
const AB_3 = React.lazy(() => import('../assets/AB_3.js'));
const TEST_3 = React.lazy(() => import('../assets/TEST_3.js'));

const Asset = (props) => {
    if (props.model === "AB_2") return <AB_2 />;
    else if (props.model === "AB_3") return <AB_3 />;
    else if (props.model === "TEST_3") return <TEST_3 />;
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
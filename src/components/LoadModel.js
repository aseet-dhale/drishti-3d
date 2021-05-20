import React from "react";
import ErrorBoundary from "./ErrorBoundary";
const BAKED_1 = React.lazy(() => import('./Models/Baked_1.js'));
const BAKED_2 = React.lazy(() => import('./Models/Baked_2.js'));
const BAKED_3 = React.lazy(() => import('./Models/Baked_3.js'));
const BAKED_4 = React.lazy(() => import('./Models/Baked_4.js'));
// const Robot = React.lazy(() => import('./Models/TEST_1.js'));

const Asset = (props) => {
    let out = null;
    if (props.model === "Baked_1") out = <mesh rotation={[Math.PI / 2, 0, 0]} name={props.model}><BAKED_1 /></mesh>;
    else if (props.model === "Baked_2") out = <mesh name={props.model} scale={[0.085, 0.085, 0.085]}><BAKED_2 /></mesh>;
    else if (props.model === "Baked_3") out = <mesh name={props.model} scale={[0.085, 0.085, 0.085]}><BAKED_3 /></mesh>;
    else if (props.model === "Baked_4") out = <mesh name={props.model} scale={[0.085, 0.085, 0.085]}><BAKED_4 /></mesh>;
    return out;
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
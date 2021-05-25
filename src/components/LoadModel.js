import React from "react";
import ErrorBoundary from "./ErrorBoundary";
const ROOM_1 = React.lazy(() => import('./Models/Room_1.js'));
const ROOM_2 = React.lazy(() => import('./Models/Room_2.js'));
const ROOM_3 = React.lazy(() => import('./Models/Room_3.js'));
const ROOM_4 = React.lazy(() => import('./Models/Room_4.js'));
const ROBOT = React.lazy(() => import('./Models/Robot_final.js'));

const Asset = (props) => {
    let out = null;
    if (props.model === "Room_1") out = <mesh scale={[1, 0.65, 1]} name={props.model}><ROOM_1 /></mesh>;
    else if (props.model === "Room_2") out = <mesh scale={[1, 0.65, 1]} name={props.model}><ROOM_2 /></mesh>;
    else if (props.model === "Room_3") out = <mesh scale={[1, 0.65, 1]} name={props.model}><ROOM_3 /></mesh>;
    else if (props.model === "Room_4") out = <mesh scale={[1, 0.65, 1]} name={props.model}><ROOM_4 /></mesh>;
    return out;
}

export default function LoadModel(props) {
    return (
        <React.Suspense fallback={null}>
            <ErrorBoundary>
                <Asset model={props.model} />
            </ErrorBoundary>
            {props.model === "Room_4" ? (
                <group>
                    <mesh position={[-3, 0, 1]}>
                        <ROBOT />
                    </mesh>
                    <mesh position={[ 3, 0, 1]}>
                        <ROBOT />
                    </mesh>
                </group>
            ) : (null)}
        </React.Suspense>
    );
}
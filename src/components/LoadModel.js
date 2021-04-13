import React from "react";
import ErrorBoundary from "./ErrorBoundary";
// import AB_2 from '../assets/AB_2';
// import AB_3 from '../assets/AB_3';
// import Test_3 from '../assets/Test_3';
const AB_2 = React.lazy(() => import('../assets/AB_2.js'));
const AB_3 = React.lazy(() => import('../assets/AB_3.js'));
const TEST_3 = React.lazy(() => import('../assets/TEST_3.js'));

const Asset = (props) => {
    // const { scene } = useThree();

    // if (loadedModel) {
    //     scene.remove(loadedModel);
    // }
    // const gltf = useLoader(GLTFLoader, props.model);
    // const copiedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
    // loadedModel = copiedScene;
    // return copiedScene ? <group><primitive object={copiedScene} /></group> : null;

    if(props.model === "AB_2") return <AB_2 />;
    else if(props.model === "AB_3") return <AB_3 />;
    else if(props.model === "TEST_3") return <TEST_3 />;
}

// const Box = () => {
//     const box = useRef();
//     // console.log(box);
//     useFrame(() => {
//         if (box.current) {
//             box.current.rotation.x += 0.01 * 1;
//             box.current.rotation.y += 0.01 * 2;
//             box.current.rotation.z += 0.01 * 4;
//         }
//     })
//     return (
//         <mesh ref={box}>
//             <boxBufferGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={"red"} />
//         </mesh>
//     );
// }

export default function LoadModel(props) {
    return (
        <React.Suspense fallback={null}>
            <ErrorBoundary>
                <Asset model={props.model} />
            </ErrorBoundary>
        </React.Suspense>
    );
}
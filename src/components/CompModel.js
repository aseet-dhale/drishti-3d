import { Loader, MeshWobbleMaterial, useHelper, useTexture } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import DesktopControls from './DesktopControls';
import LoadModel from './LoadModel';
import MobileControls from './MobileControls';
import Raleway from '../assets/Josefin Sans_Bold.json';
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import Text_Texture from '../assets/text_texture_3.webp';
import { Leva } from 'leva';
// import Roof_Texture from '../assets/roofTexture.png';

const FogAndLights = () => {
    const { scene } = useThree();
    const spref = useRef();
    useHelper(spref, SpotLightHelper);
    const hmref = useRef();
    useHelper(hmref, HemisphereLightHelper);
    const pref = useRef();
    useHelper(pref, PointLightHelper);
    const dref = useRef();
    useHelper(dref, DirectionalLightHelper);
    useEffect(() => {
        scene.fog = new THREE.FogExp2(0x000000, 0.125);
    });

    return (
        <>
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[3, 2, 3]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[-3, 2, 3]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[3, 2, -3]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[-3, 2, -3]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[0, 2, 3]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[0, 2, -3]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[3, 2, 0]}
            />
            <spotLight
                castShadow={false}
                angle={0.78}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[-3, 2, 0]}
            />
            <pointLight
                intensity={15}
                position={[0, 0, 0]}
            />
        </>
    );
}

const FloorPlane = () => {
    return (
        <mesh castShadow={false} receiveShadow={false} position={[0, 0.0001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[17, 17, 32]} />
            <meshPhongMaterial
                attach="material"
                color={0x555555}
                dithering={true}
            />
        </mesh>
    );
}

// const RoofPlane = () => {
//     const [roofTexture] = useTexture([Roof_Texture]);
//     roofTexture.wrapS = THREE.MirroredRepeatWrapping;
//     roofTexture.wrapT = THREE.MirroredRepeatWrapping;
//     roofTexture.repeat.set(3, 3);
//     return (
//         <mesh position={[0, 2.4220, 0]} rotation={[Math.PI / 2, 0, 0]}>
//             <planeGeometry args={[17, 17, 32]} />
//             <meshStandardMaterial
//                 attach="material"
//                 map={roofTexture}
//                 dithering={true}
//             />
//         </mesh>
//     );
// }


const Exhibtion3DText = () => {
    const { scene } = useThree();
    const font = new THREE.FontLoader().parse(Raleway);
    const [texture] = useTexture([Text_Texture]);
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(2, 2);
    const textOptions = {
        font: font,
        size: 0.45,
        height: 0.125 / 2,
    };
    useEffect(() => {
        const text_obj = scene.getObjectByName("Exhb_Text");
        text_obj.geometry.computeBoundingBox();
        text_obj.geometry.center();
    });
    return (
        <>
            <mesh name={"Exhb_Text"} position={[0, 1.25, 0]}>
                <textGeometry attach="geometry" args={['EXHIBITION 2021', textOptions]} />
                <MeshWobbleMaterial
                    attach="material"
                    metalness={0.4}
                    roughness={0.05}
                    map={texture}
                    factor={0.125 / 1.5}
                />
            </mesh>
        </>
    );
}

export default function CompModel(props) {
    return (
        <>
            <Canvas
                color
                style={{
                    background: "#000",
                }}
                linear={true}
                gl={{
                    outputEncoding: THREE.LinearEncoding,
                }}
                shadows={false}
            >
                <FogAndLights />
                <LoadModel model={props.model} />
                <Suspense fallback={null}>
                    <FloorPlane />
                </Suspense>
                <Suspense fallback={null}>
                    <Exhibtion3DText />
                </Suspense>
                {/* <axesHelper args={[5]} /> */}
                {isMobile ? <MobileControls model={props.model} /> : <DesktopControls model={props.model} />}
                {/* <MobileControls model={props.model} /> */}
            </Canvas>
            <Loader />
            <Leva />
        </>
    );
}
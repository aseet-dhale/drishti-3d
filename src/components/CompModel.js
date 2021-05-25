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
import Text_Texture from '../assets/text_texture.webp';
import Drishti_Texture from '../assets/logo drishti.webp';

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
            <ambientLight intensity={0.5} />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[3, 2, 3]}
            />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[-3, 2, 3]}
            />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[3, 2, -3]}
            />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[-3, 2, -3]}
            />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[0, 2, 3]}
            />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[0, 2, -3]}
            />
            <spotLight
                castShadow
                angle={0.81}
                penumbra={0.05}
                distance={10}
                intensity={1.5}
                decay={2}
                position={[3, 2, 0]}
            />
            <spotLight
                castShadow
                angle={0.81}
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
    const [texture] = useTexture([Drishti_Texture]);
    return (
        <group>
            <mesh receiveShadow position={[0, 0.0001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8.2 * 2, 10.2 * 2, 32]} />
                <meshPhongMaterial
                    attach="material"
                    color={0x555555}
                    dithering={true}
                />
            </mesh>
            <mesh castShadow  position={[0, 0.425, 0]}>
                <boxBufferGeometry args={[0.65,0.65,0.65]}/>
                <MeshWobbleMaterial
                    attach="material"
                    map={texture}
                    metalness={0.4}
                    roughness={0.05}
                    factor={0.25}
                />
            </mesh>
        </group>
    );
}

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
                    map={texture}
                    metalness={0.4}
                    roughness={0.05}
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
                    pixelRatio: 1,
                }}
                shadows
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
        </>
    );
}
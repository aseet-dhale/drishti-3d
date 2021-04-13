import { Loader } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import DesktopControls from './DesktopControls';
import LoadModel from './LoadModel';
import MobileControls from './MobileControls';

const FogAndLights = () => {
    const { scene } = useThree();
    useEffect(() => {
        scene.fog = new THREE.FogExp2(0xcccccc, 0.2);
    });
    return (
        <>
            <ambientLight />
            <directionalLight />
        </>
    );
}

export default function CompModel(props) {
    return (
        <>
            <Canvas
                style={{
                    background: "#cccccc",
                }}
            >
                <FogAndLights />
                <LoadModel model={props.model} />
                {isMobile ? <MobileControls model={props.model} /> : <DesktopControls model={props.model} />}
            </Canvas>
            <Loader />
        </>
    );
}
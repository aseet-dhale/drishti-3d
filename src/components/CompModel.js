import { Loader } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';
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
                <MobileControls model={props.model} />
                <axesHelper args={[5]} />
            </Canvas>
            <Loader />
        </>
    );
}
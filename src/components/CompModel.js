import { Loader, Text } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
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
    const meshref = useRef();
    return (
        <>
            <Canvas
                style={{
                    background: "#cccccc",
                }}
            >
                <FogAndLights />
                <LoadModel model={props.model} />


                <mesh
                    position={[0, 0.5, 0]}
                    ref={meshref}
                >
                    <Text
                        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                        outlineOffsetX={'10%'}
                        outlineOffsetY={'10%'}
                        outlineBlur={'30%'}
                        outlineOpacity={0.3}
                        outlineColor="#cccccc"
                    >
                        EXHIBITION 2021
                </Text>
                </mesh>
                {isMobile ? <MobileControls model={props.model} /> : <DesktopControls model={props.model} />}
            </Canvas>
            <Loader />
        </>
    );
}
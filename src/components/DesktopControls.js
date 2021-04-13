import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();


var loadedModel;
export default function DesktopControls(props) {
    const ref = useRef();
    const { camera } = useThree();
    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
            default:
                break;
        }
    };
    const onKeyUp = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        if (ref.current) {
            const landingMain = document.getElementById("landing-main");
            const landingToggle = document.getElementById("landing-toggle");
            ref.current.addEventListener('lock', function () {
                landingMain.style.display = "none";
                landingToggle.style.display = "none";
            })
            ref.current.addEventListener('unlock', function () {
                landingMain.style.display = "flex";
                landingToggle.style.display = "none";
            })
        }
        camera.position.x = camera.position.y = camera.position.z = 0;
    })
    useEffect(() => {
        if (loadedModel && loadedModel !== props.model) {
            camera.position.x = camera.position.y = camera.position.z = 0;
        }
        loadedModel = props.model;
    });
    useFrame(() => {
        if (ref.current) {
            const time = performance.now();
            const velConst = 5.0;
            const dirConst = 10.0;
            if (ref.current.isLocked === true) {
                const delta = (time - prevTime) / 1000;
                velocity.x -= velocity.x * velConst * delta;
                velocity.z -= velocity.z * velConst * delta;

                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize();
                if (moveForward || moveBackward) velocity.z -= direction.z * dirConst * delta;
                if (moveLeft || moveRight) velocity.x -= direction.x * dirConst * delta;
                ref.current.moveRight(- velocity.x * delta);
                ref.current.moveForward(- velocity.z * delta);
            }
            prevTime = time;
        }
    });
    return (
        <>
            <PointerLockControls
                ref={ref}
                maxPolarAngle={Math.PI / 2 + (15 * Math.PI / 180)}
                minPolarAngle={Math.PI / 4 - (15 * Math.PI / 180)}
            />
        </>
    );
}
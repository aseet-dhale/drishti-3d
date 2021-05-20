import { PointerLockControls, useProgress } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let boundingBox = null;
const boundingDelta = 0.5;
const velConst = 5.0;
const dirConst = 10.0;

var loadedModel;
export default function DesktopControls(props) {
    const ref = useRef();
    const { camera, scene } = useThree();
    const { progress } = useProgress();
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
            case 'KeyE':
                moveUp = true;
                break;
            case 'KeyQ':
                moveDown = true;
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
            case 'KeyE':
                moveUp = false;
                break;
            case 'KeyQ':
                moveDown = false;
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
            const desktopEsc = document.getElementById("desktop-esc");
            ref.current.addEventListener('lock', function () {
                landingMain.style.display = "none";
                landingToggle.style.display = "none";
                desktopEsc.style.display = "flex";
            })
            ref.current.addEventListener('unlock', function () {
                landingMain.style.display = "flex";
                landingToggle.style.display = "none";
                desktopEsc.style.display = "none";
            })
        }
        camera.position.x = 0;
        camera.position.y = 1.25;
        camera.position.z = 6.5;
    })
    useEffect(() => {
        if (loadedModel && loadedModel !== props.model) {
            camera.position.x = 0;
            camera.position.y = 1.25;
            camera.position.z = 6.5;
        }
        loadedModel = props.model;
    });
    useEffect(() => {
        if (progress === 100) {
            let req_mes = scene.getObjectByName(props.model);
            if (req_mes) {
                boundingBox = new THREE.Box3().setFromObject(req_mes);
            }
        }
    });
    useFrame(() => {
        if (ref.current) {
            const time = performance.now();
            if (ref.current.isLocked === true) {
                const delta = (time - prevTime) / 1000;
                velocity.x -= velocity.x * velConst * delta;
                velocity.z -= velocity.z * velConst * delta;
                velocity.y -= velocity.y * velConst * delta;
                direction.z = Number(moveForward) - Number(moveBackward);
                direction.y = Number(moveUp) - Number(moveDown)
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize();
                if (moveForward || moveBackward) velocity.z -= direction.z * dirConst * delta;
                if (moveLeft || moveRight) velocity.x -= direction.x * dirConst * delta;
                if (moveUp || moveDown) velocity.y -= direction.y * dirConst * delta;
                if (boundingBox) {
                    let temp_x = ref.current.getObject().position.x + (velocity.x * delta);
                    let temp_y = ref.current.getObject().position.y + (-velocity.y * delta);
                    let temp_z = ref.current.getObject().position.z + (velocity.z * delta);
                    if (boundingBox.min.x + boundingDelta < temp_x && temp_x < boundingBox.max.x - boundingDelta) {
                        ref.current.moveRight(- velocity.x * delta);
                    }
                    if (boundingBox.min.z + boundingDelta < temp_z && temp_z < boundingBox.max.z - boundingDelta) {
                        ref.current.moveForward(- velocity.z * delta);
                    }
                    if (boundingBox.min.y + boundingDelta < temp_y && temp_y < boundingBox.max.y - boundingDelta) {
                        ref.current.getObject().position.y += (- velocity.y * delta);
                    }
                }
                else {
                    ref.current.moveRight(- velocity.x * delta);
                    ref.current.moveForward(- velocity.z * delta);
                    ref.current.getObject().position.y -= velocity.y * delta;
                }

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
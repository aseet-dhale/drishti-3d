import { OrbitControls, useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

var loadedModel;
let but_up_flag = false;
let but_do_flag = false;
let but_up, but_do;
const SPEED = 0.01;

let boundingBox = null;
const boundingDelta = 0.5;

export default function MobileControls(props) {
    const { gl, camera, scene } = useThree();
    const { progress } = useProgress();
    const ref = useRef();
    const mouseUp = (e) => {
        switch (e.path[0].id) {
            case "but_up":
                but_up_flag = false;
                break;
            case "but_do":
                but_do_flag = false;
                break;
            default:
                break;
        }
    }

    const mouseDown = (e) => {
        switch (e.path[0].id) {
            case "but_up":
                but_up_flag = true;
                break;
            case "but_do":
                but_do_flag = true;
                break;
            default:
                break;
        }
    }

    const resetCam = (e) => {
        if(ref.current){
            camera.position.set(0,1.21,6.5);
            ref.current.target.set(0,1.21,0);
            ref.current.update();
        }
    }

    useEffect(() => {
        if (loadedModel && loadedModel !== props.model) {
            camera.position.set(0,1.21,6.5);
            ref.current.target.y = 1.21;
            ref.current.update();
        } else {
            camera.position.set(0,1.21,6.5);
            ref.current.target.y = 1.21;
            ref.current.update();
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

    useEffect(() => {
        but_up = document.getElementById("but_up");
        but_do = document.getElementById("but_do");
        const mob_cam_reset = document.getElementById("mob-cam-reset");
        if (but_do && but_up && mob_cam_reset) {
            but_up.addEventListener("pointerup", mouseUp);
            but_up.addEventListener("pointerdown", mouseDown);
            but_up.addEventListener("pointerleave", mouseUp);
            but_do.addEventListener("pointerup", mouseUp);
            but_do.addEventListener("pointerdown", mouseDown);
            but_do.addEventListener("pointerleave", mouseUp);
            mob_cam_reset.addEventListener("pointerdown",resetCam);
        }
    })
    useFrame(() => {
        if (but_up && but_do && ref && boundingBox) {
            ref.current.target.y = Math.min(ref.current.target.y + SPEED * Number(but_up_flag), boundingBox.max.y - boundingDelta);
            ref.current.target.y = Math.max(ref.current.target.y - SPEED * Number(but_do_flag), boundingBox.min.y + boundingDelta);
        }
    });
    return (
        <>
            <OrbitControls
                ref={ref}
                args={[camera, gl]}
                enableDamping={true}
                dampingFactor={0.05}
                screenSpacePanning={false}
                maxDistance={500}
                enableZoom={false}
                rotateSpeed={0.3}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    );
}
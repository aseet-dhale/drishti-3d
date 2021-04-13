import { OrbitControls, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

var loadedModel;
export default function MobileControls(props) {
    const { gl, camera } = useThree();
    const meshref = useRef();
    useEffect(() => {
        if (loadedModel && loadedModel !== props.model) {
            camera.position.x = 0;
            if (props.model === "TEST_3") { camera.position.y = 0; camera.position.z = 0.5; }
            else { camera.position.y = 1; camera.position.z = 1.5; }
        } else {
            camera.position.x = 0;
            camera.position.y = 1;
            camera.position.z = 1.5;
        }
        loadedModel = props.model;
    });
    return (
        <>
            <OrbitControls
                args={[camera, gl]}
                enableDamping={true}
                dampingFactor={0.05}
                screenSpacePanning={false}
                maxDistance={500}
                enableZoom={false}
                minPolarAngle={Math.PI / 2 - (30 * Math.PI / 180)}
                maxPolarAngle={Math.PI / 2 - (5 * Math.PI / 180)}
            />
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
        </>
    );
}
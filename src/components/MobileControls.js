import { OrbitControls} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

var loadedModel;
export default function MobileControls(props) {
    const { gl, camera } = useThree();
    
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
        </>
    );
}
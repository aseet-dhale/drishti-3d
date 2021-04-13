/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('AB_2.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="AB_3" geometry={nodes.AB_3.geometry} material={materials['main pbr']} />
      </group>
    </group>
  )
}

useGLTF.preload('AB_2.glb')

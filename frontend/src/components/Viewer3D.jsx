import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Grid, Center } from '@react-three/drei'
import * as THREE from 'three'

function Wall({ data }) {
  // data: { center: [x, y], length, thickness, height, angle }
  // Backend: angle 0 = Vertical (along Y in 2D -> along Z in 3D)
  // Backend: angle 90 = Horizontal (along X in 2D -> along X in 3D)
  
  // Mapping 2D (x,y) to 3D (x, 0, y)
  // But usually 2D image y increases downwards. 3D Z increases towards viewer.
  // Let's just map x->x, y->z.
  
  const { center, length, thickness, height, angle } = data
  
  // Rotation: 
  // If we use Box(thickness, height, length) -> Default is along Z.
  // If angle is 0 (Vertical), we want it along Z. So rotation 0.
  // If angle is 90 (Horizontal), we want it along X. Rotation 90.
  // Wait, if I rotate a Z-aligned box by 90 around Y, it becomes X-aligned.
  // So rotation should be angle (in radians) if defined correctly.
  
  // Python: Horizontal (along X) -> angle 90.
  // If I use Box(thickness, height, length) (Z-aligned):
  // Rot 90 -> X-aligned.
  // Matches.
  
  const rotY = (angle * Math.PI) / 180
  
  return (
    <mesh
      position={[center[0], height / 2, center[1]]}
      rotation={[0, rotY, 0]}
    >
      <boxGeometry args={[thickness, height, length]} />
      <meshStandardMaterial color="#cbd5e1" />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(thickness, height, length)]} />
        <lineBasicMaterial color="#64748b" />
      </lineSegments>
    </mesh>
  )
}

function RoomLabel({ data }) {
  return (
    <Text
      position={[data.position[0], 20, data.position[1]]} // Float above floor
      rotation={[-Math.PI / 2, 0, 0]} // Face up
      fontSize={20}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {data.name}
    </Text>
  )
}

export default function Viewer3D({ data }) {
  // Calculate center to auto-position camera
  const center = useMemo(() => {
    if (!data.walls.length) return [0, 0, 0]
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity
    
    data.walls.forEach(w => {
      minX = Math.min(minX, w.center[0])
      maxX = Math.max(maxX, w.center[0])
      minZ = Math.min(minZ, w.center[1])
      maxZ = Math.max(maxZ, w.center[1])
    })
    
    return [(minX + maxX) / 2, 0, (minZ + maxZ) / 2]
  }, [data])

  return (
    <Canvas
      camera={{ position: [center[0], 1000, center[2] + 1000], fov: 45 }}
      shadows
    >
      <color attach="background" args={['#f8fafc']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[100, 200, 100]} intensity={1} castShadow />
      
      <OrbitControls makeDefault target={[center[0], 0, center[2]]} />
      
      <group>
        {data.walls.map((wall, i) => (
          <Wall key={`wall-${i}`} data={wall} />
        ))}
        
        {data.rooms.map((room, i) => (
          <RoomLabel key={`room-${i}`} data={room} />
        ))}

        {/* Floor Plane based on bounds roughly */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[center[0], -1, center[2]]}>
          <planeGeometry args={[2000, 2000]} />
          <meshStandardMaterial color="#f1f5f9" />
          <gridHelper args={[2000, 20]} position={[0, 0.1, 0]} rotation={[Math.PI/2, 0, 0]} />
        </mesh>
      </group>
    </Canvas>
  )
}

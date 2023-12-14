"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame  } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment   } from "@react-three/drei";
import { type Mesh } from "three";
import * as THREE from 'three'; 
type InteractiveCubeProps = {
  position: [number, number, number];
};

type WallProps = {
  position: [number, number, number];
  size: [number, number];
  rotation: [number, number, number];
  color?: string;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
};


const Wall: React.FC<WallProps> = ({
  position,
  size,
  rotation,
  color,
  setHover
}) => {


  return (
    <mesh
      position={position}
      rotation={rotation}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
};

type RoomProps = {
  position: [number, number, number];
  size: [number, number, number];
  color?: string; // Optional color for the room
  hoverColor?: string; // Optional hover color for the room
};

const Room: React.FC<RoomProps> = ({
  position,
  size,
  color = "white", 
  hoverColor = "white" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [width, depth, height] = size;

  const walls: WallProps[] = [
    { position: [position[0], position[1], position[2] - depth / 2], size: [width, height], rotation: [0, 0, 0], hover: isHovered, setHover: setIsHovered, color: isHovered ? hoverColor : color }, // Front wall
    { position: [position[0], position[1], position[2] + depth / 2], size: [width, height], rotation: [0, Math.PI, 0], hover: isHovered, setHover: setIsHovered, color: isHovered ? hoverColor : color }, // Back wall
    { position: [position[0] - width / 2, position[1], position[2]], size: [depth, height], rotation: [0, Math.PI / 2, 0], hover: isHovered, setHover: setIsHovered, color: isHovered ? hoverColor : color }, // Left wall
    { position: [position[0] + width / 2, position[1], position[2]], size: [depth, height], rotation: [0, -Math.PI / 2, 0], hover: isHovered, setHover: setIsHovered, color: isHovered ? hoverColor : color }, // Right wall
    { position: [position[0], position[1] - height / 2, position[2]], size: [width, depth], rotation: [-Math.PI / 2, 0, 0], hover: isHovered, setHover: setIsHovered, color: isHovered ? hoverColor : color } // Floor
  ];

  return (
    <>
      {walls.map((wall, index) => (
        <Wall
          key={index}
          {...wall}
        />
      ))}
    </>
  );
};


const InteractiveCube: React.FC<InteractiveCubeProps> = ({ position }) => {
  const mesh = useRef<Mesh>(null!);
  const [color, setColor] = useState<string>("green");
  useFrame(() => {
    mesh.current.rotation.y += 0.05; 
  });


  const onClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setColor(color === "green" ? "blue" : "green");
  };

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={onClick}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};


// function MeshComponent() {
//   const mesh = useRef<Mesh>(null!);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const { scene } = useGLTF("/models/plateforme10.glb");
//   useFrame(() => {
//     mesh.current.rotation.y += 0.001; //rotation speed
//   });

//   return (
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//     <primitive ref={mesh} object={scene} />
//     // <mesh ref={mesh}>
//     //   <boxGeometry args={[1, 1, 1]} />
//     //   <meshStandardMaterial color={"orange"} />
//     // </mesh>
//   );
// }

export function Map() {

  const rooms: { position: [number, number, number]; size: [number, number, number]; color?: string; hoverColor?: string; }[] = [
    { position: [0, 0, 0], size: [25, 15, 2], color: "white" }, // main office
    { position: [0, 0.5, 0], size: [15, 5, 2], color: "green", hoverColor: "yellow" },
    { position: [-5, 0.5, -5], size: [9, 4, 2], color: "grey", hoverColor: "blue" },
    // Add more rooms with specific positions and sizes as tuples
  ];
  return (
    <div className='flex justify-center items-center h-full'>
      <Canvas className='h-2xl w-2xl rounded-lg' camera={{ position: [10, 9, 15] }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          {/* <MeshComponent /> */}
          <Environment preset="sunset" background />
          {rooms.map((room, index) => (
           <Room
           key={index}
           position={room.position}
           size={room.size}
           color={room.color}
           hoverColor={room.hoverColor} 
         />
        ))}
          <InteractiveCube position={[5, 2, 5]} />
          <InteractiveCube position={[-2, 2, 0]} />
          <InteractiveCube position={[2, 2, 0]} />
          <InteractiveCube position={[5, 2, -5]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';

function CyberNode({ position, color, speed = 1 }) {
 const meshRef = useRef();
 
 useFrame((state) => {
 meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
 meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
 });

 return (
 <Float speed={2} rotationIntensity={1} floatIntensity={2}>
 <mesh ref={meshRef} position={position}>
 <torusKnotGeometry args={[1, 0.3, 128, 16]} />
 <MeshDistortMaterial 
 color={color}
 envMapIntensity={1}
 clearcoat={1}
 clearcoatRoughness={0.1}
 metalness={0.8}
 roughness={0.2}
 distort={0.2}
 speed={2}
 emissive={color}
 emissiveIntensity={0.5}
 />
 </mesh>
 </Float>
 );
}

function Ground() {
 return (
 <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
 <planeGeometry args={[50, 50]} />
 <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.2} />
 <gridHelper args={[50, 50, '#00f0ff', '#1a2035']} position={[0, 0.01, 0]} />
 </mesh>
 );
}

export default function Viewport3D({ showGrid = true }) {
 return (
 <div className="w-full h-full relative grid-bg">
 <Canvas camera={{ position: [0, 2, 8], fov: 60 }} shadows>
 <color attach="background" args={['#050810']} />
 
 <ambientLight intensity={0.2} />
 <directionalLight position={[10, 10, 5]} intensity={1} castShadow color="#00f0ff" />
 <pointLight position={[-10, 5, -10]} intensity={2} color="#ff007f" />
 <pointLight position={[0, -5, 0]} intensity={1} color="#7000ff" />

 <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
 
 <CyberNode position={[-3, 0, 0]} color="#00f0ff" />
 <CyberNode position={[0, 1, 0]} color="#ff007f" speed={1.5} />
 <CyberNode position={[3, 0, 0]} color="#7000ff" speed={0.8} />

 <Text
 position={[0, 4, -2]}
 fontSize={0.8}
 color="#ffffff"
 anchorX="center"
 anchorY="middle"
 outlineWidth={0.02}
 outlineColor="#00f0ff"
 >
 WELCOME TO THE HOLODECK
 </Text>

 {showGrid && <Ground />}
 <ContactShadows position={[0, -1.9, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
 
 <OrbitControls 
 enablePan={true}
 enableZoom={true}
 enableRotate={true}
 autoRotate={true}
 autoRotateSpeed={0.5}
 maxPolarAngle={Math.PI / 2 + 0.1}
 />
 <Environment preset="city" />
 </Canvas>
 
 {/* Overlay UI elements */}
 <div className="absolute top-4 left-4 p-4 glass-panel rounded-lg">
 <h3 className="text-[#F97316] font-extrabold mb-2 flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
 SCENE CONTROLS
 </h3>
 <p className="text-[#111111] text-sm">Drag to rotate • Scroll to zoom</p>
 </div>
 </div>
 );
}

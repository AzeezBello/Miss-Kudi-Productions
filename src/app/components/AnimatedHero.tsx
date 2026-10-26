"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Stars, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';

// Rotating box with subtle animation
function RotatingBox() {
  const ref = useRef<any>(null!);
  // Rotate continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.001;
      ref.current.rotation.y += 0.002;
    }
  });
  return (
    <Box ref={ref} args={[2, 2, 2]} castShadow receiveShadow>
      <meshPhysicalMaterial color="#556b2f" metalness={0.3} roughness={0.2} envMapIntensity={0.8} />
    </Box>
  );
}

export default function AnimatedHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="hero-visual"
      style={{ width: '100%', height: '500px' }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => { gl.setClearColor('#f8f5f0'); }}
      >
        {/* Fog for depth */}
        <fog attach="fog" args={["#f8f5f0", 10, 25]} />
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        {/* Stars background */}
        <Stars radius={100} depth={50} count={5000} saturation={0} fade speed={1} />
        {/* Environment map for realistic reflections */}
        <Environment preset="sunset" background={false} />
        <RotatingBox />
        {/* Auto‑rotate the camera for an immersive feel */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </motion.div>
  );
}

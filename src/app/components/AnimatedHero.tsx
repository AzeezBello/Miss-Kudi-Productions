"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion';

// Simple rotating box
function RotatingBox() {
  return (
    <Box args={[2, 2, 2]}>
      <meshStandardMaterial color="#556b2f" />
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
      style={{ width: '100%', height: '400px' }}
    >
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingBox />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
}

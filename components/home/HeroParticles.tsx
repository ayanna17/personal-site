"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 90;

// Deterministic pseudo-random hash (pure: same input always yields the same
// output), so particle layout can be computed during render without
// violating component purity the way Math.random() would.
function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Field() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (hash(i * 2.1 + 1) - 0.5) * 16;
      positions[i * 3 + 1] = (hash(i * 3.7 + 2) - 0.5) * 9;
      positions[i * 3 + 2] = 0;
      seeds[i * 3] = hash(i * 5.3 + 3) * Math.PI * 2;
      seeds[i * 3 + 1] = 0.15 + hash(i * 7.9 + 4) * 0.25;
      seeds[i * 3 + 2] = 0.4 + hash(i * 1.3 + 5) * 0.6;
    }
    return { positions, seeds };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    lerped.current.x += (mouse.current.x - lerped.current.x) * 0.02;
    lerped.current.y += (mouse.current.y - lerped.current.y) * 0.02;

    const geom = pointsRef.current?.geometry;
    if (!geom) return;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const phase = seeds[i * 3];
      const speed = seeds[i * 3 + 1];
      const amp = seeds[i * 3 + 2];
      posAttr.setX(i, baseX + Math.sin(t * speed + phase) * amp + lerped.current.x * 0.6);
      posAttr.setY(i, baseY + Math.cos(t * speed * 0.8 + phase) * amp * 0.6 + lerped.current.y * 0.4);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#A8A29E"
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroParticles() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 60, position: [0, 0, 10] }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <Field />
    </Canvas>
  );
}

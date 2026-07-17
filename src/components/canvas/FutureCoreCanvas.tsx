"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Points } from "three";

function DataField({ compact }: { compact: boolean }) {
  const pointsRef = useRef<Points>(null);
  const count = compact ? 220 : 520;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const distance = 1.72 + ((index * 17) % 11) * 0.025;
      values[index * 3] = Math.cos(theta) * radius * distance;
      values[index * 3 + 1] = y * distance;
      values[index * 3 + 2] = Math.sin(theta) * radius * distance;
    }

    return values;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d90a2c" size={compact ? 0.018 : 0.014} transparent opacity={0.52} sizeAttenuation />
    </points>
  );
}

function FutureCoreScene({ compact }: { compact: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetX = state.pointer.y * 0.14;
    const targetY = state.pointer.x * 0.18;
    group.rotation.x += (targetX - group.rotation.x) * Math.min(delta * 2.2, 1);
    group.rotation.y += delta * 0.12 + (targetY - group.rotation.y) * Math.min(delta * 1.5, 1);
    group.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.055;
  });

  return (
    <group ref={groupRef} scale={compact ? 0.83 : 1}>
      <mesh>
        <icosahedronGeometry args={[1.02, 3]} />
        <meshStandardMaterial color="#161519" roughness={0.34} metalness={0.28} flatShading />
      </mesh>
      <mesh scale={1.17} rotation={[0.2, 0.32, 0.1]}>
        <icosahedronGeometry args={[1.02, 2]} />
        <meshBasicMaterial color="#d90a2c" wireframe transparent opacity={0.36} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.2, 0.18]}>
        <torusGeometry args={[1.48, 0.012, 8, 160]} />
        <meshBasicMaterial color="#d90a2c" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[0.25, Math.PI / 2.1, 0.42]}>
        <torusGeometry args={[1.66, 0.008, 8, 160]} />
        <meshBasicMaterial color="#161519" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0.8, -0.3, Math.PI / 2]}>
        <torusGeometry args={[1.34, 0.006, 8, 160]} />
        <meshBasicMaterial color="#d90a2c" transparent opacity={0.32} />
      </mesh>
      <DataField compact={compact} />
    </group>
  );
}

export function FutureCoreCanvas({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <Canvas
      className="future-core__canvas"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={1.4} color="#d90a2c" />
      <FutureCoreScene compact={compact} />
    </Canvas>
  );
}

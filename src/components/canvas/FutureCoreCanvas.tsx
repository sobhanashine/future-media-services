"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Points } from "three";

type OrbitProps = {
  radius: number;
  speed: number;
  phase: number;
  tilt: [number, number, number];
  color: string;
  size: number;
};

function DataField({ compact }: { compact: boolean }) {
  const pointsRef = useRef<Points>(null);
  const count = compact ? 180 : 420;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const distance = 2.18 + ((index * 13) % 9) * 0.035;
      values[index * 3] = Math.cos(theta) * radius * distance;
      values[index * 3 + 1] = y * distance;
      values[index * 3 + 2] = Math.sin(theta) * radius * distance;
    }

    return values;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y -= delta * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d90a2c" size={compact ? 0.019 : 0.014} transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

function SignalOrbit({ radius, speed, phase, tilt, color, size }: OrbitProps) {
  const nodeRef = useRef<Group>(null);

  useFrame((state) => {
    const node = nodeRef.current;
    if (!node) return;

    const angle = state.clock.elapsedTime * speed + phase;
    node.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    node.rotation.y = -angle + Math.PI / 2;
    node.rotation.z = Math.sin(state.clock.elapsedTime * 1.4 + phase) * 0.16;
  });

  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 180]} />
        <meshBasicMaterial color={color} transparent opacity={color === "#d90a2c" ? 0.62 : 0.24} />
      </mesh>
      <group ref={nodeRef}>
        <mesh scale={[size * 1.65, size, size * 0.75]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#fbfbfa" roughness={0.26} metalness={0.18} />
        </mesh>
        <mesh position={[size * 0.92, size * 0.12, 0]} scale={size * 0.32}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.48} />
        </mesh>
        <mesh position={[-size * 0.92, 0, 0]} scale={size * 0.15}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#161519" />
        </mesh>
      </group>
    </group>
  );
}

function SignalCore() {
  const coreRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const core = coreRef.current;
    if (!core) return;

    core.rotation.x += delta * 0.08;
    core.rotation.y -= delta * 0.14;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.025;
    core.scale.setScalar(pulse);
  });

  return (
    <group ref={coreRef}>
      <mesh scale={0.62} rotation={[0.18, 0.3, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#d90a2c" emissive="#d90a2c" emissiveIntensity={0.24} roughness={0.32} metalness={0.34} />
      </mesh>
      <mesh scale={0.95} rotation={[0.2, -0.15, 0.1]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#161519" wireframe transparent opacity={0.88} />
      </mesh>
      <mesh scale={1.08}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.08} roughness={0.12} metalness={0.52} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.12, 0]}>
        <torusGeometry args={[0.86, 0.025, 10, 120]} />
        <meshBasicMaterial color="#d90a2c" />
      </mesh>
      <mesh rotation={[0.3, Math.PI / 2, 0.48]}>
        <torusGeometry args={[0.78, 0.012, 8, 120]} />
        <meshBasicMaterial color="#161519" transparent opacity={0.58} />
      </mesh>
    </group>
  );
}

function FutureCoreScene({ compact }: { compact: boolean }) {
  const rigRef = useRef<Group>(null);
  const systemRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const rig = rigRef.current;
    const system = systemRef.current;
    if (!rig || !system) return;

    const targetX = state.pointer.y * 0.11;
    const targetZ = -state.pointer.x * 0.08;
    rig.rotation.x += (targetX - rig.rotation.x) * Math.min(delta * 2.4, 1);
    rig.rotation.z += (targetZ - rig.rotation.z) * Math.min(delta * 2.4, 1);
    system.rotation.y += delta * 0.055;
    system.position.y = Math.sin(state.clock.elapsedTime * 0.62) * 0.06;
  });

  return (
    <group ref={rigRef} scale={compact ? 0.78 : 0.9}>
      <group ref={systemRef}>
        <SignalCore />
        <SignalOrbit radius={1.52} speed={0.54} phase={0.2} tilt={[0.34, 0.05, 0.28]} color="#d90a2c" size={0.22} />
        <SignalOrbit radius={1.84} speed={-0.34} phase={2.1} tilt={[-0.42, 0.18, -0.38]} color="#161519" size={0.18} />
        <SignalOrbit radius={2.12} speed={0.24} phase={4.2} tilt={[0.68, -0.14, 0.62]} color="#d90a2c" size={0.15} />
        <DataField compact={compact} />
      </group>
    </group>
  );
}

export function FutureCoreCanvas({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <Canvas
      className="future-core__canvas"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.8], fov: 43 }}
      gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.75} />
      <directionalLight position={[3, 4, 5]} intensity={2.35} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={1.65} color="#d90a2c" />
      <pointLight position={[0, 0, 2.6]} intensity={1.8} color="#ffffff" />
      <FutureCoreScene compact={compact} />
    </Canvas>
  );
}

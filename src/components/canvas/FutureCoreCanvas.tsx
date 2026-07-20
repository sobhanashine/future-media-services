"use client";

import { Center, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const WINGS_MODEL_PATH = "/3d/hiswings.glb";

function WingsModel({ compact }: { compact: boolean }) {
  const { scene } = useGLTF(WINGS_MODEL_PATH);

  return (
    <PresentationControls
      cursor
      damping={0.32}
      polar={[-0.28, 0.28]}
      azimuth={[-0.72, 0.72]}
      speed={0.8}
    >
      <group position={[0, 0, 0]} scale={compact ? 0.74 : 0.94}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </PresentationControls>
  );
}

function FutureCoreScene({ compact }: { compact: boolean }) {
  return (
    <Suspense fallback={null}>
      <WingsModel compact={compact} />
    </Suspense>
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
      <ambientLight intensity={1.45} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={1.35} color="#d90a2c" />
      <pointLight position={[0, 0.7, 2.6]} intensity={1.45} color="#ffffff" />
      <FutureCoreScene compact={compact} />
    </Canvas>
  );
}

useGLTF.preload(WINGS_MODEL_PATH);

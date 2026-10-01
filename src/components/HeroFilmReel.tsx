import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Palette = {
  metal: string;
  metalDark: string;
  accent: string;
};

function ReelGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 2.15, 0, Math.PI * 2, false);

    const center = new THREE.Path();
    center.absarc(0, 0, 0.34, 0, Math.PI * 2, true);
    shape.holes.push(center);

    for (let index = 0; index < 5; index += 1) {
      const angle = index * (Math.PI * 2 / 5) + Math.PI / 2;
      const hole = new THREE.Path();
      hole.absarc(Math.cos(angle) * 1.17, Math.sin(angle) * 1.17, 0.57, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.07,
      curveSegments: 64,
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

function FilmReel({ palette, reducedMotion }: { palette: Palette; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const reelGeometry = ReelGeometry();

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;

    const delta = Math.min(rawDelta, 0.05);
    const targetX = -0.1 - state.pointer.y * 0.13;
    const targetY = 0.22 + state.pointer.x * 0.2;
    const ease = 1 - Math.exp(-3.6 * delta);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, ease);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, ease);
    if (!reducedMotion) {
      group.rotation.z += delta * 0.11;
      group.position.y = Math.sin(state.clock.elapsedTime * 0.58) * 0.11;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.1, 0.22, -0.18]} scale={0.92}>
      <mesh geometry={reelGeometry} castShadow>
        <meshPhysicalMaterial
          color={palette.metal}
          metalness={1}
          roughness={0.16}
          clearcoat={0.65}
          clearcoatRoughness={0.12}
          envMapIntensity={1.8}
        />
      </mesh>

      <mesh position={[0, 0, 0.24]} rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.43, 0.43, 0.3, 48]} />
        <meshPhysicalMaterial color={palette.metalDark} metalness={1} roughness={0.2} envMapIntensity={2} />
      </mesh>
      <mesh position={[0, 0, 0.41]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.26, 0.045, 16, 64]} />
        <meshStandardMaterial color={palette.accent} metalness={0.75} roughness={0.2} emissive={palette.accent} emissiveIntensity={0.18} />
      </mesh>

      <mesh position={[-1.73, -1.32, -0.18]} rotation={[Math.PI / 2, 0, -0.34]}>
        <torusGeometry args={[0.14, 0.035, 10, 36]} />
        <meshStandardMaterial color={palette.metalDark} metalness={0.7} roughness={0.28} />
      </mesh>
    </group>
  );
}

export function HeroFilmReel() {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setPalette({
      metal: styles.getPropertyValue("--reel-metal").trim(),
      metalDark: styles.getPropertyValue("--reel-metal-dark").trim(),
      accent: styles.getPropertyValue("--reel-accent").trim(),
    });
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!palette) return <div className="hero-reel-canvas" aria-hidden="true" />;

  return (
    <div className="hero-reel" aria-hidden="true">
      <div className="hero-reel-orbit" />
      <div className="hero-reel-canvas">
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          shadows
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[-4, 5, 6]} intensity={3.1} />
          <pointLight position={[4, -2, 4]} intensity={14} color={palette.accent} distance={12} />
          <Environment resolution={128}>
            <Lightformer intensity={3} position={[0, 4, 4]} scale={[7, 2, 1]} />
            <Lightformer intensity={2} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 1, 1]} />
            <Lightformer intensity={1.5} color={palette.accent} position={[4, -1, 1]} rotation-y={-Math.PI / 2} scale={[4, 1, 1]} />
          </Environment>
          <FilmReel palette={palette} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
      <span className="hero-reel-label">Play / Create / Repeat</span>
    </div>
  );
}
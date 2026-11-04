import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GOLD = '#D4AF37';
const KNOT_COUNT = 3000; // mobile-safe baseline per the Three.js guideline
const DUST_COUNT = 500;

/** Soft round sprite drawn at runtime — no image files anywhere on the site. */
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 3000 gold particles sampled along a torus knot, plus a faint wire skeleton. */
function GoldKnot({ reduced, interactive }) {
  const group = useRef();
  const spin = useRef(0);
  const { viewport } = useThree();

  const { positions, texture } = useMemo(() => {
    const source = new THREE.TorusKnotGeometry(1.5, 0.42, 300, 24);
    const src = source.attributes.position.array;
    const vertexCount = src.length / 3;
    const out = new Float32Array(KNOT_COUNT * 3);
    for (let i = 0; i < KNOT_COUNT; i += 1) {
      const v = Math.floor(Math.random() * vertexCount) * 3;
      const jitter = 0.06;
      out[i * 3] = src[v] + (Math.random() - 0.5) * jitter;
      out[i * 3 + 1] = src[v + 1] + (Math.random() - 0.5) * jitter;
      out[i * 3 + 2] = src[v + 2] + (Math.random() - 0.5) * jitter;
    }
    source.dispose();
    return { positions: out, texture: makeDotTexture() };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (!reduced) spin.current += delta * 0.12;
    // Pointer parallax: ease the whole knot toward the cursor.
    // Touch devices: a tap updates the pointer, which would yank the knot
    // toward the finger mid-scroll — so only follow a real mouse.
    const follow = interactive && !reduced;
    const targetX = follow ? state.pointer.y * -0.25 : 0;
    const targetY = spin.current + (follow ? state.pointer.x * 0.35 : 0);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.35 + targetX, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06);
  });

  // Shrink on narrow viewports so the knot never crowds the headline.
  const scale = viewport.width < 6 ? 0.72 : 1;

  return (
    <group ref={group} scale={scale} rotation={[0.35, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={KNOT_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          color={GOLD}
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Background-tier segment budget: low poly wire for structure only */}
      <mesh>
        <torusKnotGeometry args={[1.5, 0.42, 128, 10]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

/** Slow-drifting ambient dust to give the black depth. */
function Dust({ reduced }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const out = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT * 3; i += 1) out[i] = (Math.random() - 0.5) * 14;
    return out;
  }, []);

  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={DUST_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.02} sizeAttenuation transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

/**
 * Hero WebGL backdrop. `active` pauses the render loop when the hero is
 * off-screen; `reduced` freezes motion for prefers-reduced-motion users
 * (one static frame is still drawn so the composition holds).
 */
export default function HeroScene({ active = true, reduced = false, interactive = true }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: interactive ? 'auto' : 'none' }}
      aria-hidden="true"
    >
      <GoldKnot reduced={reduced} interactive={interactive} />
      <Dust reduced={reduced} />
    </Canvas>
  );
}

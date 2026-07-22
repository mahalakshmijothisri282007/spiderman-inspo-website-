import { MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { ROOM_D, ROOM_H, ROOM_W } from './studioConstants'

export type RedesignedStudioTextures = {
  texMjPrimary: THREE.CanvasTexture
  texCodeEditor: THREE.CanvasTexture
  texCreagenzTv: THREE.CanvasTexture
  texShelfHud: THREE.CanvasTexture
  texShelfHudB: THREE.CanvasTexture
  texGalleryA: THREE.CanvasTexture
  texGalleryB: THREE.CanvasTexture
  texAiTools: THREE.CanvasTexture
  wireBoard: THREE.CanvasTexture
  studioBoard: THREE.CanvasTexture
}

function RiggedSpot({
  position,
  target,
  angle,
  penumbra,
  intensity,
  distance,
  color,
}: {
  position: [number, number, number]
  target: [number, number, number]
  angle: number
  penumbra: number
  intensity: number
  distance: number
  color: string
}) {
  const ref = useRef<THREE.SpotLight>(null)
  useEffect(() => {
    const L = ref.current
    if (!L) return
    L.target.position.set(...target)
    const p = L.parent
    if (p && !p.children.includes(L.target)) p.add(L.target)
  }, [target])
  return (
    <spotLight
      ref={ref}
      castShadow
      position={position}
      angle={angle}
      penumbra={penumbra}
      intensity={intensity}
      distance={distance}
      color={color}
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0002}
      shadow-normalBias={0.02}
    />
  )
}

function StudioGlassDoor() {
  const frameMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#475569',
        roughness: 0.38,
        metalness: 0.62,
        envMapIntensity: 0.88,
      }),
    [],
  )
  const fw = 2.12
  const fh = 2.82
  const ft = 0.062
  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 1.38 + fh / 2 + ft / 2, 0]} castShadow material={frameMetal}>
        <boxGeometry args={[fw + ft * 2, ft, ft]} />
      </mesh>
      <mesh position={[0, 1.38 - fh / 2 - ft / 2, 0]} castShadow material={frameMetal}>
        <boxGeometry args={[fw + ft * 2, ft, ft]} />
      </mesh>
      <mesh position={[fw / 2 + ft / 2, 1.38, 0]} castShadow material={frameMetal}>
        <boxGeometry args={[ft, fh + ft * 2, ft]} />
      </mesh>
      <mesh position={[-fw / 2 - ft / 2, 1.38, 0]} castShadow material={frameMetal}>
        <boxGeometry args={[ft, fh + ft * 2, ft]} />
      </mesh>
      <mesh position={[0, 1.38, 0]}>
        <planeGeometry args={[fw, fh]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={1}
          thickness={0.38}
          roughness={0.045}
          chromaticAberration={0.018}
          anisotropicBlur={0.05}
          distortion={0.035}
          distortionScale={0.16}
          temporalDistortion={0}
          color="#e8f0fc"
        />
      </mesh>
      <mesh position={[0.58, 1.06, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow material={frameMetal}>
        <cylinderGeometry args={[0.02, 0.02, 0.24, 14]} />
      </mesh>
    </group>
  )
}

function AccentChair({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const fabric = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a2332',
        roughness: 0.82,
        metalness: 0.04,
        envMapIntensity: 0.42,
      }),
    [],
  )
  const leg = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c4aa7a',
        roughness: 0.42,
        metalness: 0.55,
        envMapIntensity: 0.92,
      }),
    [],
  )
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow material={fabric}>
        <boxGeometry args={[0.48, 0.12, 0.46]} />
      </mesh>
      <mesh position={[0, 0.58, -0.22]} castShadow receiveShadow material={fabric}>
        <boxGeometry args={[0.46, 0.58, 0.065]} />
      </mesh>
      {[0.16, -0.16].map((x) => (
        <mesh key={x} position={[x, 0.06, 0.12]} castShadow material={leg}>
          <cylinderGeometry args={[0.028, 0.034, 0.12, 8]} />
        </mesh>
      ))}
    </group>
  )
}

function LandscapeScreen({
  tex,
  position,
  screenW,
  screenH,
  rotation = [0, 0, 0],
  emissive = '#a5b4fc',
  emissiveIntensity = 0.42,
}: {
  tex: THREE.CanvasTexture
  position: [number, number, number]
  screenW: number
  screenH: number
  rotation?: [number, number, number]
  emissive?: string
  emissiveIntensity?: number
}) {
  const bezel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0b0e14',
        roughness: 0.55,
        metalness: 0.45,
        envMapIntensity: 0.72,
      }),
    [],
  )
  const bw = screenW + 0.065
  const bh = screenH + 0.065
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow material={bezel}>
        <boxGeometry args={[bw, bh, 0.028]} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshStandardMaterial
          map={tex}
          emissiveMap={tex}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          toneMapped={false}
          roughness={0.32}
          metalness={0.08}
        />
      </mesh>
    </group>
  )
}

function WorkBay({
  texMain,
  texSide,
  texHud,
  position,
  rotation,
}: {
  texMain: THREE.CanvasTexture
  texSide: THREE.CanvasTexture
  texHud: THREE.CanvasTexture
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const top = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2c3240',
        roughness: 0.48,
        metalness: 0.18,
        envMapIntensity: 0.55,
      }),
    [],
  )
  const base = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#151922',
        roughness: 0.62,
        metalness: 0.12,
        envMapIntensity: 0.38,
      }),
    [],
  )
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow material={top}>
        <boxGeometry args={[2.45, 0.055, 1.18]} />
      </mesh>
      <mesh position={[0, 0.36, 0]} castShadow material={base}>
        <boxGeometry args={[2.12, 0.72, 0.88]} />
      </mesh>
      <LandscapeScreen tex={texMain} position={[0.18, 1.18, -0.38]} screenW={1.35} screenH={0.78} />
      <LandscapeScreen
        tex={texSide}
        position={[-0.95, 0.98, -0.22]}
        screenW={0.62}
        screenH={0.92}
        rotation={[0, 0.22, 0]}
        emissive="#86efac"
        emissiveIntensity={0.38}
      />
      <mesh position={[1.02, 0.79, 0.22]} rotation={[0, -0.45, 0]} castShadow>
        <boxGeometry args={[0.52, 0.018, 0.35]} />
        <meshStandardMaterial color="#1a1f28" roughness={0.55} metalness={0.25} />
      </mesh>
      <mesh position={[1.02, 0.84, 0.22]} rotation={[0, -0.45, 0]}>
        <planeGeometry args={[0.46, 0.28]} />
        <meshStandardMaterial map={texHud} roughness={0.35} emissiveMap={texHud} emissive="#38bdf8" emissiveIntensity={0.12} toneMapped={false} />
      </mesh>
    </group>
  )
}

/** Dark loft / gallery lab — new layout vs previous bright modular booth */
export function RedesignedStudioInterior(t: RedesignedStudioTextures) {
  const wall = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#2a3140',
        roughness: 0.58,
        metalness: 0.06,
        envMapIntensity: 0.58,
        clearcoat: 0.04,
        clearcoatRoughness: 0.72,
      }),
    [],
  )
  const trim = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d4a63',
        roughness: 0.45,
        metalness: 0.22,
        envMapIntensity: 0.68,
      }),
    [],
  )
  const concrete = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#333842',
        roughness: 0.42,
        metalness: 0.12,
        envMapIntensity: 0.72,
        clearcoat: 0.18,
        clearcoatRoughness: 0.55,
      }),
    [],
  )
  const oak = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6b5344',
        roughness: 0.62,
        metalness: 0.02,
        envMapIntensity: 0.48,
      }),
    [],
  )
  const beam = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1d24',
        roughness: 0.72,
        metalness: 0.25,
        envMapIntensity: 0.35,
      }),
    [],
  )

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={concrete}>
        <planeGeometry args={[ROOM_W + 28, ROOM_D + 36]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -0.85]} receiveShadow>
        <circleGeometry args={[3.35, 48]} />
        <meshStandardMaterial color="#252a33" roughness={0.88} metalness={0} envMapIntensity={0.32} />
      </mesh>

      {/* Shell */}
      <mesh position={[0, ROOM_H / 2, -ROOM_D / 2]} receiveShadow castShadow material={wall}>
        <boxGeometry args={[ROOM_W, ROOM_H, 0.16]} />
      </mesh>
      <mesh position={[-ROOM_W / 2, ROOM_H / 2, 0]} receiveShadow castShadow material={wall}>
        <boxGeometry args={[0.16, ROOM_H, ROOM_D]} />
      </mesh>
      <mesh position={[0, ROOM_H / 2, ROOM_D / 2]} receiveShadow castShadow material={wall}>
        <boxGeometry args={[ROOM_W * 0.62, ROOM_H, 0.14]} />
      </mesh>
      <group>
        <mesh position={[ROOM_W / 2 - 0.08, ROOM_H / 2, -4.2]} receiveShadow castShadow material={wall}>
          <boxGeometry args={[0.16, ROOM_H, 6.5]} />
        </mesh>
        <mesh position={[ROOM_W / 2 - 0.08, ROOM_H / 2, 5.2]} receiveShadow castShadow material={wall}>
          <boxGeometry args={[0.16, ROOM_H, 4.2]} />
        </mesh>
        <mesh position={[ROOM_W / 2 - 0.08, ROOM_H - 0.55, 4]} receiveShadow castShadow material={wall}>
          <boxGeometry args={[0.16, 1.15, 4.65]} />
        </mesh>
      </group>

      {/* Wood slat accent — entire left */}
      <group position={[-ROOM_W / 2 + 0.11, ROOM_H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        {Array.from({ length: 22 }, (_, i) => (
          <mesh key={i} position={[-3.95 + i * 0.35, -0.12, 0]} castShadow receiveShadow material={oak}>
            <boxGeometry args={[0.14, ROOM_H - 1.85, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* Trim rail */}
      <mesh position={[0, 0.18, -ROOM_D / 2 + 0.1]} castShadow receiveShadow material={trim}>
        <boxGeometry args={[ROOM_W - 1.85, 0.08, 0.065]} />
      </mesh>

      {/* Exposed beams + linear slots */}
      {[-ROOM_D / 2 + 0.62, ROOM_D / 2 - 0.52, -0.15, 3.95].map((z, i) => (
        <mesh key={`bx-${i}`} position={[0, ROOM_H - 0.2, z]} castShadow receiveShadow material={beam}>
          <boxGeometry args={[ROOM_W - 0.42, 0.22, 0.58]} />
        </mesh>
      ))}
      {[0, -5.95, -2.92, -0.8, 1.92, 5.92].map((ox, i) => (
        <mesh key={`bz-${i}`} position={[ox, ROOM_H - 0.38, -0.82]} castShadow receiveShadow material={beam}>
          <boxGeometry args={[0.38, 0.16, ROOM_D - 1.92]} />
        </mesh>
      ))}
      {/* Warm linear accents — crisscross under beams */}
      {[-ROOM_D / 2 + 1.92, ROOM_D / 2 - 1.92, 2.92].map((pz, i) => (
        <mesh key={`led-${i}`} position={[0, ROOM_H - 0.88, pz]} castShadow rotation={[Math.PI / 52, Math.PI / 16, Math.PI / 20]}>
          <boxGeometry args={[ROOM_W - 5.6, 0.052, 0.052]} />
          <meshStandardMaterial color="#fde68a" emissive="#fcd34d" emissiveIntensity={2.25} toneMapped={false} />
        </mesh>
      ))}

      {/* Back wall ribbon + hero screen */}
      <mesh position={[0, ROOM_H * 0.16, -ROOM_D / 2 + 0.12]} castShadow receiveShadow>
        <boxGeometry args={[ROOM_W - 4.52, 0.065, 0.08]} />
        <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={2.85} toneMapped={false} />
      </mesh>
      <group position={[0.35, ROOM_H * 0.48, -ROOM_D / 2 + 0.14]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[7.55, 2.85, 0.065]} />
          <meshStandardMaterial color="#090b11" roughness={0.35} metalness={0.55} envMapIntensity={0.88} />
        </mesh>
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[7.12, 2.48]} />
          <meshStandardMaterial map={t.texCreagenzTv} emissiveMap={t.texCreagenzTv} emissive="#ffffff" emissiveIntensity={0.72} toneMapped={false} roughness={0.22} metalness={0.08} />
        </mesh>
      </group>

      {/* Side canvases */}
      {[4.92, -4.92].map((sx, idx) => (
        <mesh key={`cv-${idx}`} position={[sx, ROOM_H * 0.44, -ROOM_D / 2 + 0.15]} rotation={[idx === 1 ? Math.PI / 26 : -Math.PI / 28, Math.PI / 5, idx === 0 ? -Math.PI / 35 : Math.PI / 35]} castShadow>
          <planeGeometry args={[1.65, 2.08]} />
          <meshStandardMaterial map={idx === 0 ? t.texGalleryA : t.texGalleryB} roughness={0.55} envMapIntensity={0.45} metalness={0.02} />
        </mesh>
      ))}

      {/* Vertical HUD column */}
      <group position={[6.92, ROOM_H / 2, -ROOM_D / 2 + 0.16]} rotation={[0, -0.12, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.065, ROOM_H - 3.92, 0.94]} />
          <meshStandardMaterial color="#1e293b" roughness={0.52} metalness={0.45} envMapIntensity={0.65} />
        </mesh>
        <mesh position={[-0.042, ROOM_H / 8 + 0.18, -0.01]}>
          <planeGeometry args={[0.74, ROOM_H - 4.92]} />
          <meshStandardMaterial map={t.texAiTools} emissiveMap={t.texAiTools} emissive="#86efac" emissiveIntensity={0.45} toneMapped={false} roughness={0.32} metalness={0.12} />
        </mesh>
      </group>

      {/* mj mark — luminous line on planks */}
      <group position={[-ROOM_W / 2 + 0.18, ROOM_H * 0.62, -2.92]} rotation={[0, Math.PI / 2, 0]}>
        <Text fontSize={0.42} color="#34d399" anchorX="center" anchorY="middle" letterSpacing={0.12}>
          mj
        </Text>
        <mesh position={[0, -0.35, -0.01]}>
          <planeGeometry args={[1.92, 0.028]} />
          <meshBasicMaterial transparent opacity={0.85} color="#34d399" toneMapped={false} />
        </mesh>
      </group>

      {/* Planning surface */}
      <mesh position={[-ROOM_W / 2 + 0.11, ROOM_H * 0.52, 3.92]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.92, 1.92]} />
        <meshStandardMaterial map={t.studioBoard} roughness={0.62} metalness={0} envMapIntensity={0.38} />
      </mesh>

      {/* Standing wire board */}
      <group position={[4.92, 0, 3.92]} rotation={[0, -Math.PI / 4.2, 0]}>
        <mesh position={[0, 0.55, -0.12]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.05, 1.82, 10]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.42} metalness={0.55} envMapIntensity={0.92} />
        </mesh>
        <mesh position={[-0.38, 0.55, 0.58]} rotation={[0.12, Math.PI / 5, Math.PI / 18]} castShadow receiveShadow>
          <cylinderGeometry args={[0.036, 0.048, 1.92, 10]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.42} metalness={0.55} envMapIntensity={0.92} />
        </mesh>
        <mesh position={[0.02, 1.92, -0.32]} rotation={[-Math.PI / 18, Math.PI / 6, Math.PI / 22]}>
          <planeGeometry args={[2.25, 1.92]} />
          <meshStandardMaterial map={t.wireBoard} roughness={0.68} metalness={0} envMapIntensity={0.35} />
        </mesh>
      </group>

      {/* Central collaboration table */}
      <group position={[0, 0, -1.08]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow position={[0, 0.72, 0]}>
          <cylinderGeometry args={[1.92, 1.98, 0.068, 40]} />
          <meshPhysicalMaterial color="#4a453e" roughness={0.35} metalness={0.12} envMapIntensity={0.55} clearcoat={0.42} clearcoatRoughness={0.28} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.32, 0.38, 0.72, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.42} metalness={0.65} envMapIntensity={0.85} />
        </mesh>
        {[
          [2.62, -0.12, -Math.PI / 14],
          [-2.45, -0.05, (-Math.PI * 17) / 18],
          [2.18, -1.92, Math.PI / 8],
          [-2.12, -1.85, (-Math.PI * 9) / 16],
          [0.92, 2.32, (-Math.PI * 10) / 11],
          [-1.06, 2.18, (-Math.PI * 7) / 9],
        ].map(([x, z, r], i) => (
          <AccentChair key={`ch-${i}`} position={[x, 0, z]} rotation={[0, r, 0]} />
        ))}
      </group>

      <WorkBay
        texMain={t.texMjPrimary}
        texSide={t.texCodeEditor}
        texHud={t.texShelfHudB}
        position={[-6.92, 0, -5.88]}
        rotation={[0, 0.32, 0]}
      />

      <group position={[5.92, 0, 4.15]} rotation={[0, -1.92, 0]}>
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.92, 0.065, 0.52]} />
          <meshPhysicalMaterial color="#3f4554" roughness={0.45} metalness={0.15} envMapIntensity={0.52} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.065, 0.45, 0.38]} />
          <meshStandardMaterial color="#1e293b" roughness={0.55} metalness={0.35} envMapIntensity={0.62} />
        </mesh>
        <LandscapeScreen tex={t.texShelfHud} position={[0, 1.72, -0.18]} screenW={0.98} screenH={1.28} rotation={[0, Math.PI / 18, Math.PI / 90]} />
      </group>

      {/* Door */}
      <group position={[ROOM_W / 2 - 0.02, 0, 3.95]}>
        <StudioGlassDoor />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.05, 0.018, 0]} receiveShadow>
          <planeGeometry args={[4.42, 4.92]} />
          <shadowMaterial opacity={0.32} />
        </mesh>
      </group>

      {/* Plants */}
      {[
        [6.92, -5.32],
        [-6.92, 5.12],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.32, 0.38, 0.72, 12]} />
            <meshStandardMaterial color="#2d2620" roughness={0.88} metalness={0.02} envMapIntensity={0.42} />
          </mesh>
          <mesh position={[0, ROOM_H / 4 + 1.92, 0]} castShadow>
            <coneGeometry args={[1.55, ROOM_H / 6 + 0.85, 16]} />
            <meshStandardMaterial color="#14532d" roughness={0.74} metalness={0} envMapIntensity={0.32} />
          </mesh>
        </group>
      ))}

      <RiggedSpot position={[0, ROOM_H - 0.45, ROOM_D / 6]} target={[0, 0.92, -0.95]} angle={0.48} penumbra={0.82} intensity={118} distance={42} color="#fff4e8" />
      <RiggedSpot position={[2.92, ROOM_H - 0.62, ROOM_D]} target={[7.92, ROOM_H / 10, ROOM_D]} angle={0.38} penumbra={0.88} intensity={92} distance={38} color="#dfe8fd" />

      <rectAreaLight width={ROOM_W - 8.95} height={2.92} intensity={74} position={[0.35, ROOM_H * 0.56, -ROOM_D / 2 + 2.92]} rotation={[-Math.PI / 52, Math.PI / 220, (-Math.PI * 219) / 220]} color="#a78bfa" />
      <rectAreaLight
        width={8.92}
        height={11.5}
        intensity={98}
        position={[0.35, ROOM_H - 0.55, ROOM_D / 2 - 0.45]}
        rotation={[-Math.PI / 2, 0, Math.PI / 22]}
        color="#fcd34d"
      />
    </group>
  )
}

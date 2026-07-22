import { MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { type ReactElement, useMemo, useRef } from 'react'
import * as THREE from 'three'

/** Modular white pavilion + plaza props — matches flagship studio facade refs */
export function ModularStudioExterior({ posterTex }: { posterTex: THREE.CanvasTexture }) {
  const panelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f6f8fc',
        roughness: 0.52,
        metalness: 0.14,
        envMapIntensity: 0.92,
      }),
    [],
  )
  const seamMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#dce3ee',
        roughness: 0.62,
        metalness: 0.28,
        envMapIntensity: 0.72,
      }),
    [],
  )
  const neonCreagenz = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        emissive: '#7dd3fc',
        emissiveIntensity: 4.2,
        toneMapped: false,
        roughness: 0.22,
      }),
    [],
  )
  const ledStrip = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 3.4,
        toneMapped: false,
        roughness: 0.18,
      }),
    [],
  )
  const planterMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#27272a',
        roughness: 0.72,
        metalness: 0.08,
        envMapIntensity: 0.42,
      }),
    [],
  )
  const foliageMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3f6212',
        roughness: 0.82,
        metalness: 0,
        envMapIntensity: 0.28,
      }),
    [],
  )

  const camRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const g = camRef.current
    if (!g) return
    const t = clock.elapsedTime
    g.rotation.y = Math.sin(t * 0.38) * 0.52 - 0.25
    g.rotation.x = Math.sin(t * 0.21) * 0.08 - 0.12
  })

  const bx = 17.65
  const bz = 3.92
  const w = 6.35
  const h = 5.55
  const by = h / 2 - 0.02
  const d = 10.2

  const planters: [number, number, number][] = [
    [13.95, 0, bz - 4.65],
    [13.95, 0, bz + 4.65],
  ]

  return (
    <group>
      {/* Core modular shell */}
      <mesh position={[bx, by, bz]} castShadow receiveShadow material={panelMat}>
        <boxGeometry args={[w, h, d]} />
      </mesh>
      {/* Vertical seams */}
      {[-w / 2 + 0.65, w / 2 - 0.65].map((ox, i) => (
        <mesh key={`vs-${i}`} position={[bx + ox, by, bz]} castShadow material={seamMat}>
          <boxGeometry args={[0.06, h + 0.02, d + 0.08]} />
        </mesh>
      ))}
      {/* Corner LED grazers */}
      {[
        [bx - w / 2 + 0.08, by, bz - d / 2 + 0.06],
        [bx + w / 2 - 0.08, by, bz - d / 2 + 0.06],
        [bx - w / 2 + 0.08, by, bz + d / 2 - 0.06],
        [bx + w / 2 - 0.08, by, bz + d / 2 - 0.06],
      ].map((p, i) => (
        <mesh key={`led-${i}`} position={p as [number, number, number]} material={ledStrip}>
          <boxGeometry args={[0.07, h - 0.35, 0.055]} />
        </mesh>
      ))}

      {/* Curtain wall — readable from interior through door */}
      <mesh position={[bx - w / 2 - 0.06, by + 0.15, bz]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[d * 0.72, h * 0.82]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={1}
          thickness={0.38}
          roughness={0.045}
          chromaticAberration={0.02}
          anisotropicBlur={0.08}
          distortion={0.06}
          distortionScale={0.2}
          temporalDistortion={0}
          color="#f4f9ff"
        />
      </mesh>

      {/* CREAGENZ canopy glow */}
      <mesh position={[bx - w / 2 - 0.19, by + h * 0.42, bz]} rotation={[0, Math.PI / 2, 0]} material={neonCreagenz}>
        <planeGeometry args={[4.05, 0.58]} />
      </mesh>
      <Text
        position={[bx - w / 2 - 0.26, by + h * 0.42, bz]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.38}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.024}
        outlineColor="#0369a1"
      >
        CREAGENZ
      </Text>

      {/* mj facade lettering — centered stack */}
      <Text
        position={[bx - w / 2 - 0.24, by + h * 0.12, bz + 2.65]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.36}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
        maxWidth={4.2}
        textAlign="center"
      >
        mj creative
      </Text>
      <Text
        position={[bx - w / 2 - 0.24, by - h * 0.2, bz + 2.65]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.36}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
        maxWidth={4.2}
        textAlign="center"
      >
        engineer
      </Text>

      {/* Live-stream / QR slab */}
      <mesh position={[bx - w / 2 - 0.14, by + 0.55, bz - 3.65]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <planeGeometry args={[2.15, 2.85]} />
        <meshStandardMaterial map={posterTex} roughness={0.42} metalness={0.06} envMapIntensity={0.62} />
      </mesh>

      {/* Rooftop terrace slab */}
      <mesh position={[bx + 0.55, by + h / 2 + 0.65, bz]} castShadow receiveShadow material={panelMat}>
        <boxGeometry args={[w - 1.65, 0.42, d - 2.85]} />
      </mesh>
      {/* Glass railing hints */}
      {[
        [bx + 0.55, by + h / 2 + 1.02, bz - (d / 2 - 2)],
        [bx + 0.55, by + h / 2 + 1.02, bz + (d / 2 - 2)],
      ].map((p, i) => (
        <mesh key={`rail-${i}`} position={p as [number, number, number]} castShadow material={seamMat}>
          <boxGeometry args={[w - 1.85, 0.052, 0.085]} />
        </mesh>
      ))}
      {/* Solar array */}
      <mesh position={[bx + 1.85, by + h / 2 + 1.18, bz]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[2.85, 0.065, 4.25]} />
        <meshStandardMaterial color="#1e293b" roughness={0.38} metalness={0.42} envMapIntensity={0.55} />
      </mesh>
      <mesh position={[bx - 1.05, by + h / 2 + 1.22, bz]} rotation={[0.06, -0.15, 0]} castShadow>
        <boxGeometry args={[2.15, 0.052, 3.65]} />
        <meshStandardMaterial color="#172033" roughness={0.42} metalness={0.48} envMapIntensity={0.52} />
      </mesh>

      {/* Security camera */}
      <group ref={camRef} position={[bx + w / 2 - 0.42, by + h * 0.46, bz - d / 2 + 0.42]}>
        <mesh castShadow material={panelMat}>
          <boxGeometry args={[0.22, 0.14, 0.18]} />
        </mesh>
        <mesh position={[0.06, -0.02, 0.12]} rotation={[0.35, 0, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.065, 0.14, 14]} />
          <meshStandardMaterial color="#020617" roughness={0.35} metalness={0.65} envMapIntensity={0.72} />
        </mesh>
      </group>

      {/* Planters */}
      {plantersMeshes(planters, planterMat, foliageMat)}

      {/* Bicycle rack + bikes */}
      <group position={[bx - w / 2 + 2.85, 0, bz + d / 2 - 2.05]} rotation={[0, -0.22, 0]}>
        <mesh castShadow material={seamMat}>
          <boxGeometry args={[1.85, 0.065, 0.42]} />
        </mesh>
        {[0, 0.72].map((oz, i) => (
          <group key={i} position={[oz - 0.36, 0.52, 0.06]}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.44, 0.042, 10, 28]} />
              <meshStandardMaterial color="#252b36" roughness={0.38} metalness={0.62} envMapIntensity={0.62} />
            </mesh>
            <mesh position={[0.62, -0.08, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.024, 0.024, 1.08, 10]} />
              <meshStandardMaterial color="#313843" metalness={0.58} roughness={0.36} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Slatted bench */}
      <group position={[bx + w / 2 - 2.05, 0.42, bz + d / 2 - 2.85]} rotation={[0, 1.05, 0]}>
        {[0, 0.16, 0.32].map((ox, i) => (
          <mesh key={i} position={[ox, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.065, 0.085, 2.05]} />
            <meshStandardMaterial color="#c9b89a" roughness={0.72} metalness={0} envMapIntensity={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function plantersMeshes(
  planters: [number, number, number][],
  planterMat: THREE.MeshStandardMaterial,
  foliageMat: THREE.MeshStandardMaterial,
): ReactElement[] {
  return planters.map((p, i) => (
    <group key={`pl-${i}`} position={p}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow material={planterMat}>
        <boxGeometry args={[1.05, 0.76, 1.05]} />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow material={foliageMat}>
        <coneGeometry args={[0.52, 2.05, 10]} />
      </mesh>
      <mesh position={[0.28, 1.05, 0.22]} castShadow rotation={[0.08, 0.42, 0.12]} material={foliageMat}>
        <sphereGeometry args={[0.62, 12, 12]} />
      </mesh>
    </group>
  ))
}

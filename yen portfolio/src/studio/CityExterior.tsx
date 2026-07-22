import { type ReactElement, useMemo } from 'react'
import * as THREE from 'three'

/** Low-poly readable city slice visible through glass door / doorway */
export function CityExterior() {
  const gradientTex = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 4
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    const g = ctx.createLinearGradient(0, 0, 0, 256)
    g.addColorStop(0, '#c8ddff')
    g.addColorStop(0.45, '#eaf2ff')
    g.addColorStop(1, '#f5f7fb')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 4, 256)
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  const buildings = useMemo(() => {
    const rnd = (s: number) => () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    let seed = 91823
    const rand = rnd(seed)
    const items: ReactElement[] = []
    let bid = 0
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 14; col++) {
        const w = 1.4 + rand() * 2.4
        const h = 8 + rand() * 22
        const d = 1.8 + rand() * 2
        const x = 14 + col * 3 + rand()
        const z = -18 + row * 10 + rand() * 6
        const shade = 0.82 + rand() * 0.14
        items.push(
          <mesh key={`b-${bid++}`} position={[x + w / 2, h / 2, z]} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color={new THREE.Color(shade, shade + 0.02, shade + 0.04)}
              roughness={0.42}
              metalness={0.18}
            />
          </mesh>,
        )
      }
    }
    return items
  }, [])

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[28, 18, -10]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[80, 48]} />
        <meshBasicMaterial map={gradientTex} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      <mesh position={[28, -2, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 80]} />
        <meshStandardMaterial color="#d8dce8" roughness={0.72} metalness={0.06} envMapIntensity={0.42} />
      </mesh>

      {buildings}

      <mesh position={[22, 2.8, 4]} castShadow>
        <coneGeometry args={[2.8, 9, 8]} />
        <meshStandardMaterial color="#5b9468" roughness={0.78} metalness={0} />
      </mesh>
      <mesh position={[26, 3.2, -12]} castShadow>
        <coneGeometry args={[3.2, 11, 8]} />
        <meshStandardMaterial color="#4f865d" roughness={0.78} metalness={0} />
      </mesh>
    </group>
  )
}

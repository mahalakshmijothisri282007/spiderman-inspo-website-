import { Float, Line, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { ROOM_H } from './studioConstants'

/** Animated brainstorming layer — particles, orbitals, stickies, board, bubbles, cables */
export function BrainstormLayer() {
  return (
    <group>
      <IdeaSparkField />
      <StickyNoteWallCluster />
      <MindMapThreadLines />
      <BrainstormCorkBackdrop />
      <OrbitingIdeaMeshes />
      <FloorCableSnake />
      <FlipChartAndPaperStacks />
      <CeilingIdeationPulseRail />
      <PushPinCluster />
      <GlassThoughtBubbles />
      <FloatingKeywordShards />
      <WhiteboardSparkArrows />
      <AmbientCeilingMotes />
    </group>
  )
}

function IdeaSparkField() {
  const grp = useRef<THREE.Group>(null)
  const sparks = useMemo(
    () =>
      Array.from({ length: 56 }, () => ({
        x: THREE.MathUtils.randFloat(-6.85, 6.92),
        y: THREE.MathUtils.randFloat(1.15, ROOM_H - 0.52),
        z: THREE.MathUtils.randFloat(-5.92, 5.95),
        phase: Math.random() * Math.PI * 2,
        speed: 0.52 + Math.random() * 0.88,
        sway: 0.07 + Math.random() * 0.22,
      })),
    [],
  )

  const colors = ['#38bdf8', '#818cf8', '#f472b6', '#34d399', '#fde047', '#f0abfc']

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    grp.current?.children.forEach((m, i) => {
      const d = sparks[i]
      const w = Math.sin(t * d.speed + d.phase) * d.sway
      const b = Math.cos(t * d.speed * 1.42 + i) * 0.068
      m.position.set(d.x + w * 0.45, d.y + b, d.z + Math.sin(t * 0.38 + d.phase) * 0.05)
      m.rotation.x = Math.sin(t * 0.66 + i) * 0.42
      m.rotation.z = Math.cos(t * 0.54 + i) * 0.36
      const mat = (m as THREE.Mesh).material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 2.05 + Math.sin(t * (1.85 + (i % 5) * 0.06) + d.phase) * 0.88
    })
  })

  return (
    <group ref={grp}>
      {sparks.map((d, i) => (
        <mesh key={i} castShadow position={[d.x, d.y, d.z]}>
          <icosahedronGeometry args={[0.042 + (i % 4) * 0.009, 0]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={2.35}
            toneMapped={false}
            roughness={0.38}
            metalness={0.22}
          />
        </mesh>
      ))}
    </group>
  )
}

function StickyNoteWallCluster() {
  const colors = ['#fde047', '#fdba74', '#f9a8d4', '#7dd3fc', '#bbf7d0', '#fde68a', '#e9d5ff']
  const grp = useRef<THREE.Group>(null)

  const arr = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: THREE.MathUtils.randFloat(-7.18, -5.94),
        y: THREE.MathUtils.randFloat(0.92, 3.42),
        z: THREE.MathUtils.randFloat(-5.92, 3.92),
        rot: THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(-14, 14)),
        wi: THREE.MathUtils.randFloat(0.16, 0.31),
        hi: THREE.MathUtils.randFloat(0.18, 0.35),
        c: colors[i % colors.length],
      })),
    [colors],
  )

  useFrame(({ clock }) => {
    grp.current?.children.forEach((c, i) => {
      const w = Math.sin(clock.elapsedTime * (0.9 + i * 0.04) + i * 0.7) * 0.038
      c.rotation.z = (i % 2 === 0 ? 1 : -1) * (0.05 + Math.sin(clock.elapsedTime * (0.75 + i * 0.02) + i) * 0.048)
      c.rotation.x = w
    })
  })

  return (
    <group ref={grp}>
      {arr.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]} rotation={[0, Math.PI / 2, n.rot]} castShadow receiveShadow>
          <planeGeometry args={[n.wi, n.hi]} />
          <meshStandardMaterial color={n.c} roughness={0.82} metalness={0} side={THREE.DoubleSide} envMapIntensity={0.38} />
        </mesh>
      ))}
    </group>
  )
}

function MindMapThreadLines() {
  const grp = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    grp.current?.rotation.set(0, Math.sin(clock.elapsedTime * 0.055) * 0.04, Math.cos(clock.elapsedTime * 0.04) * 0.026)
  })

  const segs = useMemo(() => {
    const cx = new THREE.Vector3(-7.62, 2.08, -0.2)
    const nodes = [
      new THREE.Vector3(-7.6, 2.78, -1.32),
      new THREE.Vector3(-7.61, 1.74, -2.15),
      new THREE.Vector3(-7.59, 2.58, 1.65),
      new THREE.Vector3(-7.61, 1.62, -0.82),
      new THREE.Vector3(-7.6, 2.18, -3.62),
      new THREE.Vector3(-7.63, 1.92, 2.32),
    ]
    const pairs: THREE.Vector3[][] = []
    for (let i = 0; i < nodes.length; i++) pairs.push([cx.clone(), nodes[i].clone()])
    pairs.push([nodes[2].clone(), nodes[5].clone()])
    pairs.push([nodes[1].clone(), nodes[4].clone()])
    return pairs
  }, [])

  return (
    <group ref={grp}>
      {segs.map((p, i) => (
        <Line key={i} points={p} color="#8896ab" opacity={0.62} transparent lineWidth={1.65} dashed dashScale={1.85} dashSize={0.09} gapSize={0.08} />
      ))}
    </group>
  )
}

function BrainstormCorkBackdrop() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 576
    c.height = 420
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#beb39a'
    ctx.fillRect(0, 0, 576, 420)
    for (let i = 0; i < 12000; i++) {
      ctx.fillStyle = `rgba(${70 + Math.random() * 45}, ${55 + Math.random() * 40}, ${32 + Math.random() * 30}, ${0.02 + Math.random() * 0.04})`
      ctx.fillRect(Math.random() * 576, Math.random() * 420, 2, 3)
    }
    ctx.strokeStyle = 'rgba(55,43,29,0.18)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(98, 88)
    ctx.lineTo(480, 102)
    ctx.lineTo(420, 320)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(300, 220, 86, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(55,43,29,0.22)'
    ctx.stroke()

    ctx.fillStyle = 'rgba(248,248,246,0.96)'
    ctx.font = '600 34px DM Sans, system-ui, sans-serif'
    ctx.fillText('BRAINSTORM', 124, 104)
    ctx.font = '500 17px DM Sans, system-ui, sans-serif'
    ctx.fillStyle = 'rgba(30,41,59,0.68)'
    ctx.fillText('sketch lanes · divergence · converge', 128, 132)

    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  const brd = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!brd.current) return
    brd.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.012
    brd.current.rotation.y = Math.PI / 2 + Math.cos(clock.elapsedTime * 0.065) * 0.015
  })

  return (
    <mesh ref={brd} position={[-7.67, 1.95, -2.65]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
      <planeGeometry args={[2.28, 1.72]} />
      <meshStandardMaterial map={tex} roughness={0.9} metalness={0} envMapIntensity={0.42} />
    </mesh>
  )
}

function OrbitingIdeaMeshes() {
  const hub = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbit.current) orbit.current.rotation.y = t * 0.26
    if (orbit.current) orbit.current.rotation.x = Math.sin(t * 0.18) * 0.09
    if (hub.current) {
      hub.current.position.y = 2.72 + Math.sin(t * 0.55) * 0.075
      hub.current.rotation.z = Math.sin(t * 0.32) * 0.11
    }
  })

  const radii = useMemo(() => [0.42, 0.58], [])

  const cells = radii.flatMap((rad, ri) =>
    [0, 1, 2].map((slot) => {
      const angle = slot * Math.PI * 0.72 + ri * 0.45
      return { rad, ri, slot, angle }
    }),
  )

  return (
    <group ref={hub} position={[2.52, 2.72, 3.72]}>
      <group ref={orbit}>
        {cells.map(({ rad, ri, slot, angle }) => (
          <Float key={`${ri}-${slot}`} speed={2.05} rotationIntensity={0.7} floatIntensity={0.4}>
            <group rotation={[slot * 0.22, angle, ri * 0.18]}>
              <mesh position={[Math.cos(angle) * rad * 2.05, Math.sin(angle * 0.92) * rad * 1.42, Math.sin(angle) * rad * 1.9]} castShadow>
                <octahedronGeometry args={[0.095 + slot * 0.022]} />
                <meshStandardMaterial color="#bfdbfe" emissive="#3b82f6" emissiveIntensity={1.15} toneMapped={false} metalness={0.48} roughness={0.24} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
    </group>
  )
}

function FloorCableSnake() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(5.48, 0.021, 4.92),
        new THREE.Vector3(3.82, 0.021, 5.72),
        new THREE.Vector3(0.12, 0.021, 5.92),
        new THREE.Vector3(-3.45, 0.025, 4.92),
        new THREE.Vector3(-6.82, 0.022, 4.82),
      ]),
    [],
  )

  return (
    <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
      <tubeGeometry args={[curve, 40, 0.024, 5, false]} />
      <meshStandardMaterial color="#9aa9c2" roughness={0.38} metalness={0.32} envMapIntensity={0.68} />
    </mesh>
  )
}

function FlipChartAndPaperStacks() {
  const flip = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!flip.current) return
    flip.current.rotation.y = Math.sin(clock.elapsedTime * 0.22) * 0.14 + 0.18
    flip.current.rotation.x = Math.cos(clock.elapsedTime * 0.31) * 0.038
  })

  const sheetRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const mat = sheetRef.current?.material as THREE.MeshBasicMaterial
    if (mat) mat.opacity = 0.74 + Math.sin(clock.elapsedTime * 1.42) * 0.08
  })

  return (
    <group>
      <group ref={flip} position={[-7.52, 0.94, -4.75]} rotation={[0, 0.52, 0]}>
        <mesh position={[0, 1.42, -0.02]} castShadow>
          <cylinderGeometry args={[0.036, 0.04, 2.92, 10]} />
          <meshStandardMaterial color="#bdc4d6" metalness={0.55} roughness={0.34} envMapIntensity={0.82} />
        </mesh>
        <mesh position={[0, 1.94, -0.15]} rotation={[-0.12, 0, 0]} castShadow>
          <boxGeometry args={[1.72, 1.95, 0.028]} />
          <meshStandardMaterial color="#fcfbf9" roughness={0.78} metalness={0} envMapIntensity={0.45} />
        </mesh>
        <mesh ref={sheetRef} position={[0, 2.75, -0.15]} rotation={[-Math.PI / 2 + 0.42, 0, 0.08]}>
          <planeGeometry args={[1.82, 0.92]} />
          <meshBasicMaterial color="#eef2ff" transparent opacity={0.78} toneMapped={false} />
        </mesh>
      </group>

      {[
        [-4.92, -3.88],
        [3.82, -3.92],
      ].map(([x, z], i) => (
        <group key={i} position={[x!, 0, z!]}>
          {[0, 1, 2, 3].map((j) => (
            <mesh
              key={j}
              position={[Math.sin(j) * 0.03 + j * 0.012, 0.785 + j * 0.03, Math.cos(j) * 0.03]}
              castShadow
              rotation={[j * 0.02, j * 0.15, j * 0.05]}
            >
              <boxGeometry args={[0.42 + j * 0.04, 0.026 + j * 0.006, 0.58 + j * 0.04]} />
              <meshStandardMaterial color="#fefdfb" roughness={0.9} metalness={0} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function CeilingIdeationPulseRail() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const m = meshRef.current?.material as THREE.MeshStandardMaterial
    if (!m) return
    const t = clock.elapsedTime
    m.emissiveIntensity = 2.9 + Math.sin(t * 1.75) * 1.25
    m.color.setRGB(0.88 + Math.sin(t * 2.1) * 0.06, 0.97, 0.96 + Math.cos(t * 2.55) * 0.035)
  })

  const secondary = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const m2 = secondary.current?.material as THREE.MeshStandardMaterial
    if (m2) m2.emissiveIntensity = 1.72 + Math.cos(clock.elapsedTime * 2.62) * 1.42
  })

  const rh = useMemo(() => ROOM_H - 0.125, [])
  return (
    <group>
      <mesh ref={meshRef} position={[2.92, rh, -2]} rotation={[0, Math.PI / 9, 0]}>
        <boxGeometry args={[5.92, 0.042, 0.068]} />
        <meshStandardMaterial color="#ccfbf1" emissive="#5eead4" emissiveIntensity={3} toneMapped={false} roughness={0.32} metalness={0.1} />
      </mesh>
      <mesh ref={secondary} position={[-3.4, rh, 2]} rotation={[0, -Math.PI / 14, 0]}>
        <boxGeometry args={[4.92, 0.036, 0.055]} />
        <meshStandardMaterial color="#fde68a" emissive="#fcd34d" emissiveIntensity={2.52} toneMapped={false} roughness={0.36} metalness={0.08} />
      </mesh>
    </group>
  )
}

function PushPinCluster() {
  const pins = [
    [-5.88, 1.35, 4.42, '#fbbf24'],
    [-6.12, 1.44, 3.92, '#4ade80'],
    [-6.15, 1.18, 4.38, '#60a5fa'],
    [-5.75, 1.08, 3.92, '#f87171'],
  ]
  const grp = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    grp.current?.children.forEach((c, i) => {
      const s = 1 + Math.sin(clock.elapsedTime * (3 + i * 0.7) + i) * 0.068
      c.scale.setScalar(s)
    })
  })

  return (
    <group ref={grp}>
      {pins.map(([x, y, z, hex], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.062, 0.132, 9]} />
          <meshStandardMaterial color={hex as string} roughness={0.4} metalness={0.32} envMapIntensity={0.58} />
        </mesh>
      ))}
    </group>
  )
}

function GlassThoughtBubbles() {
  const ref = useRef<THREE.Group>(null)

  const spots = useMemo(
    () =>
      [
        [5.42, 2.58, -5.93, 0.38],
        [5.92, 1.94, -5.93, 0.58],
        [6.92, 2.32, -4.94, 0.44],
        [7.42, 1.92, -5.88, 0.66],
        [7.94, 2.85, -5.92, 0.32],
        [5.92, 2.15, -4.2, 0.52],
        [6.92, 1.82, -3.94, 0.48],
        [8.12, 1.92, -2.94, 0.36],
      ] as const,
    [],
  )

  useFrame(({ clock }) => {
    ref.current?.children.forEach((c, i) => {
      const s = 1 + Math.sin(clock.elapsedTime * (0.92 + i * 0.12) + i) * 0.14
      c.scale.setScalar(s)
      c.rotation.y += 0.0035 + i * 0.0004
    })
  })

  return (
    <group ref={ref}>
      {spots.map(([x, y, z, r], i) => (
        <Float key={i} speed={1.85} rotationIntensity={0.62} floatIntensity={0.55}>
          <mesh position={[x, y, z]} castShadow>
            <sphereGeometry args={[0.12 + r * 0.52, 16, 16]} />
            <meshPhysicalMaterial
              color="#fdfefe"
              transmission={0.72}
              thickness={0.35}
              roughness={0.12}
              toneMapped={false}
              attenuationDistance={1.08}
              attenuationColor="#dff4fc"
              envMapIntensity={1.06}
              transparent
              opacity={0.96}
              ior={1.45}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function FloatingKeywordShards() {
  const words = ['IDEATE', 'REFINE', 'SHIP', 'LEARN']

  return (
    <group>
      {words.map((w, i) => (
        <Float key={w} speed={1.42} rotationIntensity={0.25} floatIntensity={0.32}>
          <group position={[-7.92, 2.94, -5.92 + i * 1.32]} rotation={[0, Math.PI / 2, 0]}>
            <mesh position={[0, 0, -0.018]} castShadow>
              <planeGeometry args={[w.length * 0.11 + 0.14, 0.28]} />
              <meshStandardMaterial
                color="#020617"
                emissive="#0f172a"
                emissiveIntensity={0.22}
                transparent
                opacity={0.78}
                roughness={0.55}
                metalness={0.08}
                depthWrite={false}
              />
            </mesh>
            <Text
              fontSize={0.1}
              color="#ecfdf5"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.008}
              outlineColor="#059669"
              position={[0, 0, 0.02]}
            >
              {w}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  )
}

function WhiteboardSparkArrows() {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const gr = g.current
    if (!gr) return
    gr.rotation.z = Math.sin(clock.elapsedTime * 0.28) * 0.06
    gr.rotation.y = clock.elapsedTime * 0.15
  })

  const pts: [number, number][] = [
    [0.28, Math.PI / 5],
    [0.52, Math.PI / 2.8],
    [0.38, Math.PI],
  ]

  return (
    <group ref={g} position={[-7.68, 1.95, -0.92]} rotation={[0, Math.PI / 2 + 0.04, 0]}>
      {pts.map(([len, rot], i) => (
        <mesh key={i} position={[Math.cos(rot) * len * 0.4, Math.sin(rot) * len * 0.58, -0.01]} rotation={[0, 0, rot - Math.PI / 2]} castShadow>
          <coneGeometry args={[0.06, 0.24, 6]} />
          <meshStandardMaterial color="#fcd34d" emissive="#fbbf24" emissiveIntensity={0.85 + i * 0.12} metalness={0.25} roughness={0.4} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function AmbientCeilingMotes() {
  const grp = useRef<THREE.Group>(null)
  const pts = useMemo(
    () =>
      Array.from({ length: 32 }, () => ({
        x: THREE.MathUtils.randFloatSpread(12),
        y: ROOM_H - 0.22,
        z: THREE.MathUtils.randFloatSpread(10),
        ph: Math.random() * Math.PI * 2,
        r: THREE.MathUtils.randFloat(0.03, 0.09),
      })),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    grp.current?.children.forEach((c, i) => {
      const d = pts[i]
      ;(c as THREE.Mesh).scale.setScalar(d.r * (1.08 + Math.sin(t * 1.2 + d.ph) * 0.55))
      c.position.y = d.y + Math.sin(t * 0.9 + d.ph) * 0.08
      c.rotation.x += 0.01
      c.rotation.z += 0.012
      const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = 0.35 + Math.sin(t * 2 + d.ph) * 0.2
    })
  })

  return (
    <group ref={grp}>
      {pts.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#fffbeb" toneMapped={false} transparent opacity={0.45} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

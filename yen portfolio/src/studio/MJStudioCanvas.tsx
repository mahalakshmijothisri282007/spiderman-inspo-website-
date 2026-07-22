import { Canvas } from '@react-three/fiber'
import { Suspense, type RefObject } from 'react'
import * as THREE from 'three'
import { StudioScene } from './StudioScene'

type Props = {
  scrollRootRef: RefObject<HTMLElement | null>
}

export function MJStudioCanvas({ scrollRootRef }: Props) {
  return (
    <Canvas
      shadows="soft"
      camera={{ position: [11.2, 1.62, 3.6], fov: 42, near: 0.06, far: 220 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.44,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}
      dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2)]}
    >
      <Suspense fallback={null}>
        <StudioScene scrollRootRef={scrollRootRef} />
      </Suspense>
    </Canvas>
  )
}

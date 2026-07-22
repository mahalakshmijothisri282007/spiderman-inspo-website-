import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { type RefObject, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CityExterior } from './CityExterior'
import { ModularStudioExterior } from './ModularStudioExterior'
import { OptionalDracoModel } from './OptionalDracoModel'
import { ScrollCamera } from './ScrollCamera'
import { StudioPostFX } from './StudioPostFX'
import {
  createCodeEditorMonitorTexture,
  createCreagenzTvTexture,
  createGalleryPrintTexture,
  createLiveStreamPosterTexture,
  createMjEngineerMonitorTexture,
  createScreenTexture,
  createShelfShowcaseScreenTexture,
  createStudioBoardTexture,
  createWireframeBoardTexture,
} from './textures'
import { ROOM_D } from './studioConstants'
import { RedesignedStudioInterior } from './RedesignedStudioInterior'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  scrollRootRef: RefObject<HTMLElement | null>
}

export function StudioScene({ scrollRootRef }: Props) {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [])

  const wireBoard = useMemo(() => createWireframeBoardTexture(), [])
  const studioBoard = useMemo(() => createStudioBoardTexture(), [])
  const texAiTools = useMemo(
    () => createScreenTexture(['50+ AI Tools Stack', 'Fullstack · AI'], '#34d399'),
    [],
  )
  const texMjPrimary = useMemo(() => createMjEngineerMonitorTexture(), [])
  const texCreagenzTv = useMemo(() => createCreagenzTvTexture(), [])
  const texCodeEditor = useMemo(() => createCodeEditorMonitorTexture(), [])
  const texShelfHud = useMemo(() => createShelfShowcaseScreenTexture('SHOWCASE', 'Shipped work · Case studies'), [])
  const texShelfHudB = useMemo(() => createShelfShowcaseScreenTexture('PIPELINE', 'Design · Build · Measure'), [])
  const texGalleryA = useMemo(() => createGalleryPrintTexture(1), [])
  const texGalleryB = useMemo(() => createGalleryPrintTexture(4), [])
  const texLivePoster = useMemo(() => createLiveStreamPosterTexture(), [])

  return (
    <>
      <ScrollCamera scrollRootRef={scrollRootRef} />

      <color attach="background" args={['#0c1018']} />
      <Environment preset="warehouse" frames={Infinity} resolution={736} environmentIntensity={0.88} environmentRotation={[0, 0.22, 0]}>
        <Lightformer intensity={6} rotation-x={Math.PI / 2} position={[12, 8, -8]} scale={[52, 1, 22]} />
        <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[10, 4, -2]} scale={[1, 24, 16]} />
        <Lightformer intensity={3} rotation-y={-Math.PI / 2} position={[-12, 5, -1]} scale={[1, 20, 12]} />
      </Environment>

      <ambientLight intensity={0.24} color="#e8eef8" />
      <hemisphereLight color="#c8d8f0" groundColor="#283040" intensity={0.38} position={[0, ROOM_D, 0]} />

      <directionalLight
        castShadow
        position={[21, 25, 8]}
        intensity={1.35}
        color="#fff9f5"
        shadow-mapSize-width={3072}
        shadow-mapSize-height={3072}
        shadow-camera-near={2}
        shadow-camera-far={88}
        shadow-camera-left={-22}
        shadow-camera-right={28}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.00022}
        shadow-normalBias={0.026}
      />
      <directionalLight position={[-16, 12, -6]} intensity={0.28} color="#9bb4d9" />

      <CityExterior />
      <ModularStudioExterior posterTex={texLivePoster} />

      <RedesignedStudioInterior
        texMjPrimary={texMjPrimary}
        texCodeEditor={texCodeEditor}
        texCreagenzTv={texCreagenzTv}
        texShelfHud={texShelfHud}
        texShelfHudB={texShelfHudB}
        texGalleryA={texGalleryA}
        texGalleryB={texGalleryB}
        texAiTools={texAiTools}
        wireBoard={wireBoard}
        studioBoard={studioBoard}
      />

      <ContactShadows opacity={0.48} scale={34} blur={5.8} far={13} frames={1} position={[0, 0.02, 0]} />

      <OptionalDracoModel />

      <StudioPostFX />
    </>
  )
}

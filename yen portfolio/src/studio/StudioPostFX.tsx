import { Bloom, DepthOfField, EffectComposer, FXAA, Noise, SSAO, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

/** Prioritises readable space & sharp detail: gentle AO, wide focus, light vignette, FXAA */
export function StudioPostFX() {
  return (
    <EffectComposer enableNormalPass multisampling={8}>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        intensity={7}
        radius={0.045}
        luminanceInfluence={0.28}
        bias={0.022}
        depthAwareUpsampling
        samples={16}
        rings={4}
        resolutionScale={0.85}
      />
      <Bloom luminanceThreshold={0.84} luminanceSmoothing={0.42} intensity={0.38} mipmapBlur />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.028} />
      <DepthOfField worldFocusDistance={9} worldFocusRange={26} bokehScale={0.62} focalLength={0.018} />
      <Vignette eskil={false} offset={0.22} darkness={0.14} />
      <FXAA />
    </EffectComposer>
  )
}

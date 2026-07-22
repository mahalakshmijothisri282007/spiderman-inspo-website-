import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

type Props = {
  /** Place a Draco-compressed `.glb` under `/public/models/` and set this path */
  url?: string
}

/**
 * Drei's `useGLTF` wires GLTFLoader + optional Draco (`true` enables decoder CDN).
 * Lazy-load heavy kits by dynamically importing the component that calls this hook.
 */
function LoadedAccent({ url }: { url: string }) {
  const gltf = useGLTF(url, true)
  return <primitive object={gltf.scene.clone()} />
}

/** Mount only when you add an asset — avoids failed requests on empty portfolios */
export function OptionalDracoModel({ url }: Props) {
  if (!url) return null
  return (
    <Suspense fallback={null}>
      <LoadedAccent url={url} />
    </Suspense>
  )
}

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sampleCameraPath } from './cameraKeyframes'

gsap.registerPlugin(ScrollTrigger)

function dampTowards(current: THREE.Vector3, target: THREE.Vector3, lambda: number, dt: number) {
  const k = 1 - Math.exp(-lambda * dt)
  current.lerp(target, k)
}

type Props = {
  scrollRootRef: React.RefObject<HTMLElement | null>
}

export function ScrollCamera({ scrollRootRef }: Props) {
  const { camera } = useThree()
  const scrollProgress = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })

  const idealPos = useMemo(() => new THREE.Vector3(), [])
  const idealTarget = useMemo(() => new THREE.Vector3(), [])
  const dampPos = useMemo(() => new THREE.Vector3().copy(camera.position), [])
  const dampTarget = useMemo(() => new THREE.Vector3(0, 1.4, 0), [])

  useEffect(() => {
    const root = scrollRootRef.current
    if (!root) return

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.35,
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove)

    return () => {
      st.kill()
      window.removeEventListener('pointermove', onMove)
    }
  }, [scrollRootRef])

  useFrame((_, delta) => {
    sampleCameraPath(scrollProgress.current, idealPos, idealTarget)

    const mx = mouse.current.x * 0.09
    const my = mouse.current.y * 0.045
    idealPos.x += mx
    idealPos.y += my

    dampTowards(dampPos, idealPos, 5.5, delta)
    dampTowards(dampTarget, idealTarget, 5.8, delta)

    camera.position.copy(dampPos)
    camera.lookAt(dampTarget)
  })

  return null
}

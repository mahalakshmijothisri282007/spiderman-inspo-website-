import * as THREE from 'three'

export type CameraKeyframe = {
  /** Scroll segment weight sum = 1 */
  weight: number
  position: THREE.Vector3
  target: THREE.Vector3
}

/**
 * Exterior → threshold → interior sweep (weights equal for predictable pacing).
 * Starts wide on plaza/pavilion, threads the glass door, then tours the tall studio.
 */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    weight: 0.1,
    position: new THREE.Vector3(24.8, 3.35, 10.2),
    target: new THREE.Vector3(17.9, 3.05, 5.2),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(20.6, 2.65, 8.55),
    target: new THREE.Vector3(15.8, 2.55, 4.95),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(15.95, 1.92, 7.05),
    target: new THREE.Vector3(11.35, 1.82, 4.65),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(12.85, 1.72, 5.65),
    target: new THREE.Vector3(8.65, 1.62, 4.35),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(10.55, 1.72, 4.85),
    target: new THREE.Vector3(5.65, 1.62, 4.05),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(7.25, 1.92, 5.25),
    target: new THREE.Vector3(1.2, 1.55, -0.92),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(4.25, 2.12, 2.92),
    target: new THREE.Vector3(-0.45, 1.62, -1.05),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(1.55, 2.22, -0.25),
    target: new THREE.Vector3(-5.25, 1.92, -4.92),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(-1.92, 2.38, -2.85),
    target: new THREE.Vector3(-6.92, 1.92, -5.92),
  },
  {
    weight: 0.1,
    position: new THREE.Vector3(11.95, 1.92, 3.05),
    target: new THREE.Vector3(18.85, 2.35, 5.85),
  },
]

export function sampleCameraPath(
  t01: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3,
): void {
  const total = CAMERA_KEYFRAMES.reduce((s, k) => s + k.weight, 0)
  let u = THREE.MathUtils.clamp(t01, 0, 1) * total
  let i = 0
  while (i < CAMERA_KEYFRAMES.length - 1 && u > CAMERA_KEYFRAMES[i].weight) {
    u -= CAMERA_KEYFRAMES[i].weight
    i++
  }
  const a = CAMERA_KEYFRAMES[i]
  const b = CAMERA_KEYFRAMES[Math.min(i + 1, CAMERA_KEYFRAMES.length - 1)]
  const span = Math.max(a.weight, 1e-6)
  const local = THREE.MathUtils.smoothstep(u / span, 0, 1)
  outPos.lerpVectors(a.position, b.position, local)
  outTarget.lerpVectors(a.target, b.target, local)
}

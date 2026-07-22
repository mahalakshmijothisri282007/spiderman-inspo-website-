import * as THREE from 'three'

/** Subtle procedural maps — avoids loading heavy image textures. */
/** Light grey vertical-fiber acoustic panel look (modular studio walls) */
export function createAcousticPanelTexture(w = 256, h = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#eceff4'
  ctx.fillRect(0, 0, w, h)
  for (let x = 0; x < w; x += 3) {
    const g = 214 + Math.sin(x * 0.08) * 8 + Math.random() * 6
    ctx.strokeStyle = `rgba(${g}, ${g + 2}, ${g + 5}, 0.35)`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const a = 0.04 + Math.random() * 0.06
    ctx.fillStyle = `rgba(160,165,175,${a})`
    ctx.fillRect(x, y, 1, 2 + Math.random() * 3)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(1, 3)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Linear micro-variation — roughness channel for PBR walls */
export function createWallRoughnessMap(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = 155 + Math.random() * 80
    img.data[i] = n
    img.data[i + 1] = n
    img.data[i + 2] = n
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(5, 5)
  tex.colorSpace = THREE.NoColorSpace
  return tex
}

/** Drop-ceiling tile grid */
export function createCeilingTileTexture(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, size, size)
  ctx.strokeStyle = '#e8eaee'
  ctx.lineWidth = 3
  ctx.strokeRect(4, 4, size - 8, size - 8)
  ctx.fillStyle = '#f3f5f8'
  ctx.fillRect(10, 10, size - 20, size - 20)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(12, 10)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Light warm wood / laminate planks */
export function createWoodLaminateTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#d8cfc4'
  ctx.fillRect(0, 0, size, size)
  const plank = size / 10
  for (let row = 0; row < 10; row++) {
    const offset = row % 2 === 0 ? 0 : plank / 2
    for (let col = -1; col < 12; col++) {
      const x = col * plank + offset
      const y = row * plank
      const base = 205 + Math.sin(row * 1.2 + col * 0.4) * 18
      ctx.fillStyle = `rgb(${base}, ${base - 22}, ${base - 38})`
      ctx.fillRect(x, y + 2, plank - 4, plank - 4)
      ctx.strokeStyle = 'rgba(120,100,85,0.12)'
      ctx.lineWidth = 1
      ctx.strokeRect(x, y + 2, plank - 4, plank - 4)
    }
  }
  for (let i = 0; i < 12000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    ctx.fillStyle = `rgba(130,110,95,${0.03 + Math.random() * 0.05})`
    ctx.fillRect(x, y, 2 + Math.random() * 8, 1)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3.5, 4)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Primary monitor — mj creative engineer */
export function createMjEngineerMonitorTexture(): THREE.CanvasTexture {
  const w = 640
  const h = 400
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0c0f14'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  for (let i = 0; i < 20; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * 22)
    ctx.lineTo(w, i * 22 + 15)
    ctx.stroke()
  }
  ctx.fillStyle = '#ffffff'
  ctx.font = '800 52px system-ui, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('mj', 48, 160)
  ctx.font = '600 26px system-ui, sans-serif'
  ctx.fillStyle = '#e2e8f0'
  ctx.fillText('creative engineer', 48, 208)
  ctx.fillStyle = '#64748b'
  ctx.font = '500 16px system-ui, sans-serif'
  ctx.fillText('Full-stack · AI · Design systems', 48, 258)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Wall-mounted CREAGENZ display — wavy graphic */
export function createCreagenzTvTexture(): THREE.CanvasTexture {
  const w = 896
  const h = 512
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, '#1e3a5f')
  bg.addColorStop(0.45, '#312e81')
  bg.addColorStop(1, '#4c1d95')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = 'rgba(255,255,255,0.14)'
  ctx.lineWidth = 3
  for (let i = 0; i < 14; i++) {
    ctx.beginPath()
    ctx.moveTo(-40, 80 + i * 48)
    ctx.bezierCurveTo(w * 0.35, 20 + i * 62, w * 0.65, h - 40 - i * 35, w + 40, 120 + i * 38)
    ctx.stroke()
  }

  ctx.fillStyle = '#ffffff'
  ctx.font = '900 72px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('CREAGENZ', w / 2, h / 2 + 22)
  ctx.font = '500 18px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.72)'
  ctx.fillText('Studio · Idea Generation · Tangible Results', w / 2, h / 2 + 62)
  ctx.textAlign = 'left'

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

export function createWallNoiseTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = 235 + Math.random() * 18
    img.data[i] = n
    img.data[i + 1] = n
    img.data[i + 2] = n
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(4, 4)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createFloorNoiseTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#d8dade'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const g = 180 + Math.random() * 40
    ctx.fillStyle = `rgba(${g},${g},${g + 4},${0.08 + Math.random() * 0.06})`
    ctx.fillRect(x, y, 2, 2)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(6, 6)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createWireframeBoardTexture(): THREE.CanvasTexture {
  const w = 768
  const h = 512
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ececee'
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = '#b8bcc4'
  ctx.lineWidth = 2
  const frames = [
    [40, 40, 220, 140],
    [280, 40, 420, 180],
    [520, 40, 230, 160],
    [40, 200, 340, 260],
    [400, 220, 350, 240],
  ]
  for (const r of frames) {
    ctx.strokeRect(r[0], r[1], r[2], r[3])
    ctx.fillStyle = '#dfe3ea'
    ctx.fillRect(r[0] + 8, r[1] + 8, r[2] - 16, r[3] - 16)
    ctx.strokeStyle = '#b8bcc4'
    ctx.strokeRect(r[0], r[1], r[2], r[3])
  }

  ctx.strokeStyle = '#9aa3b2'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  for (let i = 0; i < 12; i++) {
    const x = 60 + i * 58
    ctx.moveTo(x, 380)
    ctx.lineTo(x + 40, 460)
  }
  ctx.stroke()

  ctx.fillStyle = '#7c8496'
  ctx.font = '600 22px system-ui,sans-serif'
  ctx.fillText('UI · UX · AI pipelines', 48, 310)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

export function createScreenTexture(lines: string[], accent = '#0a84ff'): THREE.CanvasTexture {
  const w = 512
  const h = 320
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const grd = ctx.createLinearGradient(0, 0, w, h)
  grd.addColorStop(0, '#0e1118')
  grd.addColorStop(1, '#1a2233')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = accent
  ctx.font = 'bold 42px system-ui,sans-serif'
  let y = 100
  for (const line of lines) {
    ctx.fillText(line, 36, y)
    y += 52
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * 40)
    ctx.lineTo(w, i * 40 + 20)
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Left-wall studio board — aligns with portfolio themes */
export function createStudioBoardTexture(): THREE.CanvasTexture {
  const w = 640
  const h = 400
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fafbfc'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#e2e8f0'
  ctx.lineWidth = 1
  for (let x = 0; x < w; x += 28) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += 28) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
  ctx.fillStyle = '#1e293b'
  ctx.font = '600 26px system-ui,sans-serif'
  ctx.fillText('Data Science · UI/UX · AI workflow', 36, 62)
  ctx.font = '500 17px system-ui,sans-serif'
  ctx.fillStyle = '#64748b'
  ctx.fillText('32 members · 30+ tools each · CREAGENZ', 36, 96)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** IDE-style canvas — secondary portrait / coding displays */
export function createCodeEditorMonitorTexture(): THREE.CanvasTexture {
  const w = 420
  const h = 680
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0b1220'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#1e293b'
  ctx.fillRect(28, 52, w - 56, h - 92)
  const lines = ['interface Props {', '  studio: CreativeEngineer', '  showcase: Portfolio[]', '}', '', 'export function ShipExperience(p: Props) {', '  return renderBrainstorm(p)', '}']
  ctx.font = '500 22px ui-monospace, Consolas, monospace'
  lines.forEach((line, i) => {
    ctx.fillStyle = '#64748b'
    ctx.fillText(String(i + 1).padStart(2, ' '), 42, 118 + i * 34)
    ctx.fillStyle = line.includes('interface') ? '#f472b6' : line.includes('export') ? '#34d399' : '#e2e8f0'
    ctx.fillText(line, 92, 118 + i * 34)
  })
  ctx.fillStyle = '#38bdf8'
  ctx.font = '700 18px system-ui, sans-serif'
  ctx.fillText('mj · creative engineer', 38, 38)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Compact OLED-style shelf / laptop HUD */
export function createShelfShowcaseScreenTexture(headline: string, sub: string): THREE.CanvasTexture {
  const w = 320
  const h = 200
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, '#0f172a')
  g.addColorStop(1, '#172554')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = 'rgba(148,163,184,0.35)'
  ctx.strokeRect(12, 12, w - 24, h - 24)
  ctx.fillStyle = '#f8fafc'
  ctx.font = '800 26px system-ui, sans-serif'
  ctx.fillText(headline, 28, 62)
  ctx.fillStyle = '#94a3b8'
  ctx.font = '500 15px system-ui, sans-serif'
  ctx.fillText(sub, 28, 96)
  ctx.fillStyle = 'rgba(52,211,153,0.85)'
  ctx.fillRect(28, 124, w - 56, 4)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Abstract print for frames — editorial gallery feel */
export function createGalleryPrintTexture(seed = 1): THREE.CanvasTexture {
  const w = 256
  const h = 320
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const baseHue = (seed * 47) % 360
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, `hsl(${baseHue}, 42%, 92%)`)
  bg.addColorStop(0.55, `hsl(${(baseHue + 40) % 360}, 38%, 88%)`)
  bg.addColorStop(1, `hsl(${(baseHue + 120) % 360}, 35%, 84%)`)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)
  for (let i = 0; i < 9; i++) {
    ctx.fillStyle = `hsla(${(baseHue + i * 28) % 360}, 55%, 58%, ${0.18 + (i % 3) * 0.06})`
    ctx.beginPath()
    ctx.arc(40 + (i % 3) * 88, 48 + Math.floor(i / 3) * 100, 22 + i * 3, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.strokeStyle = 'rgba(15,23,42,0.12)'
  ctx.lineWidth = 2
  ctx.strokeRect(18, 24, w - 36, h - 48)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Exterior signage — live stream / QR slab */
export function createLiveStreamPosterTexture(): THREE.CanvasTexture {
  const w = 512
  const h = 680
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#cbd5e1'
  ctx.lineWidth = 3
  ctx.strokeRect(14, 14, w - 28, h - 28)
  ctx.fillStyle = '#0f172a'
  ctx.font = '800 38px system-ui, sans-serif'
  ctx.fillText('LIVE-STREAM', 42, 72)
  ctx.font = '600 22px system-ui, sans-serif'
  ctx.fillStyle = '#475569'
  ctx.fillText('(STUDIO)', 42, 108)

  const qrSize = 210
  const qx = (w - qrSize) / 2
  const qy = 155
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(qx - 10, qy - 10, qrSize + 20, qrSize + 20)
  ctx.fillStyle = '#0f172a'
  const cells = 21
  const cs = qrSize / cells
  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const hash = ((row * 17 + col * 31 + row * col) % 7) / 7
      if (hash > 0.42 || row < 3 || col < 3 || row >= cells - 3 || col >= cells - 3) {
        if (((row + col + row * col) & 3) !== 0) ctx.fillRect(qx + col * cs, qy + row * cs, cs + 0.5, cs + 0.5)
      }
    }
  }
  ctx.fillStyle = '#64748b'
  ctx.font = '500 16px system-ui, sans-serif'
  ctx.fillText('Scan · mj creative engineer', 42, h - 52)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

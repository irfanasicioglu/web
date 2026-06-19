'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// @ts-expect-error – three postprocessing types come from the package itself
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// @ts-expect-error
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// @ts-expect-error
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

gsap.registerPlugin(ScrollTrigger)

interface ThreeRefs {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  composer: InstanceType<typeof EffectComposer> | null
  stars: THREE.Points[]
  nebula: THREE.Mesh | null
  mountains: THREE.Mesh[]
  animationId: number | null
  targetCameraX: number
  targetCameraY: number
  targetCameraZ: number
  locations: number[]
}

const SECTIONS = [
  { title: 'İRFAN',      line1: 'Spor, medya ve iş dünyasının', line2: 'kesişim noktasında bir vizyon.' },
  { title: 'AŞICIOĞLU', line1: 'Futboldan teknolojiye, fikirden', line2: 'ürüne uzanan bir evren.' },
]

function splitTitle(text: string) {
  return text.split('').map((char, i) => (
    <span key={i} className="title-char" style={{ display: 'inline-block' }}>
      {char === ' ' ? ' ' : char}
    </span>
  ))
}

export function HorizonHero() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const titleRef      = useRef<HTMLHeadingElement>(null)
  const subtitleRef   = useRef<HTMLDivElement>(null)
  const scrollProgRef = useRef<HTMLDivElement>(null)
  const menuRef       = useRef<HTMLDivElement>(null)

  const smoothCamPos  = useRef({ x: 0, y: 30, z: 100 })
  const [scrollPct,   setScrollPct]   = useState(0)
  const [curSection,  setCurSection]  = useState(0)
  const [isReady,     setIsReady]     = useState(false)
  const [heroOpacity, setHeroOpacity] = useState(1)
  const totalSections = SECTIONS.length

  const refs = useRef<ThreeRefs>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null,
    targetCameraX: 0, targetCameraY: 30, targetCameraZ: 100,
    locations: [],
  })

  // ── Three.js init ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return
    const r = refs.current

    // Scene
    r.scene = new THREE.Scene()
    r.scene.fog = new THREE.FogExp2(0x000000, 0.00025)

    // Camera
    r.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    r.camera.position.set(0, 20, 100)

    // Renderer
    r.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true })
    r.renderer.setSize(window.innerWidth, window.innerHeight)
    r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    r.renderer.toneMapping = THREE.ACESFilmicToneMapping
    r.renderer.toneMappingExposure = 0.5

    // Post-processing
    r.composer = new EffectComposer(r.renderer)
    r.composer.addPass(new RenderPass(r.scene, r.camera))
    r.composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85
    ))

    createStarField()
    createNebula()
    createMountains()
    createAtmosphere()
    captureLocations()
    animate()
    setIsReady(true)

    // Stars
    function createStarField() {
      for (let layer = 0; layer < 3; layer++) {
        const count = 5000
        const geo = new THREE.BufferGeometry()
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)
        const siz = new Float32Array(count)
        for (let j = 0; j < count; j++) {
          const radius = 200 + Math.random() * 800
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(Math.random() * 2 - 1)
          pos[j*3]   = radius * Math.sin(phi) * Math.cos(theta)
          pos[j*3+1] = radius * Math.sin(phi) * Math.sin(theta)
          pos[j*3+2] = radius * Math.cos(phi)
          const c = new THREE.Color()
          const rnd = Math.random()
          if (rnd < 0.7)      c.setHSL(0,    0,   0.8 + Math.random() * 0.2)
          else if (rnd < 0.9) c.setHSL(0.08, 0.5, 0.8)
          else                c.setHSL(0.6,  0.5, 0.8)
          col[j*3] = c.r; col[j*3+1] = c.g; col[j*3+2] = c.b
          siz[j] = Math.random() * 2 + 0.5
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
        geo.setAttribute('size',     new THREE.BufferAttribute(siz, 1))
        const mat = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: layer } },
          vertexShader: `
            attribute float size; attribute vec3 color; varying vec3 vColor;
            uniform float time; uniform float depth;
            void main(){
              vColor = color; vec3 p = position;
              float a = time*0.05*(1.0-depth*0.3);
              mat2 rot = mat2(cos(a),-sin(a),sin(a),cos(a));
              p.xy = rot*p.xy;
              vec4 mv = modelViewMatrix*vec4(p,1.0);
              gl_PointSize = size*(300.0/-mv.z);
              gl_Position = projectionMatrix*mv;
            }`,
          fragmentShader: `
            varying vec3 vColor;
            void main(){
              float d = length(gl_PointCoord-vec2(0.5));
              if(d>0.5)discard;
              gl_FragColor = vec4(vColor, 1.0-smoothstep(0.0,0.5,d));
            }`,
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        })
        const stars = new THREE.Points(geo, mat)
        r.scene!.add(stars)
        r.stars.push(stars)
      }
    }

    // Nebula
    function createNebula() {
      const geo = new THREE.PlaneGeometry(8000, 4000, 100, 100)
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv; varying float vEl; uniform float time;
          void main(){
            vUv=uv; vec3 p=position;
            float el=sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;
            p.z+=el; vEl=el;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
          }`,
        fragmentShader: `
          uniform vec3 color1,color2; uniform float opacity,time;
          varying vec2 vUv; varying float vEl;
          void main(){
            float mx=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
            vec3 c=mix(color1,color2,mx*0.5+0.5);
            float a=opacity*(1.0-length(vUv-0.5)*2.0);
            a*=1.0+vEl*0.01;
            gl_FragColor=vec4(c,a);
          }`,
        transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
      })
      const neb = new THREE.Mesh(geo, mat)
      neb.position.z = -1050
      r.scene!.add(neb)
      r.nebula = neb
    }

    // Mountains
    function createMountains() {
      const layers = [
        { distance: -50,  height: 60,  color: 0x1a1a2e, opacity: 1   },
        { distance: -100, height: 80,  color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
      ]
      layers.forEach((layer, idx) => {
        const pts: THREE.Vector2[] = []
        for (let i = 0; i <= 50; i++) {
          const x = (i/50 - 0.5) * 1000
          const y = Math.sin(i*0.1)*layer.height + Math.sin(i*0.05)*layer.height*0.5
                  + Math.random()*layer.height*0.2 - 100
          pts.push(new THREE.Vector2(x, y))
        }
        pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300))
        const shape = new THREE.Shape(pts)
        const geo = new THREE.ShapeGeometry(shape)
        const mat = new THREE.MeshBasicMaterial({
          color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide,
        })
        const m = new THREE.Mesh(geo, mat)
        m.position.z = layer.distance
        m.position.y = layer.distance
        m.userData = { baseZ: layer.distance, index: idx }
        r.scene!.add(m)
        r.mountains.push(m)
      })
    }

    // Atmosphere glow
    function createAtmosphere() {
      const geo = new THREE.SphereGeometry(600, 32, 32)
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vN,vP;
          void main(){ vN=normalize(normalMatrix*normal); vP=position;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `
          varying vec3 vN; uniform float time;
          void main(){
            float i=pow(0.7-dot(vN,vec3(0,0,1)),2.0);
            vec3 a=vec3(0.3,0.6,1.0)*i;
            a*=sin(time*2.0)*0.1+0.9;
            gl_FragColor=vec4(a,i*0.25);
          }`,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
      })
      r.scene!.add(new THREE.Mesh(geo, mat))
    }

    function captureLocations() {
      r.locations = r.mountains.map(m => m.position.z)
    }

    function animate() {
      r.animationId = requestAnimationFrame(animate)
      const time = Date.now() * 0.001
      r.stars.forEach(s => { if ((s.material as THREE.ShaderMaterial).uniforms) (s.material as THREE.ShaderMaterial).uniforms.time.value = time })
      if (r.nebula) (r.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5
      if (r.camera) {
        const sf = 0.05
        smoothCamPos.current.x += (r.targetCameraX - smoothCamPos.current.x) * sf
        smoothCamPos.current.y += (r.targetCameraY - smoothCamPos.current.y) * sf
        smoothCamPos.current.z += (r.targetCameraZ - smoothCamPos.current.z) * sf
        r.camera.position.x = smoothCamPos.current.x + Math.sin(time*0.1)*2
        r.camera.position.y = smoothCamPos.current.y + Math.cos(time*0.15)*1
        r.camera.position.z = smoothCamPos.current.z
        r.camera.lookAt(0, 10, -600)
      }
      r.mountains.forEach((m, i) => {
        const pf = 1 + i * 0.5
        m.position.x = Math.sin(time*0.1)*2*pf
        m.position.y = 50 + Math.cos(time*0.15)*pf
      })
      r.composer?.render()
    }

    const onResize = () => {
      if (!r.camera || !r.renderer || !r.composer) return
      r.camera.aspect = window.innerWidth / window.innerHeight
      r.camera.updateProjectionMatrix()
      r.renderer.setSize(window.innerWidth, window.innerHeight)
      r.composer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (r.animationId) cancelAnimationFrame(r.animationId)
      window.removeEventListener('resize', onResize)
      r.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose() })
      r.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose() })
      if (r.nebula) { r.nebula.geometry.dispose(); (r.nebula.material as THREE.Material).dispose() }
      r.renderer?.dispose()
    }
  }, [])

  // ── GSAP entrance ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return
    const tl = gsap.timeline()
    if (menuRef.current) tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' })
    if (titleRef.current) {
      tl.from(titleRef.current.querySelectorAll('.title-char'), {
        y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out',
      }, '-=0.5')
    }
    if (subtitleRef.current) {
      tl.from(subtitleRef.current.querySelectorAll('.subtitle-line'), {
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      }, '-=0.8')
    }
    if (scrollProgRef.current) tl.from(scrollProgRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5')
    return () => { tl.kill() }
  }, [isReady])

  // ── Scroll handling ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const r = refs.current
      const scrollY = window.scrollY
      const containerHeight = (totalSections + 1) * window.innerHeight
      const maxScroll = containerHeight - window.innerHeight
      const progress = Math.min(scrollY / maxScroll, 1)
      // Son %30'luk scroll aralığında yavaşça soldur
      const fadeStart = maxScroll * 0.7
      const fadeLen   = maxScroll * 0.3
      const opacity   = scrollY <= fadeStart ? 1 : Math.max(0, 1 - (scrollY - fadeStart) / fadeLen)
      setHeroOpacity(opacity)
      setScrollPct(progress)
      const newSection = Math.min(Math.floor(progress * totalSections), totalSections - 1)
      setCurSection(newSection)
      const totalProg = progress * totalSections
      const secProg = totalProg % 1
      const camPositions = [
        { x: 0, y: 30,  z: 300  },
        { x: 0, y: 40,  z: -50  },
        { x: 0, y: 50,  z: -700 },
      ]
      const cur  = camPositions[newSection]  ?? camPositions[0]
      const next = camPositions[newSection + 1] ?? cur
      r.targetCameraX = cur.x + (next.x - cur.x) * secProg
      r.targetCameraY = cur.y + (next.y - cur.y) * secProg
      r.targetCameraZ = cur.z + (next.z - cur.z) * secProg
      r.mountains.forEach((m, i) => {
        const speed = 1 + i * 0.9
        if (progress > 0.7) { m.position.z = 600000 }
        else { m.position.z = r.locations[i] }
        if (r.nebula) r.nebula.position.z = m.position.z
      })
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [totalSections])

  const sec = SECTIONS[curSection] ?? SECTIONS[0]

  return (
    <div ref={containerRef} style={{ position: 'relative', height: `${(totalSections + 1) * 100}vh` }}>
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 2, pointerEvents: 'none', opacity: heroOpacity, transition: 'opacity 0.15s ease-out' }}
      />

      {/* Side decoration */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed', left: '2rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-roboto)',
          opacity: heroOpacity, transition: 'opacity 0.15s ease-out', pointerEvents: heroOpacity === 0 ? 'none' : 'auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 22, height: 1, background: 'rgba(255,255,255,0.5)' }} />)}
        </div>
        <span style={{ writingMode: 'vertical-rl', fontSize: 10, letterSpacing: '0.3em' }}>SPACE</span>
      </div>

      {/* Hero text — fixed during scroll */}
      <div
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5, textAlign: 'center', pointerEvents: 'none',
          opacity: heroOpacity, transition: 'opacity 0.15s ease-out',
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(56px, 12vw, 148px)',
            fontWeight: 900, color: 'white',
            letterSpacing: '-0.02em', lineHeight: 0.9,
            fontFamily: 'var(--font-roboto)', overflow: 'hidden',
          }}
        >
          {splitTitle(sec.title)}
        </h1>
        <div
          ref={subtitleRef}
          style={{
            marginTop: '1.5rem', color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(12px, 1.4vw, 16px)',
            letterSpacing: '0.1em', fontFamily: 'var(--font-roboto)',
          }}
        >
          <p className="subtitle-line">{sec.line1}</p>
          <p className="subtitle-line">{sec.line2}</p>
        </div>
      </div>

      {/* Scroll progress */}
      <div
        ref={scrollProgRef}
        style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', alignItems: 'center', gap: '1rem',
          color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-roboto)', fontSize: 10, letterSpacing: '0.3em',
          opacity: heroOpacity, transition: 'opacity 0.15s ease-out', pointerEvents: heroOpacity === 0 ? 'none' : 'auto',
        }}
      >
        <span>SCROLL</span>
        <div style={{ width: 120, height: 1, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${scrollPct * 100}%`, background: 'rgba(255,255,255,0.6)', transition: 'width 0.1s ease-out' }} />
        </div>
        <span>{String(curSection + 1).padStart(2,'0')} / {String(totalSections).padStart(2,'0')}</span>
      </div>
    </div>
  )
}

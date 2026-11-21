'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Hero.module.css';

/**
 * ParticleField renders a transparent, additive-blended layer of warm
 * orange + cool-white "bokeh" particles that drift on slow sine-wave
 * paths, with a subtle mouse-parallax camera shift. Sits above the video
 * layers and below the text content (see z-index stack in Hero.module.css).
 */
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ---- Scene / camera / renderer ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // Cap pixel ratio for performance — bokeh doesn't need retina crispness
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // ---- Particle geometry ----
    const COUNT = 90;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT); // random phase offsets for sine motion
    const scales = new Float32Array(COUNT);
    const warmth = new Float32Array(COUNT); // 0 = white/blue, 1 = warm orange

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      seeds[i] = Math.random() * Math.PI * 2;
      scales[i] = 0.5 + Math.random() * 1.8;
      warmth[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aWarmth', new THREE.BufferAttribute(warmth, 1));

    // Soft circular sprite generated on a canvas (cheap radial-gradient "bokeh")
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: spriteTexture },
        uEmberColor: { value: new THREE.Color('#ff8a3d') },
        uCoolColor: { value: new THREE.Color('#bcd6ff') },
      },
      vertexShader: `
        attribute float aSeed;
        attribute float aScale;
        attribute float aWarmth;
        uniform float uTime;
        varying float vWarmth;
        varying float vFade;

        void main() {
          vWarmth = aWarmth;

          vec3 pos = position;
          // Slow independent sine-wave drift per axis
          pos.x += sin(uTime * 0.15 + aSeed) * 0.6;
          pos.y += cos(uTime * 0.12 + aSeed * 1.7) * 0.5;
          pos.z += sin(uTime * 0.1 + aSeed * 2.3) * 0.8;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          // Gentle depth-based fade for atmosphere
          vFade = smoothstep(14.0, 2.0, -mvPosition.z);

          gl_PointSize = aScale * 46.0 * (8.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uEmberColor;
        uniform vec3 uCoolColor;
        varying float vWarmth;
        varying float vFade;

        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          vec3 color = mix(uCoolColor, uEmberColor, vWarmth);
          float alpha = tex.a * 0.55 * vFade;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---- Mouse parallax ----
    const pointer = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    // ---- Resize handling ----
    function handleResize() {
      if (!mount) return;
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }
    window.addEventListener('resize', handleResize);

    // ---- Render loop ----
    let rafId = 0;
    const clock = new THREE.Clock();

    function animate() {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;

      if (!prefersReducedMotion) {
        targetCamera.x += (pointer.x * 0.6 - targetCamera.x) * 0.03;
        targetCamera.y += (-pointer.y * 0.4 - targetCamera.y) * 0.03;
        camera.position.x = targetCamera.x;
        camera.position.y = targetCamera.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.particleLayer} aria-hidden="true" />;
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const themes = { home: 0x1677e8, detection: 0x35a7ff, systems: 0x55b7ff, clients: 0x2b8ff1, resources: 0x67b9ff, about: 0x7bc8ff, quote: 0xff5664, contact: 0x22b58a, facility: 0x1677e8 };

export default function ProtectionScene({ className = '', variant = 'facility' }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer = null;
    let raf = 0;
    let resizeObserver = null;
    let stopped = false;
    try {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
      if (!window.WebGLRenderingContext) throw new Error('WebGL unavailable');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.45, 8.2);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);
      const color = themes[variant] || themes.facility;
      const metal = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.38, wireframe: true });
      const glow = new THREE.MeshBasicMaterial({ color: 0xeaf6ff, transparent: true, opacity: 0.88 });
      const soft = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
      const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 2), metal);
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 1), glow);
      group.add(shell, core);
      const rings = [];
      [1.95, 2.35, 2.75].forEach((r, i) => {
        const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.012, r + 0.012, 96), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22 - i * 0.04, side: THREE.DoubleSide }));
        ring.rotation.x = Math.PI / 2; ring.rotation.z = i * 0.38; group.add(ring); rings.push(ring);
      });
      const pipeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.32 });
      const pipeGroup = new THREE.Group();
      const pipeGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.8, 12);
      for (let i = 0; i < 7; i++) { const pipe = new THREE.Mesh(pipeGeo, pipeMat); pipe.position.set(-2.5 + i * 0.82, -2.1, (i % 2 ? 0.25 : -0.1)); pipe.rotation.z = Math.PI / 2; pipeGroup.add(pipe); }
      group.add(pipeGroup);
      const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xeaf6ff });
      for (let i = 0; i < 9; i++) { const node = new THREE.Mesh(nodeGeo, nodeMat); const a = (i / 9) * Math.PI * 2; node.position.set(Math.cos(a) * 2.55, Math.sin(a) * 1.15, Math.sin(a) * 0.55); group.add(node); }
      const floor = new THREE.Mesh(new THREE.CircleGeometry(3.7, 64), soft); floor.rotation.x = -Math.PI / 2; floor.position.y = -2.45; group.add(floor);

      const onResize = () => { const w = mount.clientWidth || 1, h = mount.clientHeight || 1; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer?.setSize(w, h, false); };
      onResize();
      if (typeof ResizeObserver !== 'undefined') { resizeObserver = new ResizeObserver(onResize); resizeObserver.observe(mount); } else window.addEventListener('resize', onResize);
      let frame = 0;
      const animate = () => {
        if (stopped) return;
        try {
          if (!reduce) { group.rotation.y += 0.0017; group.rotation.x = Math.sin(frame * 0.003) * 0.035; shell.rotation.z -= 0.0008; core.rotation.y += 0.0032; rings.forEach((ring, i) => { ring.rotation.z += 0.0007 + i * 0.00025; }); pipeGroup.position.y = Math.sin(frame * 0.004) * 0.035; }
          renderer.render(scene, camera);
          frame += 1;
          raf = requestAnimationFrame(animate);
        } catch (error) { console.warn('3D scene paused safely:', error); stopped = true; }
      };
      raf = requestAnimationFrame(animate);
      return () => {
        stopped = true; cancelAnimationFrame(raf); resizeObserver?.disconnect(); window.removeEventListener('resize', onResize);
        try { if (renderer?.domElement?.parentNode === mount) mount.removeChild(renderer.domElement); } catch {}
        shell.geometry.dispose(); core.geometry.dispose(); floor.geometry.dispose(); pipeGeo.dispose(); nodeGeo.dispose(); metal.dispose(); glow.dispose(); soft.dispose(); pipeMat.dispose(); nodeMat.dispose(); rings.forEach(r => r.material.dispose()); renderer?.dispose();
      };
    } catch (error) {
      console.warn('3D scene unavailable; continuing with the page UI:', error);
      mount.dataset.threeFallback = 'true';
      return () => { stopped = true; cancelAnimationFrame(raf); resizeObserver?.disconnect(); if (renderer?.domElement?.parentNode === mount) mount.removeChild(renderer.domElement); };
    }
  }, [variant]);
  return <div ref={mountRef} className={`three-canvas ${className}`} aria-hidden='true'/>;
}

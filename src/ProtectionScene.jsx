import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProtectionScene({ className='' }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.35, 6.5);
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const material = new THREE.MeshBasicMaterial({ color:0x1677e8, wireframe:true, transparent:true, opacity:.42 });
    const coreMaterial = new THREE.MeshBasicMaterial({ color:0x8ed9ff, transparent:true, opacity:.72 });
    const outer = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 2), material);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.78, 1), coreMaterial);
    group.add(outer, inner);

    const ringMat = new THREE.MeshBasicMaterial({ color:0x1677e8, transparent:true, opacity:.28, side:THREE.DoubleSide });
    [1.95,2.35].forEach((r,i)=>{ const ring=new THREE.Mesh(new THREE.RingGeometry(r-.012,r+.012,96),ringMat); ring.rotation.x=Math.PI/2; ring.rotation.z=i*.45; group.add(ring); });
    const points=[];
    for(let i=0;i<28;i++){ const a=(i/28)*Math.PI*2; points.push(new THREE.Vector3(Math.cos(a)*2.65, (i%2?0.08:-0.08), Math.sin(a)*2.65)); }
    const geo=new THREE.BufferGeometry().setFromPoints(points);
    const line=new THREE.LineLoop(geo,new THREE.LineBasicMaterial({color:0x8ed9ff,transparent:true,opacity:.22}));
    group.add(line);

    const onResize=()=>{ const w=mount.clientWidth||1,h=mount.clientHeight||1; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h,false); };
    onResize(); window.addEventListener('resize',onResize);
    let frame=0;
    const animate=()=>{
      if(!reduce){ group.rotation.y += .0024; group.rotation.x = Math.sin(frame*.004)*.045; outer.rotation.z -= .0012; inner.rotation.y += .004; }
      renderer.render(scene,camera); frame++;
      raf=requestAnimationFrame(animate);
    };
    let raf=requestAnimationFrame(animate);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',onResize); mount.removeChild(renderer.domElement); outer.geometry.dispose(); inner.geometry.dispose(); geo.dispose(); ringMat.dispose(); material.dispose(); coreMaterial.dispose(); renderer.dispose(); };
  }, []);
  return <div ref={mountRef} className={`three-canvas ${className}`} aria-hidden='true'/>;
}

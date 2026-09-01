import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uBackgroundTexture; 
uniform vec4 resolution;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  
  vec2 dir = offset.rg;
  
  // Professional, subtle chromatic aberration
  float r = texture2D(uBackgroundTexture, uv - 0.02 * dir).r;
  float g = texture2D(uBackgroundTexture, uv - 0.015 * dir).g;
  float b = texture2D(uBackgroundTexture, uv - 0.01 * dir).b;
  float a = texture2D(uBackgroundTexture, uv).a;
  
  gl_FragColor = vec4(r, g, b, a);
}`;

const GridDistortion = ({ 
  grid = 55, 
  mouse = 0.12, 
  strength = 0.15, 
  relaxation = 0.96, 
  imageSrc, 
  backgroundImageSrc, // Handled for compatibility with LandingPage
  personalImageSrc,   // Handled for compatibility with LandingPage
  className = '' 
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planeRef = useRef(null);
  const backgroundAspectRef = useRef(1);
  const animationIdRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uBackgroundTexture: { value: null }, 
      uDataTexture: { value: null }
    };

    const textureLoader = new THREE.TextureLoader();
    const targetImageSrc = imageSrc || backgroundImageSrc;
    
    if (targetImageSrc) {
      textureLoader.load(targetImageSrc, texture => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        backgroundAspectRef.current = texture.image.width / texture.image.height;
        uniforms.uBackgroundTexture.value = texture; 
        handleResize();
      });
    }

    // Load secondary image if provided (to prevent warnings)
    if (personalImageSrc) {
        textureLoader.load(personalImageSrc, () => {});
    }

    const size = grid;
    const data = new Float32Array(4 * size * size);
    data.fill(0); // Initialize at 0 to prevent initial glitch
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;
    scene.add(plane);

    const handleResize = () => {
      if (!container || !renderer || !camera || !planeRef.current) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const containerAspect = width / height;
      renderer.setSize(width, height);

      const imageAspect = backgroundAspectRef.current;
      
      // Scale plane to cover the screen exactly like object-fit: cover
      if (containerAspect > imageAspect) {
        planeRef.current.scale.set(containerAspect, containerAspect / imageAspect, 1);
      } else {
        planeRef.current.scale.set(imageAspect / containerAspect, 1, 1);
      }

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
      uniforms.resolution.value.set(width, height, 1, 1);
    };

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;
    } else {
      window.addEventListener('resize', handleResize);
    }

    const pointer = {
      x: 0, y: 0,
      targetX: 0, targetY: 0,
      isInside: false
    };

    const handleMouseMove = e => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      
      // Exact calculation to map screen coordinates to the scaled plane's UV coordinates
      // This guarantees the distortion happens exactly under the mouse tip
      if (planeRef.current && cameraRef.current) {
        const containerAspect = rect.width / rect.height;
        const frustumWidth = containerAspect;
        const frustumHeight = 1;

        const worldX = (x - 0.5) * frustumWidth;
        const worldY = (y - 0.5) * frustumHeight;

        const planeW = planeRef.current.scale.x;
        const planeH = planeRef.current.scale.y;

        const uvX = (worldX / planeW) + 0.5;
        const uvY = (worldY / planeH) + 0.5;

        pointer.targetX = uvX;
        pointer.targetY = uvY;
      }

      pointer.isInside = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
    };

    const handleMouseLeave = () => {
      pointer.isInside = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    handleResize();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (!renderer || !scene || !camera) return;

      const data = dataTexture.image.data;
      
      // Decay previous forces
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }
      
      // Calculate instantaneous velocity to prevent lag
      const vX = pointer.targetX - pointer.x;
      const vY = pointer.targetY - pointer.y;
      
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;

      if (pointer.isInside && (Math.abs(vX) > 0.0001 || Math.abs(vY) > 0.0001)) {
        const gridMouseX = size * pointer.x;
        const gridMouseY = size * pointer.y;
        const maxDist = size * mouse;
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
            if (distSq < maxDist * maxDist && distSq > 0) {
              const index = 4 * (i + size * j);
              const dist = Math.sqrt(distSq);
              const power = Math.min(maxDist / dist, 10);
              
              // Apply instantaneous force
              data[index] += strength * 100 * vX * power;
              data[index + 1] -= strength * 100 * vY * power;
            }
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else window.removeEventListener('resize', handleResize);
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (dataTexture) dataTexture.dispose();
      if (uniforms.uBackgroundTexture.value) uniforms.uBackgroundTexture.value.dispose();
    };
  }, [grid, mouse, strength, relaxation, imageSrc, backgroundImageSrc, personalImageSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%', height: '100%', minWidth: '0', minHeight: '0', pointerEvents: 'none' }} // Pointer events none so it doesn't block UI
    />
  );
};

export default GridDistortion;
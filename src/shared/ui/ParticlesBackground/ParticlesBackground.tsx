import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './ParticlesBackground.module.css'

interface Uniforms {
    u_time: { value: number };
    u_gridSize: { value: number };
    u_color: { value: THREE.Color };
}

const ParticlesBackground: React.FC = () => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    // Добавляем ref для отслеживания инициализации
    const isInitializedRef = useRef(false);

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const particlesMeshRef = useRef<THREE.Points | null>(null);
    const animationIdRef = useRef<number | null>(null);

    const uniformsRef = useRef<Uniforms>({
        u_time: { value: 0 },
        u_gridSize: { value: 25 },
        u_color: { value: new THREE.Color() },
    });

    const getVibrantColor = (): THREE.Color => {
        const hue = Math.random();
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.4;
        return new THREE.Color().setHSL(hue, saturation, lightness);
    };

    const initScene = () => {
        // Если уже инициализирован, выходим
        if (isInitializedRef.current) return;

        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        cameraRef.current.position.z = 15;

        rendererRef.current = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            premultipliedAlpha: false,
        });

        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setClearColor(0x000000, 0);

        if (canvasContainerRef.current) {
            canvasContainerRef.current.appendChild(rendererRef.current.domElement);
        }

        isInitializedRef.current = true;
    };

    const initParticles = () => {
        if (!sceneRef.current) return;

        const PARTICLE_COUNT = 1000;
        const SPHERE_RADIUS = 15;

        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(PARTICLE_COUNT * 3);
        const randomArray = new Float32Array(PARTICLE_COUNT * 4);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = SPHERE_RADIUS * (0.9 + Math.random() * 0.1);

            posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i * 3 + 2] = radius * Math.cos(phi);

            randomArray[i * 4] = Math.random() * 10.0;
            randomArray[i * 4 + 1] = 0.5 + Math.random() * 2.0;
            randomArray[i * 4 + 2] = Math.random() * 0.5 + 0.5;
            randomArray[i * 4 + 3] = 5.0 + Math.random() * 15.0;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3)
        );
        particlesGeometry.setAttribute(
            'aRandom',
            new THREE.BufferAttribute(randomArray, 4)
        );

        uniformsRef.current.u_color.value = getVibrantColor();

        const vertexShader = `
      attribute vec4 aRandom;
      varying vec4 vRandom;
      varying vec2 vUv;

      void main() {
        vRandom = aRandom;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = vRandom.w;
      }
    `;

        const fragmentShader = `
      uniform float u_time;
      uniform vec3 u_color;
      varying vec4 vRandom;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
        float delay = vRandom.x;
        float speed = vRandom.y;
        float intensity = vRandom.z;

        float flicker = sin(u_time * speed + delay) * 0.3 + 0.7;
        flicker = pow(flicker, 2.0) * intensity;

        float fadeIn = smoothstep(0.0, 3.0, u_time - delay * 0.5);

        float pulse = smoothstep(0.8, 1.0, random(vec2(delay, floor(u_time * 0.5))));
        flicker = mix(flicker, 1.0, pulse * 0.7);

        vec2 coord = gl_PointCoord - vec2(0.5);
        float distance = length(coord);
        float alpha = exp(-distance * distance * 4.0) * fadeIn;

        if (distance > 0.5) discard;

        vec3 color = u_color * flicker;
        color = clamp(color, vec3(0.3), vec3(1.0));

        gl_FragColor = vec4(color, alpha * 0.95);
      }
    `;

        const particlesMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: uniformsRef.current,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
        });

        particlesMeshRef.current = new THREE.Points(particlesGeometry, particlesMaterial);
        sceneRef.current.add(particlesMeshRef.current);

        gsap.to(uniformsRef.current.u_time, {
            value: 10,
            duration: 10,
            ease: 'none',
        });
    };

    const animate = () => {
        // Проверяем, что компонент все еще смонтирован
        if (!isInitializedRef.current) return;

        animationIdRef.current = requestAnimationFrame(animate);

        if (uniformsRef.current) {
            uniformsRef.current.u_time.value += 0.01;
        }

        if (particlesMeshRef.current) {
            particlesMeshRef.current.rotation.y += 0.0005;
            particlesMeshRef.current.rotation.x += 0.0003;
        }

        if (uniformsRef.current &&
            Math.floor(uniformsRef.current.u_time.value) % 5 === 0 &&
            uniformsRef.current.u_time.value % 1 < 0.02) {
            uniformsRef.current.u_color.value = getVibrantColor();
        }

        if (sceneRef.current && cameraRef.current && rendererRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };

    const handleResize = () => {
        if (cameraRef.current && rendererRef.current) {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        }
    };

    const cleanup = () => {
        // Останавливаем анимацию
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
        }

        // Очищаем Three.js объекты
        if (particlesMeshRef.current) {
            if (sceneRef.current) {
                sceneRef.current.remove(particlesMeshRef.current);
            }
            particlesMeshRef.current.geometry.dispose();
            if (particlesMeshRef.current.material instanceof THREE.Material) {
                particlesMeshRef.current.material.dispose();
            }
            particlesMeshRef.current = null;
        }

        if (rendererRef.current && canvasContainerRef.current) {
            if (rendererRef.current.domElement &&
                rendererRef.current.domElement.parentNode === canvasContainerRef.current) {
                canvasContainerRef.current.removeChild(rendererRef.current.domElement);
            }
            rendererRef.current.dispose();
            rendererRef.current = null;
        }

        sceneRef.current = null;
        cameraRef.current = null;
        isInitializedRef.current = false;
    };

    useEffect(() => {
        // Инициализируем только если еще не инициализирован
        if (!isInitializedRef.current) {
            initScene();
            initParticles();
            animate();
            window.addEventListener('resize', handleResize);
        }

        return () => {
            cleanup();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={canvasContainerRef}
            className={styles.particlesContainer}
        />
    );
};

export default ParticlesBackground;

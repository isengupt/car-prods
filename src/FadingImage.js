import * as THREE from "three"
import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import img1 from "./img/Ice1.jpg"
import img2 from "./img/Ice2.jpeg"
import disp from "./img/disp1.jpgdis.jpg"
import "./ImageFadeMaterial"

function FadingImage() {
  const ref = useRef()
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [img1, img2, disp])
  const [hovered, setHover] = useState(false)
  useFrame(() => (ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.1)))
  return (
    <mesh onPointerMove={(e) => setHover(true)} onPointerOut={(e) => setHover(false)} scale={[3, 3, 1]}>
      <planeBufferGeometry attach="geometry" />
      <imageFadeMaterial ref={ref} attach="material" tex={texture1} tex2={texture2} disp={dispTexture} />
    </mesh>
  )
}

export default function FadeImage() {
  return (
    <Canvas>
      <ambientLight intensity={0.85} />
      <Suspense fallback={null}>
        <FadingImage />
      </Suspense>
    </Canvas>
  )
}

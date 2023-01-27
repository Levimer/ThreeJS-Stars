import React, { useMemo, useRef } from 'react'
import * as THREE from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';
import { useFrame } from '@react-three/fiber';

const ExampleShader = () => {

  const positions = getRandomPointsOnRing(96, 33, 3, 128000)

  const pointSizes = getPointSizes(110.0, 120.0, 128000);
  
  const randomX = getRandomX(128000);
  const randomY = getRandomY(128000);
  const randomZ = getRandomZ(128000);
  const randomW = getRandomW(128000);

  const gPoints = useRef();


  const uniforms = useMemo(() => ({

      uTime: {
        value: 0.0
      },
      uPointSizes: {
        value: pointSizes
      },
      uResolutionWidth: {
        value: screen.width
      },
      uResolutionHeight: {
        value: screen.height
      }
  
    }), [])


  useFrame((state) => {
  const { clock } = state;

  gPoints.current.material.uniforms.uTime.value = clock.elapsedTime;

  gPoints.current.rotation.y -= 0.0002;
  gPoints.current.rotation.z = 0.33;


  });



  // function to create array of points in a ring shape
  function getRandomPointsOnRing(radiusOuterEdge, radiusInnerEdge, discHeight, pointsAmount){
    console.log('function call')
    let x = [];
    let y; 

    for (let i = 1; i <= pointsAmount; i++) {

        // random variables
        let rand = Math.random();
        let radius = Math.sqrt(radiusOuterEdge * radiusOuterEdge * rand + (1 - rand) * radiusInnerEdge * radiusInnerEdge);
        let height = discHeight; // height of the ring
        let randomHeight = height* Math.random()- height/2; //generating random height 

         // Create vec3
        let randomVec = new THREE.Vector3();
        randomVec.setFromSphericalCoords(radius, Math.PI * 0.5, Math.random() * 2 * Math.PI);
        randomVec.y += randomHeight;

        let randomVecX = randomVec.x
        let randomVecY = randomVec.y
        let randomVecZ = randomVec.z

        x.push(randomVecX, randomVecY, randomVecZ);

        if(i == pointsAmount){
            y = new Float32Array(x);
        }
    }
    return y;
  }



  // function to create arra of point sizes
  function getPointSizes(min, max, pointsAmount){

    let pointSizes  = new Array(pointsAmount);

    // Fill the array with random floats between 0.0 and 5.0
    for (let i = 0; i < pointSizes.length; i++) {
      pointSizes[i] = Math.random() * (min - max) + min;
    }
    let pointSizes2 = new Float32Array(pointSizes)
    return pointSizes2;
  }



  // function to create array of random values X
  function getRandomX(pointsAmount){

    let randomValues  = new Array(pointsAmount);

    // Fill the array with random floats
    for (let i = 0; i < randomValues.length; i++) {
      randomValues[i] = Math.random() * Math.PI;
      //console.log(' ------------------ THIS GUY ---------'+i)
    }
    let randomValues2 = new Float32Array(randomValues)
    console.log('x => '+randomValues2)
  return randomValues2;
  }


  // function to create array of random values Y
  function getRandomY(pointsAmount){

    let randomValues  = new Array(pointsAmount);

    // Fill the array with random floats
    for (let i = 0; i < randomValues.length; i++) {
      randomValues[i] = Math.random() * Math.PI * 2;
      //console.log(' ------------------ THIS GUY ---------'+i)
    }
    let randomValues2 = new Float32Array(randomValues)
    console.log('y => '+randomValues2)
  return randomValues2;
  }



// function to create array of random values Z
function getRandomZ(pointsAmount){

  let randomValues  = new Array(pointsAmount);

  // Fill the array with random floats
  for (let i = 0; i < randomValues.length; i++) {
    randomValues[i] = (Math.random() * 0.9 + 0.1) * Math.PI * 0.1;
    //console.log(' ------------------ THIS GUY ---------'+i)
  }
  let randomValues2 = new Float32Array(randomValues)
  console.log('z => '+randomValues2)
return randomValues2;
}



  // function to create array of random values W
  function getRandomW(pointsAmount){

    let randomValues  = new Array(pointsAmount);

    // Fill the array with random floats
    for (let i = 0; i < randomValues.length; i++) {
      randomValues[i] = Math.random() * 0.9 + 0.1;
      //console.log(' ------------------ THIS GUY ---------'+i)
    }
    let randomValues2 = new Float32Array(randomValues)
    console.log('w => '+randomValues2)
  return randomValues2;
  }


  return (

    <points ref={gPoints}>
      <bufferGeometry attach="geometry">
      <bufferAttribute
                attach="attributes-position"
                count={positions.length / 3}
                array={positions}
                itemSize={3}
                usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute 
                attach="attributes-pointSizes"
                count={pointSizes.length / 1}
                array={pointSizes}
                itemSize={1}
                usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute 
                attach="attributes-randomX"
                count={randomX.length / 1}
                array={randomX}
                itemSize={1}
                usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute 
                attach="attributes-randomY"
                count={randomY.length / 1}
                array={randomY}
                itemSize={1}
                usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute 
                attach="attributes-randomZ"
                count={randomZ.length / 1}
                array={randomZ}
                itemSize={1}
                usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute 
                attach="attributes-randomW"
                count={randomW.length / 1}
                array={randomW}
                itemSize={1}
                usage={THREE.DynamicDrawUsage}
            />
      </bufferGeometry>
      <shaderMaterial
          depthWrite={false}
          depthTest={false}
          transparent={true}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
      />
    </points>

  )
}

export default ExampleShader
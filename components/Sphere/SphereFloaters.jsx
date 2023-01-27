import React, { useMemo, useRef } from 'react'
import * as THREE from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';
import { useFrame } from '@react-three/fiber';

const SphereFloaters = () => {
 
    const positions = getRandomPointsOnSphere(60000, 20, 22)

    const pointSizes = getPointSizes(120.0, 130.0, 60000);
    
    const randomX = getRandomX(60000);
    const randomY = getRandomY(60000);
    const randomZ = getRandomZ(60000);
    const randomW = getRandomW(60000);

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
    gPoints.current.rotation.z = 0.1;


    });

    
    // function to get array for points on a sphere
    function getRandomPointsOnSphere(pointsAmount, minThickness, maxThickness){

        let x = [];
        let y;
        let randomLength;
        let randomVecX;
        let randomVecY;
        let randomVecZ;

        for (let i = 1; i <= pointsAmount; i++) {

            randomLength = Math.random() * (maxThickness - minThickness) + minThickness;

             // Create vec3
            let randomVec = new THREE.Vector3();
            randomVec.randomDirection().setLength(randomLength);

            randomVecX = randomVec.x
            randomVecY = randomVec.y
            randomVecZ = randomVec.z


            x.push(randomVecX, randomVecY, randomVecZ);

            if(i == pointsAmount){
                y = new Float32Array(x)
            }

        }

        return y;
    }



  // function to create arra of point sizes
  function getPointSizes(min, max, pointsAmount){

    let pointSizes  = new Array(pointsAmount);

    // Fill the array with random floats between 0.0 and 5.0
    for (let i = 0; i < pointSizes.length; i++) {
      pointSizes[i] = Math.random() * (max - min) + min;
      //console.log(' ------------------ THIS GUY ---------'+i)
    }
    let pointSizes2 = new Float32Array(pointSizes)
    console.log(pointSizes2)
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
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={uniforms}
            blending={THREE.AdditiveBlending}
        />
    </points>
    )
    }

export default SphereFloaters
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"

// components
import ExampleShader from './components/Example/ExampleShader'
import SphereFloaters from './components/Sphere/SphereFloaters'


function App() {

  return (
    <Canvas className="App" style={{width: innerWidth, height: innerHeight}} camera={{far: 1000, near: 0.01, fov: 75, position: [0, 1, 45], aspect: innerWidth/innerHeight, type: 'PerspectiveCamera'}}>
        <OrbitControls makeDefault enableDamping={true} enablePan={false}/>
        <SphereFloaters/>
        <ExampleShader/>
        <axesHelper/>
    </Canvas>
  )
}

export default App

const fragmentShader = `
uniform float uResolutionWidth;
uniform float uResolutionHeight;

varying vec3 vColor;
varying vec4 vRealPosition;
varying float vDistance;

  void main() {

    float d = length(gl_PointCoord.xy - 0.5);

    float alpha = smoothstep(0.5, 0.15, d);

    gl_FragColor = vec4( vColor, alpha );
  }
`
 
export default fragmentShader
const vertexShader = `
#define PI 3.14159265358979323846


uniform float uTime;
uniform float uRadius;


attribute float pointSizes;
attribute float randomX;
attribute float randomY;
attribute float randomZ;
attribute float randomW;


varying vec3 vColor;
  

void main() {

  // set the vertex color
  float d = length(abs(position) / vec3(96.0, 22.0, 96.0));
  d = clamp(d, 0.0, 1.0);

  float d2 = abs(position.y);

  vColor = mix(vec3(244.0, 131.0, 12.0), vec3(82.0, 27.0, 255.0), d2/22.0) / 255.;
  

  // my attempt at random movement
  float t = 90.0 + uTime;

  float trans1 = mod(randomX+randomZ * t, PI * 2.0);
  float trans2 = mod(randomY+randomZ * t, PI * 2.0);

  vec3 trans3 = vec3(cos(trans1) * sin(trans2), cos(trans2), sin(trans1) * sin(trans2)) * randomW;
  vec3 transformedPosition = position + trans3;


  // Do Not Touch
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( transformedPosition, 1.0 );
  gl_PointSize = pointSizes / abs(gl_Position.w);

}

`

export default vertexShader
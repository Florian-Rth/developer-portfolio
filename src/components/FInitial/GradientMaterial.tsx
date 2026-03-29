import { useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import { DoubleSide, type ShaderMaterial, Vector3 } from "three";

const VERTEX_SHADER = `
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uIsHighlight;
  uniform vec3 uLightPosition;
  uniform float uYMin;
  uniform float uYMax;

  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;

  const vec3 lavender = vec3(0.722, 0.663, 0.831);
  const vec3 dustyRose = vec3(0.831, 0.573, 0.608);
  const vec3 gold = vec3(0.839, 0.694, 0.537);
  const vec3 peach = vec3(0.910, 0.706, 0.627);

  vec3 getGradientColor(float t) {
    t = fract(t);
    if (t < 0.25) {
      return mix(lavender, dustyRose, t / 0.25);
    } else if (t < 0.5) {
      return mix(dustyRose, gold, (t - 0.25) / 0.25);
    } else if (t < 0.75) {
      return mix(gold, peach, (t - 0.5) / 0.25);
    } else {
      return mix(peach, lavender, (t - 0.75) / 0.25);
    }
  }

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDir = normalize(vViewDir);

    float normalizedY = (vWorldPosition.y - uYMin) / (uYMax - uYMin);
    normalizedY = clamp(normalizedY, 0.0, 1.0);

    float gradientT = normalizedY;

    vec3 baseColor = getGradientColor(gradientT);

    float cosTheta = dot(viewDir, normal);
    float fresnel = pow(1.0 - abs(cosTheta), 2.5);

    float viewShift = fresnel * 0.35 + cosTheta * 0.1;
    vec3 iridColor = getGradientColor(fract(gradientT + viewShift));
    baseColor = mix(baseColor, iridColor, fresnel * 0.7);

    vec3 spectral = 0.5 + 0.5 * cos(6.28318 * (fresnel * 1.5 + vec3(0.0, 0.33, 0.67)));
    baseColor = mix(baseColor, baseColor * spectral, fresnel * 0.15);

    vec3 lightDir = normalize(uLightPosition - vWorldPosition);
    float diffuse = max(dot(normal, lightDir), 0.0);

    float rim = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

    vec3 litColor = baseColor * (0.5 * diffuse + 0.5) + baseColor * rim * 0.15;

    if (uIsHighlight > 0.5) {
      vec3 hsv = rgb2hsv(litColor);
      hsv.y = min(hsv.y * 1.2, 1.0);
      hsv.z = min(hsv.z * 1.15, 1.0);
      litColor = hsv2rgb(hsv);
    }

    gl_FragColor = vec4(litColor, 1.0);
  }
`;

const LIGHT_POSITION = new Vector3(5, 5, 5);

type GradientMaterialProps = {
  isHighlight?: boolean;
};

export const GradientMaterial: React.FC<GradientMaterialProps> = ({ isHighlight = false }) => {
  const materialRef = useRef<ShaderMaterial>(null);

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uIsHighlight: { value: isHighlight ? 1.0 : 0.0 },
    uLightPosition: { value: LIGHT_POSITION },
    uYMin: { value: -2.0 },
    uYMax: { value: 2.0 },
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={VERTEX_SHADER}
      fragmentShader={FRAGMENT_SHADER}
      uniforms={uniformsRef.current}
      side={DoubleSide}
    />
  );
};

'use client';

import React, { useEffect, useRef } from 'react';

type Props = {
  className?: string; // style the wrapper div (e.g., size, rounding)
  paused?: boolean; // allow pausing if needed
  children?: React.ReactNode; // overlay content
};

type GL = WebGLRenderingContext | WebGL2RenderingContext;

export default function ShaderBackground({ className, paused, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const glRef = useRef<GL | null>(null);
  const startTimeRef = useRef<number>(0);
  const programRef = useRef<WebGLProgram | null>(null);
  const locTimeRef = useRef<WebGLUniformLocation | null>(null);
  const locResRef = useRef<WebGLUniformLocation | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);

  // --- Minimal vertex shader (full-screen triangle)
  const vert = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`.trim();

  // --- Your fragment shader, adapted to WebGL1 (precision + uniforms + main)
  const frag = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;

// noise from https://www.shadertoy.com/view/4sc3z2
vec3 hash33(vec3 p3)
{
  p3 = fract(p3 * vec3(.1031,.11369,.13787));
  p3 += dot(p3, p3.yxz+19.19);
  return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z)*p3.zyx);
}
float snoise3(vec3 p)
{
  const float K1 = 0.333333333;
  const float K2 = 0.166666667;

  vec3 i = floor(p + (p.x + p.y + p.z) * K1);
  vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);

  vec3 e = step(vec3(0.0), d0 - d0.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);

  vec3 d1 = d0 - (i1 - K2);
  vec3 d2 = d0 - (i2 - K1);
  vec3 d3 = d0 - 0.5;

  vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
  vec4 n = h * h * h * h * vec4(
    dot(d0, hash33(i)),
    dot(d1, hash33(i + i1)),
    dot(d2, hash33(i + i2)),
    dot(d3, hash33(i + 1.0))
  );

  return dot(vec4(31.316), n);
}

vec4 extractAlpha(vec3 colorIn)
{
  vec4 colorOut;
  float maxValue = min(max(max(colorIn.r, colorIn.g), colorIn.b), 1.0);
  if (maxValue > 1e-5)
  {
    colorOut.rgb = colorIn.rgb * (1.0 / maxValue);
    colorOut.a = maxValue;
  }
  else
  {
    colorOut = vec4(0.0);
  }
  return colorOut;
}

#define BG_COLOR (vec3(sin(iTime)*0.5+0.5) * 0.0 + vec3(0.0))
#define time iTime
const vec3 color1 = vec3(0.311765, 0.262745, 0.996078);
const vec3 color2 = vec3(0.998039, 0.260784, 0.213725);
const vec3 color3 = vec3(0.8062745, 0.078431, 0.600000);
const float innerRadius = 5.0;
const float noiseScale = 4.0;

float light1(float intensity, float attenuation, float dist)
{
  return intensity / (1.0 + dist * attenuation);
}
float light2(float intensity, float attenuation, float dist)
{
  return intensity / (1.0 + dist * dist * attenuation);
}

void draw( out vec4 _FragColor, in vec2 vUv )
{
  vec2 uv = vUv;
  float ang = atan(uv.y, uv.x);
  float len = length(uv);
  float v0, v1, v2, v3, cl;
  float r0, d0, n0;
  float r, d;

  // ring
  n0 = snoise3( vec3(uv * noiseScale, time * 0.5) ) * 0.5 + 0.5;
  r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
  d0 = distance(uv, r0 / len * uv);
  v0 = light1(1.0, 10.0, d0);
  v0 *= smoothstep(r0 * 1.05, r0, len);
  cl = cos(ang + time * 2.0) * 0.5 + 0.5;

  // high light
  float a = time * -1.0;
  vec2 pos = vec2(cos(a), sin(a)) * r0;
  d = distance(uv, pos);
  v1 = light2(1.5, 55.0, d);
  v1 *= light1(1.0, 50.0 , d0);

  // back decay
  v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);

  // hole
  v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

  // color
  vec3 c = mix(color1, color2, cl);
  vec3 col = mix(color1, color2, cl);
  col = mix(color3, col, v0);
  col = (col + v1) * v2 * v3;
  col.rgb = clamp(col.rgb, 0.0, 1.0);

  _FragColor = extractAlpha(col);
}

// shadertoy-style main
void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 res = iResolution;
  vec2 uv = (fragCoord * 2.0 - res) / res.y;

  vec4 col;
  draw(col, uv);

  vec3 bg = BG_COLOR;
  gl_FragColor = vec4(mix(bg, col.rgb, col.a), 1.0);
}
`.trim();

  // --- helpers
  function createShader(gl: GL, type: number, source: string) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error(`Shader compile error: ${log || 'unknown'}`);
    }
    return sh;
  }

  function createProgram(gl: GL, vs: string, fs: string) {
    const v = createShader(gl, gl.VERTEX_SHADER, vs);
    const f = createShader(gl, gl.FRAGMENT_SHADER, fs);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    gl.deleteShader(v);
    gl.deleteShader(f);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(prog);
      gl.deleteProgram(prog);
      throw new Error(`Program link error: ${log || 'unknown'}`);
    }
    return prog;
  }

  function resize(gl: GL) {
    const canvas = gl.canvas as HTMLCanvasElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR for perf
    const displayWidth = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const displayHeight = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, displayWidth, displayHeight);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl =
      (canvas.getContext('webgl2', {
        antialias: false,
        alpha: true,
      }) as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl', {
        antialias: false,
        alpha: true,
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return;
    glRef.current = gl;

    glRef.current = gl as WebGLRenderingContext;

    // program
    const program = createProgram(gl, vert, frag);
    programRef.current = program;
    gl.useProgram(program);

    // full-screen triangle (covers clipspace)
    const buffer = gl.createBuffer()!;
    bufferRef.current = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // single large triangle: (-1,-1), (3,-1), (-1,3)
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const locPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

    // uniforms
    locTimeRef.current = gl.getUniformLocation(program, 'iTime');
    locResRef.current = gl.getUniformLocation(program, 'iResolution');

    // timing
    startTimeRef.current = performance.now();

    const onResize = () => {
      if (!glRef.current) return;
      resize(glRef.current);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    // initial size
    resize(gl);

    const loop = () => {
      if (!glRef.current || !programRef.current) return;
      if (!paused) {
        const now = performance.now();
        const t = (now - startTimeRef.current) / 1000;
        const cw = (gl.canvas as HTMLCanvasElement).width;
        const ch = (gl.canvas as HTMLCanvasElement).height;

        gl.useProgram(programRef.current);
        gl.uniform1f(locTimeRef.current, t);
        gl.uniform2f(locResRef.current, cw, ch);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (bufferRef.current) gl.deleteBuffer(bufferRef.current);
      if (programRef.current) gl.deleteProgram(programRef.current);
      glRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} />
      {/* content over the shader */}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

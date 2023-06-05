export default function range(a, b, step = 1) {
  return new Array((b - a + step) / step).fill(step).map((x, i) => x * i + a)
}

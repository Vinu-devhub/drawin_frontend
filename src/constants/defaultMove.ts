export const DEFAULT_MOVE: Move = {
  circle: {
    cX: 0,
    cY: 0,
    radiusX: 0,
    radiusY: 0,
  },
  rect: {
    width: 0,
    height: 0,
  },
  path: [],
  options: {
    lineWidth: 1,
    lineColor: { r: 0, g: 0, b: 0, a: 0 },
    fillColor: { r: 0, g: 0, b: 0, a: 0 },
    shape: "line",
    mode: "draw",
    selection: null,
  },
  timestamp: 0,
  id: "",
  img: {
    base64: "",
  },
};

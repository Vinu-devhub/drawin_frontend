import { RgbaColor } from "react-colorful";

export const getStringRgba = (rgba: RgbaColor) =>
  `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

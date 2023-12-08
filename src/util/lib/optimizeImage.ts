import FileImageResizer from "react-image-file-resizer";

export const optimizeImage = (file: File, callback: (uri: string) => void) => {
  FileImageResizer.imageFileResizer(
    file,
    700,
    700,
    "WEBP",
    100,
    0,
    (uri) => {
      callback(uri.toString());
    },
    "base64",
  );
};

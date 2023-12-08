import { ImagePlus } from "lucide-react";
import { useEffect } from "react";
import { optimizeImage } from "../../../../util/lib/optimizeImage";
import { useMoveImage } from "../../hooks/useMoveImage";

const ImagePicker = () => {
  const { setMoveImage } = useMoveImage();

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;

      if (items) {
        for (const item of items) {
          if (item.type.includes("image")) {
            const file = item.getAsFile();
            if (file) {
              optimizeImage(file, (uri) => setMoveImage({ base64: uri }));
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [setMoveImage]);

  const handleInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", () => {
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];
        optimizeImage(file, (uri) => setMoveImage({ base64: uri }));
      }
    });
  };

  return (
    <button className={`text-xl p-2 rounded-full  `} onClick={handleInput}>
      <ImagePlus />
    </button>
  );
};

export default ImagePicker;

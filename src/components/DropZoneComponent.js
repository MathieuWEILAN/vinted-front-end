import { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

const DropZoneComponent = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="drag">
        <input {...getInputProps()} />
        <p>AJOUTEZ UNE PHOTO</p>
      </div>
    </div>
  );
};

export default DropZoneComponent;

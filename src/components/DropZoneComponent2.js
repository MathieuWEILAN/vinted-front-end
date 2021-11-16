import { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

const DropZoneComponent2 = ({ setPictures }) => {
  const onDrop = useCallback((acceptedFiles2) => {
    console.log(acceptedFiles2);
    setPictures(acceptedFiles2);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="drag">
        <input {...getInputProps()} />
        <p>AJOUTEZ D'AUTRE PHOTO</p>
      </div>
    </div>
  );
};

export default DropZoneComponent2;

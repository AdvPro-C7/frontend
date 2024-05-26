import { useEffect, useRef } from 'react';

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dzjfu0tcd',
            uploadPreset: 'ml_default'
        }, function(error, result) {
            console.log(result, error);
        });
    }, []);

    return (
        <div>
          <button onClick={() => widgetRef.current.open()}>
            Upload
          </button>
        </div>
      );
};

export default UploadWidget;
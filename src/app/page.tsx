"use client";

import { IKImage, IKUpload } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "./providers";

export default function Home() {
  const [filePath, setFilePath] = useState('')
  return (
    <>
    <div>
      {filePath &&
      <IKImage
        width={300}
        height={500}
        urlEndpoint={urlEndpoint}
        path={filePath}
        alt="Image"
      />
    }
    </div> 
    <div>
      <h1>File Upload</h1>
      <IKUpload fileName="meme.jpg"  onError={(error) => {
        console.log("Error", error)}} onSuccess={(response) => {
          console.log("Success", response)
          setFilePath(response.filePath)
        }} />
    </div>
    </>
  );
}

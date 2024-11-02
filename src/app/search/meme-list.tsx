"use client"

import { FileObject } from "imagekit/dist/libs/interfaces"
import { IKImage } from "imagekitio-next"
import { urlEndpoint } from "../providers"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export default function MemeList({ files }: { files: FileObject[] }) {
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {files.map((file) => {
            return (
                <Card key={file.filePath}>
                <CardHeader>
                  <CardTitle><div>
                    {file.customMetadata?.memeContent ?? file.name}
                    </div></CardTitle> 
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                <IKImage 
                    key={file.fileId}
                    path={file.filePath}
                    alt={file.name}
                    width={320}
                    urlEndpoint={urlEndpoint}
                    height={320}
                />
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              
            )
        })}</div>
        </>
    )
}



"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IKUpload } from "imagekitio-next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function UploadMemeBtn() {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [memeContent, setmemeContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload Base Meme</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your meme image</DialogTitle>
          <DialogDescription>
            This is a meme image that anyone on this site can use
          </DialogDescription>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsUploading(true);
              uploadInputRef.current?.click();
            }}
          >
            <div>
              <div className="mb-4">
                <Label htmlFor="memeContent">Meme Content</Label>
                <Input
                  id="memeContent"
                  name="memeContent"
                  placeholder="Meme Content"
                  required
                  value={memeContent}
                  onChange={(e) => setmemeContent(e.target.value)}
                />
              </div>

              <IKUpload
                fileName="test-upload.png"
                customMetadata={{
                  memeContent,
                }}
                onError={(error) => {
                  setIsUploading(false);
                  console.log("error", error);
                }}
                onSuccess={() => {
                  setIsUploading(false);
                  router.push(`/`);
                }}
                style={{ display: "none" }}
                ref={uploadInputRef}
              />
            </div>

            <DialogFooter className="flex justify-end">
              <Button disabled={isUploading} type="submit">
                Select & Upload Image
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
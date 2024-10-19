
import { imagekit } from "@/lib/imagekit";
import { unstable_noStore } from "next/cache";
import MemeList from "./meme-list";
import { Button } from "@/components/ui/button";
import { UploadMemeBtn } from "./upload-meme-btn";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q: string }
}) {
    unstable_noStore
    const files = await imagekit.listFiles({
        searchQuery: `name:${searchParams.q}`,
    })

    return (
        <div className="container mx-auto space-y-8 py-8 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Search Results</h1>
          <UploadMemeBtn />
        </div>
  
        <MemeList files={files} />
      </div>
    )
}
export const revalidate = 0;

import { IdeaWall } from "@/components/idea-wall";
import { Navbar } from "@/components/navbar";
import { fetchIdeas } from "@/lib/ideas";

export default async function HomePage() {
  try {
    const ideas = await fetchIdeas();
    return (
      <main>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center">
          <IdeaWall initialIdeas={ideas} />
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "資料載入失敗";
    return (
      <main>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center">
          <IdeaWall initialIdeas={[]} initialError={message} />
        </div>
      </main>
    );
  }
}


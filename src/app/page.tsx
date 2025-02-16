import Button from "@/components/button";
import Footer from "@/components/footer";
import { LovePassCard } from "@/components/love-pass-card";
import NavBar from "@/components/nav-bar";
import { lovePassCardsThemesData } from "@/data/love-pass-cards-themes";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="container mx-auto text-center py-20">
          <h2 className="text-3xl font-extrabold text-primary lg:text-5xl">
            Express Love, Share Memories
          </h2>
          <p className="text-gray-700 my-4 max-w-2xl mx-auto lg:text-lg">
            Create & share unique LovePass cards with special messages. No
            accounts, just love! ❤️
          </p>
          <Link href="/create">
            <Button variant="accent" className="w-fit">
              Create LovePass
            </Button>
          </Link>
        </header>

        <div className="py-16 bg-neutral w-full">
          <div className="flex flex-col items-center container mx-auto">
            <h3 className="text-center text-3xl font-bold text-foreground">
              Example LovePass
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {lovePassCardsThemesData.map((theme) => (
                <LovePassCard
                  key={theme.name}
                  from="Me"
                  to="Someone Special"
                  message={theme.message}
                  emoji={theme.emoji}
                  backgroundColor={theme.backgroundColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

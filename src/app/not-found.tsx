import NavBar from "@/components/nav-bar";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto text-center py-20">
        <h2 className="text-3xl font-bold text-primary lg:text-5xl">
          Page Not Found
        </h2>
        <p className="text-gray-700 my-4 max-w-2xl mx-auto lg:text-lg">
          The page you are looking for does not exist. Please go back to the{" "}
          <Link href="/" className="underline hover:no-underline">
            Home Page
          </Link>
          .
        </p>
      </div>
    </>
  );
}

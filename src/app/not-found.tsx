import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto text-center py-20">
      <h2 className="text-3xl font-bold mb-6">
        Oops! This LovePass doesn’t exist.
      </h2>
      <Link href="/create">
        <p className="bg-primary text-white py-2 px-4 rounded-lg">
          Create a LovePass
        </p>
      </Link>
    </div>
  );
}

import Navbar from "@/components/navbar";
import Page from "@/components/page";
import Image from "next/image";

export default function DynamicPage({ params }) {
  return (
    <div className="flex flex-col w-screen h-screen bg-lime-100">
      <div className="flex items-center justify-center bg-white">
        <Image
          src="/logo-default.jpg"
          alt="Mountain Backpackers Club"
          width={180}
          height={140}
        />

        <Image
          src="/header27.jpg"
          alt="Mountain Backpackers Club"
          className="w-auto h-full"
          width={820}
          height={140}
        />
      </div>
      <Navbar />

      <Page url={params.page} />
    </div>
  );
}

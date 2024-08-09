import { HomePage } from "@/components/home-page";
import { BackgroundCellAnimation } from "@/components/ui/BackgroundRippleEffect";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
      <HomePage></HomePage>
    </div>
  );
}

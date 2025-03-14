import Image from "next/image";
import FileUploader from "./components/FileUploader";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <FileUploader />
    </div>
  );
}

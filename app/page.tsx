import Image from "next/image";
import JobList from "@/components/JobList";
export default function Home() {


  return (
    <div>
      <div className="flex items-center justify-center"></div>
      <JobList />
    </div>
  );
}

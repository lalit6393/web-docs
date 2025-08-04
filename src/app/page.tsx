import Profile from "@/modules/profile/Profile";
import Link from "next/link";

export default function Home() {

  

  return (
    <div className="">
      <p>Welcome back!</p>
      <Link href={'/documents'}>Documents</Link>
    </div>
  );
}

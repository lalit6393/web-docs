import Link from "@/modules/link/Link";


export default function Home() {



  return (
    <div className="flex flex-col p-4 w-full">
      <h1 className="text-slate-800 text-2xl">Welcome to Web Docs</h1>
      <Link className="underline text-sm" href={'/documents'}>My Documents</Link>
      <Link className="underline text-sm" href={'/login'}>Login</Link>
      <Link className="underline text-sm" href={'/signup'}>Signup</Link>
    </div>
  );
}

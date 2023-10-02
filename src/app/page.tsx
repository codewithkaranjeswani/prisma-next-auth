import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "@/components/User";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="text-3xl pb-8">Hello From Auth Example</div>
      <h2>Server Session</h2>
      <div>
        <p className="break-words">{JSON.stringify(session)}</p>
      </div>
      <h2>Client Session</h2>
      <User />
    </>
  );
}

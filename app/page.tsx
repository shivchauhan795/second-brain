import { getServerSession } from "next-auth";
import Button from "./components/Button";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      {session ? (
        <Button isSession={true} text="Logout" />
      ) : (
        <Button isSession={false} text="SignIn" />
      )
      }
    </div>
  );
}
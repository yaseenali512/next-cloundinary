import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <SignInButton>
      <button>Sign In</button>
    </SignInButton>
  );
}

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <SignIn
          appearance={{
            elements: {
              card: "bg-white shadow-none border-none", // Remove background, shadow, and border
              primaryButton: "bg-blue-500 hover:bg-blue-600 text-white",
              formFieldInput: "border-gray-300 focus:border-blue-500",
            },
          }}
        />
      </div>
    </div>
  );
}

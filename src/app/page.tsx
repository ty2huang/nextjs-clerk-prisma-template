import { protocol, getFullDomain } from "@/lib/utils";
import { OrganizationList, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");
  if (subdomain) {
    redirect("/app");
  }

  const afterSelectOrganizationUrl = `${protocol}://${getFullDomain(":slug")}/app`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SignedOut>
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sign in to access your organizations and collaborate with your team.
          </p>
          <div className="flex justify-center gap-4">
            <SignInButton>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-center justify-center text-center py-16 gap-8">
          <OrganizationList 
            hidePersonal={true} 
            afterSelectOrganizationUrl={afterSelectOrganizationUrl}
            afterCreateOrganizationUrl={afterSelectOrganizationUrl}
          />
        </div>
      </SignedIn>
    </div>
  );
}

"use client";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { toast } from "sonner";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      const result = await signIn(provider, { callbackUrl: ROUTES.HOME, redirect: false });

      if (result?.url) {
        window.location.href = result.url;
        return;
      }

      toast.error(`Unable to start ${provider} sign in. Please try again.`);
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast.error(`Failed to sign in with ${provider}. Please try again.`);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button type="button" className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button type="button" className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image src="/icons/google.svg" alt="Google Logo" width={20} height={20} className="mr-2.5 object-contain" />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;

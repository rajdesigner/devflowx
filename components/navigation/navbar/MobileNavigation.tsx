import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import { Link } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image src="/icons/hamburger.svg" alt="Open Menu" width={36} height={36} className="invert-colors sm:hidden" />
      </SheetTrigger>

      <SheetContent side="left" className="background-light900_dark200 border-none">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image src="/images/site-logo.svg" alt="Site Logo" width={23} height={23} className="invert-colors" />

          <p className="h2 bold font-space-grotesk text-dark-900 dark:text-light-900">
            Dev<span className="text-primary-500">OverFlow</span>
          </p>
        </Link>

        <div className="no-scrollbar h[calc(100vh-80px)] flex flex-col justify-between overflow-y-auto">
          <SheetClose>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav={true} />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            <SheetClose>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary min-h[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;

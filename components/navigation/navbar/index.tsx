import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ModeToggle } from "./Theme";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full p-6 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" alt="Dev Overflow Logo" width={24} height={24} />
        <p className="h2 bold font-space-grotesk text-dark-900 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">OverFlow</span>
        </p>
      </Link>

      <p>Global Search</p>
      <div className="flex-between gap-5">
        <ModeToggle />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;

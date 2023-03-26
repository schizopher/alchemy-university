import React from "react";
import Link from "next/link";
import { CubeIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  return (
    <header className="flex h-16 items-center justify-center">
      <div className="flex w-full max-w-screen-xl flex-row">
        <Link href="/">
          <div className="flex flex-row items-center gap-2">
            <CubeIcon className="w-8" />
            <h1 className="text-xl font-semibold">Block Explorer</h1>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;

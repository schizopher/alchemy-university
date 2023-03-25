import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center">
      <nav className="flex h-20 w-full max-w-screen-xl items-center justify-between">
        <a className="text-lg font-semibold">Escrow</a>
        <ConnectButton></ConnectButton>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import Header from "~/components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mb-16">{children}</div>
    </>
  );
};

export default MainLayout;

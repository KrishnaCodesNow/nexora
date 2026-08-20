import { onBoardUser } from "@/modules/auth/actions";
import Navbar from "@/modules/home/components/navbar";
import React from "react";

const Layout = async ({ children }) => {
  await onBoardUser();

  return (
    <main className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* Background dots */}
      <div
        className="
          fixed inset-0
          w-full h-full
          bg-background
          dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)]
          bg-[radial-gradient(#dadde2_1px,transparent_1px)]
          z-0
        "
        style={{
          backgroundSize: "16px 16px",
        }}
      />

      {/* Page content */}
      <div className="relative z-10 flex-1 w-full mt-20">
        {children}
      </div>
    </main>
  );
};

export default Layout;
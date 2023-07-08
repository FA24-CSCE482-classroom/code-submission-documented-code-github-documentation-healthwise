import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  const handleAuth = () => {
    const password = prompt("Password: ")

    if (password === "Ol1v1aStud3nt!2023" || password === "Intell1g3ntB@by2323") {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    handleAuth();
  }, [])

  return (
    <>
      {authorized && (<div className="flex flex-col h-screen text-black bg-[url('../assets/background.png')]">
        <div className="shadow-lg bg-white">
          <Navbar />
        </div>

        <div className="container mx-auto px-4 flex-1 mb-2 ">{children}</div>

        <Footer />
      </div>)}
    </>
  );
};

export default Layout;

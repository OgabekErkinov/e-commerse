import { Footer, Navbar, Searchbar } from "@/components";
import { Alert } from "@/modals";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Searchbar />
      <Navbar/>
      {children}
      <Footer />
      <Alert />
    </>
  );
};

export default Layout;

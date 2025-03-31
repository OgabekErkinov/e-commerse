import { Footer, Searchbar } from "@/components";
import { Alert } from "@/modals";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Searchbar />
      {children}
      <Footer />
      <Alert />
    </>
  );
};

export default Layout;

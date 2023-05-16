import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children?: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;

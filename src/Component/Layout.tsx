import NavLinks from "./NavLinks";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavLinks />
      {children}
        <Footer />
    </div>
  )
}

export default Layout;
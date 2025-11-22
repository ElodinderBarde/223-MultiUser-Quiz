import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <img src="/vite.svg" className="App-logo" alt="logo" />
        <h1>Willkommen beim WISS-Quiz!</h1>
      </header>

      <main className="layout-main-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>© {currentYear} WISS-Quiz. All rights reserved.</p>
        <p>Made with ❤️ by WISS</p>
      </footer>
    </div>
  );
};

export default Layout;

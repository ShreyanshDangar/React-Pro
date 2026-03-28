import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export function HomeLayout() {
  return (
    <>
      <main className="main-content home-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function InternalLayout() {
  return (
    <main className="main-content internal-content">
      <Outlet />
    </main>
  );
}

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col bg-cyber-bg">
        {/* React Router will inject child routes here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

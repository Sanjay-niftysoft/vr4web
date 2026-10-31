import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import FastScroll from './components/common/FastScroll';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <FastScroll />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

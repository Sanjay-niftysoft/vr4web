import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import FastScroll from './components/common/FastScroll';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FastScroll />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

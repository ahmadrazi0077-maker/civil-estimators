import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from '../ErrorBoundary';
import ScrollToTop from '../ScrollToTop';
import WhatsAppButton from '../WhatsAppButton';

export default function Layout({ children }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  );
}
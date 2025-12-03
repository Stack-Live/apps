
import { AuthProvider } from '@/auth/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isWebview = router.query.webview === 'true';
  const showHeader = true;
  const showFooter = true;

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col font-sans">
        {!isWebview && showHeader && <Header />}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {!isWebview && showFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}
    
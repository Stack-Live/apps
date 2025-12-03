
import Head from 'next/head';
import Link from 'next/link';

export default function AccessDeniedPage() {
  return (
    <>
      <Head>
        <title>Access Denied - signapp</title>
      </Head>
      <div className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg text-gray-700">You do not have the necessary permissions to view this page.</p>
        <div className="mt-8">
          <Link href="/" className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
    
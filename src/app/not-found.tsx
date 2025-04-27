
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-lg text-gray-600 text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}

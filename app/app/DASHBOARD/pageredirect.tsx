'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/'); // Redirect to sign-in page if not logged in
    }
  }, [router]);

  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-4xl font-semibold">Redirecting...</h1>
    </div>
  );
}

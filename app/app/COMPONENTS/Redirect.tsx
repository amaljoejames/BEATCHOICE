"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // If using Next.js 13+
import { useEffect } from 'react';

export function Reciprocal() {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if(session?.data?.user) {
            router.push("./SELECTION");
         }
         }, [session]);

    return null;
}

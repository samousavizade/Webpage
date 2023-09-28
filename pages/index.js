'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';

const Home= () => {
    const { push } = useRouter();

    useEffect(() => {
        push('/home');
    }, []);
    return <p></p>;
};

export default Home;
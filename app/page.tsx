'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { generateRoomId } from '@/lib/client-utils';
import styles from '../styles/Home.module.css';

export default function Page() {
  const router = useRouter();
  const startMeeting = () => {
    router.push(`/rooms/${generateRoomId()}`);
  };
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <Suspense fallback="Loading">
          <p style={{ margin: 0 }}>Try JW Nexus for free with our live demo project.</p>
          <button style={{ marginTop: '1rem' }} className="lk-button" onClick={startMeeting}>
            Start Meeting
          </button>
        </Suspense>
      </main>
      <footer data-lk-theme="default">JWNexus</footer>
    </>
  );
}

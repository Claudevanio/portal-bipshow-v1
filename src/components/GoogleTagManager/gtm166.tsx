'use client';

import { pageview } from '@/utils/gtm';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GtmImersao({ gtmId }: { gtmId?: string }) {
  const pathname = usePathname();

  const GTM_ID = gtmId;

  useEffect(() => {
    if (!pathname.includes('/evento/')) return;
    if (!GTM_ID) return;

    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
    pageview(pathname);

    return () => {
      document.head.removeChild(script);
    };
  }, [GTM_ID, pathname]);

  return null;
}

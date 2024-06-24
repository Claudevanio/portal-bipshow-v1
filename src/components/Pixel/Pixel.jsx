'use client';
//desativa o eslint para o arquivo inteiro 
/* eslint-disable */
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// interface FacebookPixelProps {
//   fbPixelId: string;
// }

// declare global {
//   interface Window {
//     fbq: (command: string, ...args: any[]) => void;
//   }
// }

const FacebookPixel= ({ fbPixelId }) => {
  const pathname = usePathname()
  useEffect(() => { 
    return () => {
      if (typeof window !== 'undefined' && window?.fbq) {
        window.fbq('track', 'PageView', { pixel_removed: true }); 
        window.fbq = window._fbq = null;
      }
    };
  }, [pathname]); 

  useEffect(() => { 
    if (typeof window !== 'undefined' && fbPixelId) { 
      !function (f, b, e, v, n, t, s) { 
        if (f.fbq) return; n = f.fbq = function () {  
          n.callMethod ?  
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';  
        n.queue = []; t = b.createElement(e); t.async = !0; 
        t.src = v; s = b.getElementsByTagName(e)[0]; 
        s.parentNode.insertBefore(t, s) 
      }(window, document, 'script', 
        'https://connect.facebook.net/en_US/fbevents.js'); 
 
      fbq.disablePushState = true;
      fbq('init', fbPixelId); 
    } else{ 
      if (typeof window !== 'undefined')
        window.fbq = window._fbq = null;
    }
  }, [fbPixelId]); // Adicione fbPixelId como uma dependência do useEffect

  if(!fbPixelId) {
    return <></>;
  }

  return (
    <>
      <noscript>
      </noscript>
    </>
  )
};

export default FacebookPixel;
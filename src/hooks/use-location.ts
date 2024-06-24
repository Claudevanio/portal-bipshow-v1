'use client';

import { Cache } from '@/adapters';
import { getSiglaByEstado } from '@/utils';
import { useEffect, useState } from 'react';
import { useEffectOnce } from '.';

// interface Geolocation {
//   latitude: number
//   longitude: number
// }
// export const useGeoLocation = () => {
//   const [location, setLocation] = useState<Geolocation>({
//     latitude: 0,
//     longitude: 0,
//   })
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         })
//       },
//       (error) => {
//         console.error(error)
//       }
//     )
//   }, [])

//   return location
// }

export const useGeoLocation = (): {
  location: { city: string; uf: string };
  setLocation: Function;
} => {
  const [location, setLocation] = useState<{ city: string; uf: string }>({
    city: '',
    uf: ''
  });

  const locationCache = Cache.get({ key: 'location' });

  async function getCityAndUf() {
    // const response = await fetch(`http://ip-api.com/json`)
    // const data = await response.json()
    // const state = getSiglaByEstado(data.regionName)
    // setLocation({
    //   city: data.city,
    //   uf: state,
    // })
    // Cache.set({ key: 'location', value: { city: data.city, uf: state } })
  }

  useEffectOnce(() => {
    if (locationCache) return;

    getCityAndUf();
  });

  // if (locationCache)
  // setLocation(locationCache)

  return {
    location,
    setLocation
  };
};

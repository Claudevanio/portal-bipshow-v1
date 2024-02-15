'use client'  
  import { EventTicketProvider } from '@/shared/hooks/useEventTicket';
  import { GET_EVENTS, api } from '@/services'; 
  import { SEOEvent } from '@/components/SEOEvent';
  import { Purchase } from '@/components/Purchase';
  import { TicketPurchaseProvider } from '@/shared/hooks/useTicketPurchase';
 
import { useEffect, useState } from 'react';

    

export default function Home({ params } : {params : any}){
    async function fetchProps(context: {id: number}) {
      const name = context;
      let data = null;
    
      if (name) {
        const result = await api.get(`${GET_EVENTS}/${name.id}/online`);
        data = {
          nome: result.data.nome,
          id: result.data.link,
          image: result.data.foto,
        };
      }
    
      return {
        props: {
          data,
        },
        revalidate: 60 * 20,
      };
    }

    const [dataEvent, setDataEvent] = useState<any>(null);
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchProps(params as any);
        setDataEvent(result);
      };
      fetchData();
    }
    , [params]);


    return (
      <EventTicketProvider>
        <SEOEvent
          description={`Compre Ingressos - ${dataEvent?.nome}`}
          id={dataEvent?.id || 'Erro'}
          image={`${process.env.URL_API}${dataEvent?.image}`}
          nome={`BipShow - ${dataEvent?.nome}`}
        />
        <TicketPurchaseProvider>
          <Purchase />
        </TicketPurchaseProvider>
      </EventTicketProvider>
    );
  };

  
  // export async function getStaticPaths() {
  //   const { data } = await axios.get(`${baseUrl}${GET_EVENTS}?cp=1`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer 4b7a6d0fba9e09ac3d98a14b2e9c68f6',
  //       'X-Requested-With': 'XMLHttpRequest',
  //     },
  //   });
  
  //   let paths = [];
  
  //   if (data && data.eventos) {
  //     paths = data.eventos.map((item: any) => {
  //       return {
  //         params: {
  //           id: item.link,
  //         },
  //       };
  //     });
  //   }
  
  //   return { paths, fallback: true };
  // }
  
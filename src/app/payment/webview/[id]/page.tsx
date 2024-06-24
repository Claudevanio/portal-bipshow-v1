import { EventTicketProvider } from '@/shared/hooks/useEventTicket'; 
import { Purchase } from '@/components/Purchase';
import { TicketPurchaseProvider } from '@/shared/hooks/useTicketPurchase'; 
import { GET_EVENTS } from '@/services';
import axios from 'axios';
import { SEOEvent } from '@/components/SEOEvent';
    

export default async function Home({ params } : {params : any}){ 

    const result = await axios.get(`${process.env.URL_API}${GET_EVENTS}/${params.id}/online`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 4b7a6d0fba9e09ac3d98a14b2e9c68f6',
        'X-Requested-With': 'XMLHttpRequest',
      },          
    });


    return (
      <EventTicketProvider> 
        <SEOEvent
          description={`Compre Ingressos - ${result?.data?.nome}`}
          id={result?.data?.id || 'Erro'}
          image={`${process.env.URL_API}${result?.data?.image}`}
          nome={`Synpass - ${result?.data?.nome}`}
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
  
import type {
    NextPage, GetStaticPropsContext,
  } from 'next';
  import axios from 'axios';
  import { EventTicketProvider } from '@/shared/hooks/useEventTicket';
  import { GET_EVENTS } from '@/services';
  import { ISEOEvent as HomeProps } from '@/components/SEOEvent/interface';
  import { SEOEvent } from '@/components/SEOEvent';
  import { Purchase } from '@/components/Purchase';
  import { TicketPurchaseProvider } from '@/shared/hooks/useTicketPurchase';
import { baseUrl } from '@/constants';
  
  const Home: NextPage<{ data: HomeProps | null}> = ({ data }) => {
    return (
      <EventTicketProvider>
        <SEOEvent
          description={`Compre Ingressos - ${data?.nome}`}
          id={data?.id || 'Erro'}
          image={`${process.env.URL_API}${data?.image}`}
          nome={`Synpass - ${data?.nome}`}
        />
        <TicketPurchaseProvider>
          <Purchase />
        </TicketPurchaseProvider>
      </EventTicketProvider>
    );
  };
  
  export async function getStaticProps(context: GetStaticPropsContext) {
    const name = context.params;
    let data = null;
  
    if (name) {
      const result = await axios.get(`${baseUrl}${GET_EVENTS}/${name.id}/online`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 4b7a6d0fba9e09ac3d98a14b2e9c68f6',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
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
  
  export async function getStaticPaths() {
    const { data } = await axios.get(`${baseUrl}${GET_EVENTS}?cp=1`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 4b7a6d0fba9e09ac3d98a14b2e9c68f6',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  
    let paths = [];
  
    if (data && data.eventos) {
      paths = data.eventos.map((item: any) => {
        return {
          params: {
            id: item.link,
          },
        };
      });
    }
  
    return { paths, fallback: true };
  }
  
  export default Home;
  
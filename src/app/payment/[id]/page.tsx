import { Purchase } from '@/components/Purchase';
import { TicketPurchaseProvider } from '@/shared/hooks/useTicketPurchase';

export default function PaymentPage({ params }: { params: { id: string } }) {
  return (
    <TicketPurchaseProvider>
      <Purchase />
    </TicketPurchaseProvider>
  );
}
export interface Ticket {
  id: string;
  name: string;
  price: number;
  quantity: number;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  city: string;
  state: string;
  image: string;
  stadium: string;
  isFeatured: boolean;
  tickets?: Ticket[];
}
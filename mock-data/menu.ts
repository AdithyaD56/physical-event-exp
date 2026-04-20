import { CartItem } from '@/types';

// Indian Menu (Wankhede, Narendra Modi)
export const INDIAN_MENU: CartItem[] = [
  { id: 'in1', name: 'Vada Pav', price: 60, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380ee2?q=80&w=600' },
  { id: 'in2', name: 'Pav Bhaji', price: 120, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600' },
  { id: 'in3', name: 'Butter Chicken Bowl', price: 280, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600' },
  { id: 'in4', name: 'Chicken Biryani', price: 250, quantity: 1, category: 'Biryani', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600' },
  { id: 'in5', name: 'Paneer Tikka Roll', price: 180, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600' },
  { id: 'in6', name: 'Masala Popcorn', price: 80, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=600' },
  { id: 'in7', name: 'Sweet Lassi', price: 70, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1549419130-10900cc23115?q=80&w=600' },
  { id: 'in8', name: 'Gulab Jamun (2pcs)', price: 80, quantity: 1, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?q=80&w=600' },
  { id: 'in9', name: 'Samosa Chat', price: 110, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70910?q=80&w=600' },
];

// British Menu (Wembley)
export const BRITISH_MENU: CartItem[] = [
  { id: 'uk1', name: 'Fish & Chips', price: 14, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1579208030886-b937fe0925dc?q=80&w=600' },
  { id: 'uk2', name: 'Steak & Ale Pie', price: 12, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600' },
  { id: 'uk3', name: 'Classic Burger', price: 10, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600' },
  { id: 'uk4', name: 'Large Fries', price: 5, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600' },
  { id: 'uk5', name: 'Hot Dog', price: 8, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=600' },
  { id: 'uk6', name: 'Draft Beer', price: 7, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=600' },
  { id: 'uk7', name: 'English Tea', price: 3, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?q=80&w=600' },
];

// American Menu (MSG)
export const AMERICAN_MENU: CartItem[] = [
  { id: 'us1', name: 'NY Style Pizza', price: 15, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600' },
  { id: 'us2', name: 'Loaded Nachos', price: 12, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=600' },
  { id: 'us3', name: 'Double Cheeseburger', price: 18, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600' },
  { id: 'us4', name: 'Giant Pretzel', price: 8, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1574630533003-8be8f75f6ed4?q=80&w=600' },
  { id: 'us5', name: 'Popcorn Bucket', price: 10, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=600' },
  { id: 'us6', name: 'Coca Cola XL', price: 4, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=600' },
  { id: 'us7', name: 'Milkshake', price: 9, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600' }
];

// Australian Menu (MCG)
export const AUSSIE_MENU: CartItem[] = [
  { id: 'au1', name: 'Classic Meat Pie', price: 8, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600' },
  { id: 'au2', name: 'Sausage Roll', price: 6, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1600275669439-14e40452d20b?q=80&w=600' },
  { id: 'au3', name: 'Chicken Parma', price: 20, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1623961988350-966c83669be3?q=80&w=600' },
  { id: 'au4', name: 'Fish & Chips', price: 18, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1579208030886-b937fe0925dc?q=80&w=600' },
  { id: 'au5', name: 'Flat White Coffee', price: 5, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600' },
  { id: 'au6', name: 'Cold Lager', price: 9, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=600' }
];

// Spanish Menu (Camp Nou)
export const SPANISH_MENU: CartItem[] = [
  { id: 'es1', name: 'Patatas Bravas', price: 7, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=600' },
  { id: 'es2', name: 'Jamón Bocadillo', price: 9, quantity: 1, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600' },
  { id: 'es3', name: 'Tortilla de Patatas', price: 6, quantity: 1, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=600' },
  { id: 'es4', name: 'Churros con Chocolate', price: 5, quantity: 1, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1616450171690-3665ffc4c238?q=80&w=600' },
  { id: 'es5', name: 'Fresh Sangria', price: 8, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600' },
  { id: 'es6', name: 'San Miguel Beer', price: 6, quantity: 1, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600' }
];

export const getMenuByVenue = (venueId: string): CartItem[] => {
  switch (venueId) {
    case 'wankhede':
    case 'narendra-modi':
      return INDIAN_MENU;
    case 'wembley':
      return BRITISH_MENU;
    case 'msg':
      return AMERICAN_MENU;
    case 'mcg':
      return AUSSIE_MENU;
    case 'camp-nou':
      return SPANISH_MENU;
    default:
      return INDIAN_MENU;
  }
};

export type Order = {
  id: string;
  userId: string;
  orderId: string;
  date: string;
  status: string;
};

export type UserOrder = Order & {
  userFirstName: string;
  userSecondName: string;
  userEmail: string;
  orderName: string;
};

// type OrderStatus = 'Approved' | 'Pending' | 'Denied';

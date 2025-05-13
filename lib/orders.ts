// This is a mock implementation. In a real app, you would use a database.
const orders = [
      {
        id: "1001",
        userId: "1",
        date: "2023-05-15T10:30:00Z",
        status: "Delivered",
        total: 154.98,
        items: [
          { productId: "1", quantity: 1, price: 129.99 },
          { productId: "5", quantity: 1, price: 14.99 },
        ],
        shipping: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
      },
      {
        id: "1002",
        userId: "1",
        date: "2023-06-20T14:45:00Z",
        status: "Processing",
        total: 79.98,
        items: [
          { productId: "3", quantity: 2, price: 24.99 },
          { productId: "4", quantity: 1, price: 29.99 },
        ],
        shipping: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
      },
      {
        id: "1003",
        userId: "1",
        date: "2023-07-05T09:15:00Z",
        status: "Shipped",
        total: 89.99,
        items: [{ productId: "6", quantity: 1, price: 89.99 }],
        shipping: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
      },
    ]
    
    export async function getUserOrders(userId: string) {
      return orders.filter((order) => order.userId === userId)
    }
    
    export async function getOrderById(orderId: string) {
      return orders.find((order) => order.id === orderId) || null
    }
    
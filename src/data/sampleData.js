const products = [
  {
    id: '1',
    name: 'Slim Fit Cotton Shirt',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    productUrl: 'https://example.com/product/1',
  },
  {
    id: '2',
    name: 'Straight Leg Jeans',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    productUrl: 'https://example.com/product/2',
  },
  {
    id: '3',
    name: 'Leather Chelsea Boots',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4',
    productUrl: 'https://example.com/product/3',
  },
  {
    id: '4',
    name: 'Casual Blazer',
    price: 149.99,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQUK6ExSLe-sIm0dJQRgzt3SCS5PVNjsJ64-fYHMJNjIXSqnaZSrx5O-qH1IuLxaFer7d_k2KyK1UQBromXIi99IlHHmMXa_qfc5x6zk_PF1hFM-EkHhR0DuA&usqp=CAc',
    productUrl: 'https://example.com/product/4',
  },
  {
    id: '5',
    name: 'Leather Belt',
    price: 49.99,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQUK6ExSLe-sIm0dJQRgzt3SCS5PVNjsJ64-fYHMJNjIXSqnaZSrx5O-qH1IuLxaFer7d_k2KyK1UQBromXIi99IlHHmMXa_qfc5x6zk_PF1hFM-EkHhR0DuA&usqp=CAc',
    productUrl: 'https://example.com/product/5',
  },
];

const looks = [
  {
    id: '1',
    title: 'Casual Summer Look',
    description: 'A perfect casual outfit for summer days',
    likes: 245,
    saves: 78,
    mediaItems: [
      {
        id: '1',
        type: 'image',
        url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTrY-2XUcWEg4LvM76izKiWopjGXFxg-TAHrmFIBqGhBNz3-D2TXM6dJ4NY0DStf0Efmmqso8XiPZa_4uXvINi5WD2846UU1UKCLodUbIauUoCg-E9H2dU',
        annotations: [
          {
            id: 'a1',
            productId: '1',
            x: 30,
            y: 40,
          },
          {
            id: 'a2',
            productId: '2',
            x: 45,
            y: 70,
          },
        ],
      },
      {
        id: '2',
        type: 'video',
        url: 'https://mixkit.co/free-stock-video/stylish-woman-getting-out-of-a-camaro-in-a-parking-44554/',
        duration: 15,
        annotations: [
          {
            id: 'a3',
            productId: '3',
            x: 60,
            y: 80,
          },
        ],
      },
    ],
    products: [products[0], products[1], products[2]],
    creator: {
      id: 'c1',
      name: 'John Doe',
      isCelebrity: false,
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: '2',
    title: 'Street Style Look',
    description: 'Urban street style with a modern twist',
    likes: 532,
    saves: 124,
    mediaItems: [
      {
        id: '3',
        type: 'image',
        url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTrY-2XUcWEg4LvM76izKiWopjGXFxg-TAHrmFIBqGhBNz3-D2TXM6dJ4NY0DStf0Efmmqso8XiPZa_4uXvINi5WD2846UU1UKCLodUbIauUoCg-E9H2dU',
        annotations: [
          {
            id: 'a4',
            productId: '2',
            x: 50,
            y: 60,
          },
          {
            id: 'a5',
            productId: '3',
            x: 70,
            y: 85,
          },
        ],
      },
      {
        id: '4',
        type: 'image',
        url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSbxUej8FnTBXQnygJybCaLNTmusog3oWWUGo9OpvwvPyenRInoiPgnkz83FDNsUgFTWFU2RWt5348jkTTryeG6TZAtiuCPYh0C0Sw4jo1MEWMw_VlsbrZQUUw&usqp=CAc',
        annotations: [
          {
            id: 'a6',
            productId: '4',
            x: 40,
            y: 50,
          },
          {
            id: 'a7',
            productId: '5',
            x: 60,
            y: 70,
          },
        ],
      },
    ],
    products: [products[1], products[2], products[3], products[4]],
    creator: {
      id: 'c2',
      name: 'Jane Smith',
      isCelebrity: true,
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    id: '3',
    title: 'Business Casual',
    description: 'Perfect for office and after-work events',
    likes: 187,
    saves: 56,
    mediaItems: [
      {
        id: '5',
        type: 'image',
        url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQUK6ExSLe-sIm0dJQRgzt3SCS5PVNjsJ64-fYHMJNjIXSqnaZSrx5O-qH1IuLxaFer7d_k2KyK1UQBromXIi99IlHHmMXa_qfc5x6zk_PF1hFM-EkHhR0DuA&usqp=CAc',
        annotations: [
          {
            id: 'a8',
            productId: '1',
            x: 35,
            y: 45,
          },
          {
            id: 'a9',
            productId: '4',
            x: 55,
            y: 65,
          },
        ],
      },
      {
        id: '6',
        type: 'video',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: 20,
        annotations: [
          {
            id: 'a10',
            productId: '5',
            x: 65,
            y: 75,
          },
        ],
      },
    ],
    products: [products[0], products[3], products[4]],
    creator: {
      id: 'c3',
      name: 'Alex Johnson',
      isCelebrity: false,
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
  },
];

export const sampleLookbook = {
  id: '1',
  title: 'Summer Collection 2024',
  description: 'Explore our latest summer collection with various looks',
  looks,
}; 
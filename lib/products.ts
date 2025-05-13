// This is a mock implementation. In a real app, you would use a database.
const products = [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        description: "Premium wireless headphones with noise cancellation and 20-hour battery life.",
        price: 129.99,
        oldPrice: 159.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "electronics",
        rating: 4.5,
        reviews: 128,
        colors: ["#000000", "#FFFFFF", "#0000FF"],
        features: [
          "Active Noise Cancellation",
          "20-hour battery life",
          "Bluetooth 5.0",
          "Built-in microphone",
          "Foldable design",
        ],
        specifications: {
          "Battery Life": "20 hours",
          Connectivity: "Bluetooth 5.0",
          Weight: "250g",
          Charging: "USB-C",
          Warranty: "1 year",
        },
      },
      {
        id: "2",
        name: "Smart Fitness Tracker",
        description: "Track your fitness goals with this waterproof smart fitness tracker.",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "electronics",
        rating: 4.2,
        reviews: 95,
        colors: ["#000000", "#FF0000", "#00FF00"],
        features: ["Heart rate monitoring", "Step counter", "Sleep tracking", "Waterproof (50m)", "7-day battery life"],
        specifications: {
          "Battery Life": "7 days",
          Connectivity: "Bluetooth 4.2",
          Weight: "28g",
          Charging: "Proprietary",
          Warranty: "1 year",
        },
      },
      {
        id: "3",
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and eco-friendly organic cotton t-shirt.",
        price: 24.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "clothing",
        rating: 4.8,
        reviews: 42,
        colors: ["#FFFFFF", "#000000", "#808080", "#0000FF"],
        features: [
          "100% organic cotton",
          "Eco-friendly dyes",
          "Comfortable fit",
          "Machine washable",
          "Sustainably sourced",
        ],
        specifications: {
          Material: "100% Organic Cotton",
          Sizes: "S, M, L, XL, XXL",
          Care: "Machine wash cold",
          Origin: "Made in USA",
          Certification: "GOTS Certified",
        },
      },
      {
        id: "4",
        name: "Stainless Steel Water Bottle",
        description: "Eco-friendly double-walled insulated water bottle.",
        price: 29.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "home",
        rating: 4.6,
        reviews: 78,
        colors: ["#C0C0C0", "#000000", "#0000FF", "#FF0000"],
        features: [
          "Double-walled insulation",
          "Keeps drinks cold for 24 hours",
          "Keeps drinks hot for 12 hours",
          "BPA-free",
          "Leak-proof design",
        ],
        specifications: {
          Capacity: "750ml",
          Material: "18/8 Stainless Steel",
          Weight: "350g",
          Dimensions: "27cm x 7.5cm",
          Warranty: "Lifetime",
        },
      },
      {
        id: "5",
        name: "Bestselling Novel",
        description: "The latest bestselling novel from a renowned author.",
        price: 14.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "books",
        rating: 4.9,
        reviews: 215,
        colors: [],
        features: [
          "Hardcover edition",
          "Award-winning author",
          "New York Times Bestseller",
          "Includes bonus chapter",
          "Signed by the author",
        ],
        specifications: {
          Pages: "384",
          Language: "English",
          Publisher: "Penguin Books",
          ISBN: "978-3-16-148410-0",
          "Publication Date": "2023",
        },
      },
      {
        id: "6",
        name: "Smart Home Speaker",
        description: "Voice-controlled smart speaker with premium sound quality.",
        price: 89.99,
        oldPrice: 119.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "electronics",
        rating: 4.3,
        reviews: 156,
        colors: ["#000000", "#FFFFFF", "#808080"],
        features: ["Voice control", "Multi-room audio", "Smart home integration", "High-fidelity sound", "Compact design"],
        specifications: {
          Connectivity: "Wi-Fi, Bluetooth",
          Power: "AC power",
          Dimensions: "15cm x 15cm x 15cm",
          Weight: "1.2kg",
          Warranty: "2 years",
        },
      },
      {
        id: "7",
        name: "Ergonomic Office Chair",
        description: "Comfortable ergonomic office chair with lumbar support.",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "home",
        rating: 4.7,
        reviews: 89,
        colors: ["#000000", "#808080"],
        features: ["Adjustable height", "Lumbar support", "Breathable mesh back", "360° swivel", "Quiet rolling wheels"],
        specifications: {
          Material: "Mesh, Foam, Metal",
          "Weight Capacity": "300lbs",
          Dimensions: "65cm x 65cm x 120cm",
          Assembly: "Required",
          Warranty: "5 years",
        },
      },
      {
        id: "8",
        name: "Professional Chef's Knife",
        description: "High-quality stainless steel chef's knife for professional cooking.",
        price: 79.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "home",
        rating: 4.8,
        reviews: 112,
        colors: [],
        features: [
          "High-carbon stainless steel",
          "Full tang construction",
          "Ergonomic handle",
          "Precision cutting",
          "Balanced weight",
        ],
        specifications: {
          "Blade Length": "8 inches",
          Material: "High-carbon stainless steel",
          Handle: "Pakkawood",
          Weight: "250g",
          Care: "Hand wash only",
        },
      },
    ]
    
    export async function getProducts(query = "", category = "") {
      let filteredProducts = [...products]
    
      if (query) {
        const searchQuery = query.toLowerCase()
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery),
        )
      }
    
      if (category) {
        filteredProducts = filteredProducts.filter((product) => product.category === category)
      }
    
      return filteredProducts
    }
    
    export async function getFeaturedProducts(query = "") {
      const allProducts = await getProducts(query)
      return allProducts.slice(0, 4)
    }
    
    export async function getProductById(id: string) {
      return products.find((product) => product.id === id) || null
    }
    
    export async function getRelatedProducts(category: string, currentProductId: string) {
      return products.filter((product) => product.category === category && product.id !== currentProductId).slice(0, 4)
    }
    
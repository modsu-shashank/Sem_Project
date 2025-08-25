import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

const mockProducts = [
  {
    id: "1",
    name: "Brown Rice",
    category: "Rice",
    image: "src/images/Brown Rice.webp",
    price: 300,
    grade: "A",
    rating: 3.5,
    description:
      "Brown rice is widely recognized as a healthier alternative to white rice. That's because it is a whole grain.",
    quantity: 100,
    reviews: [
      {
        id: "1",
        userId: "1",
        userName: "John Doe",
        rating: 4,
        comment: "Great quality brown rice, very fresh!",
        date: "2024-01-15",
      },
    ],
  },
  {
    id: "2",
    name: "Wild Rice",
    category: "Rice",
    image: "src/images/Wild Rice.webp",
    price: 350,
    grade: "A",
    rating: 3.5,
    description:
      "Wild rice is North America, specifically Minnesota and Ontario. Wild rice was a staple part of the indigenous peoples of that region.",
    quantity: 60,
    reviews: [],
  },
  {
    id: "3",
    name: "Basmati Rice",
    category: "Rice",
    image: "src/images/Basmati Rice.webp",
    price: 450,
    grade: "A",
    rating: 4.5,
    description:
      "Basmati rice is a variety of long, slender-grained aromatic rice which is traditionally from the Indian subcontinent.",
    quantity: 75,
    reviews: [],
  },
  {
    id: "4",
    name: "Jasmine Rice",
    category: "Rice",
    image: "src/images/jasmine.webp",
    price: 380,
    grade: "A",
    rating: 4.0,
    description:
      "Jasmine rice is a long-grain variety of rice that has a subtle floral aroma and a soft, sticky texture when cooked.",
    quantity: 85,
    reviews: [],
  },
  {
    id: "5",
    name: "Buckwheats",
    category: "Millets",
    image: "src/images/Buckwheats.webp",
    price: 300,
    grade: "A",
    rating: 3.5,
    description:
      "Buckwheat or common buckwheat is a flowering plant in the knotweed family. The seeds and as a cover crop.",
    quantity: 80,
    reviews: [],
  },
  {
    id: "6",
    name: "Sorghum",
    category: "Millets",
    image: "src/images/sorghum.webp",
    price: 280,
    grade: "B",
    rating: 3.8,
    description:
      "Sorghum is a genus of flowering plants in the grass family. Some species are grown for grain and many for forage.",
    quantity: 110,
    reviews: [],
  },
  {
    id: "7",
    name: "Pearl Millet",
    category: "Millets",
    image: "src/images/PearlMillet.webp",
    price: 180,
    grade: "A",
    rating: 4.1,
    description:
      "Pearl millet is a nutrient-rich cereal grain widely grown in arid and semi-arid regions. It is highly resilient to drought, rich in fiber, protein, and essential minerals, and is used to make porridge, flatbreads, and other traditional dishes.",
    quantity: 200,
    reviews: [],
  },
  {
    id: "8",
    name: "Foxtail Millet",
    category: "Millets",
    image: "src/images/Foxtail Millet.webp",
    price: 190,
    grade: "A",
    rating: 4.0,
    description:
      "Foxtail millet is a small, nutrient-dense cereal grain that is rich in protein, fiber, and essential minerals. It is highly versatile, used in porridge, upma, and traditional dishes, and is valued for its low glycemic index and health benefits.",
    quantity: 180,
    reviews: [],
  },
  {
    id: "9",
    name: "Wheat",
    category: "Grains",
    image: "src/images/Wheat.webp",
    price: 250,
    grade: "B",
    rating: 3.5,
    description:
      "Wheat is a cereal grain that is grown all over the world. Together with rice, it is a major source of food for humans and animals.",
    quantity: 120,
    reviews: [],
  },
  {
    id: "10",
    name: "Quinoa",
    category: "Grains",
    image: "src/images/Quinoa.webp",
    price: 400,
    grade: "A",
    rating: 4.2,
    description:
      "Quinoa is a flowering plant in the amaranth family. It is a herbaceous annual plant grown as a crop primarily for its edible seeds.",
    quantity: 90,
    reviews: [],
  },
  {
    id: "11",
    name: "Oats",
    category: "Grains",
    image: "src/images/Oats.webp",
    price: 220,
    grade: "A",
    rating: 4.2,
    description:
      "Oats are highly nutritious cereal grains known for their high fiber content and heart-healthy benefits. They are commonly used for porridge, muesli, baked goods, and smoothies, offering a mild flavor and versatile use in both sweet and savory dishes.",
    quantity: 200,
    reviews: [],
  },
  {
    id: "12",
    name: "Barley",
    category: "Grains",
    image: "src/images/Barley.webp",
    price: 210,
    grade: "A",
    rating: 4.1,
    description:
      "Barley is a versatile cereal grain known for its nutty flavor and high fiber content. It is commonly used in soups, stews, bread, and as a healthy breakfast grain, offering essential vitamins and minerals along with heart-healthy benefits.",
    quantity: 190,
    reviews: [],
  },
  {
    id: "13",
    name: "Lentils",
    category: "Pulses",
    image: "src/images/Lentils.webp",
    price: 180,
    grade: "A",
    rating: 4.1,
    description:
      "Lentils are edible legume seeds. They are a good source of protein, dietary fiber, and minerals.",
    quantity: 200,
    reviews: [],
  },
  {
    id: "14",
    name: "Chickpeas",
    category: "Pulses",
    image: "src/images/Chickpeas.webp",
    price: 220,
    grade: "A",
    rating: 4.3,
    description:
      "Chickpeas are a type of legume that are rich in protein, fiber, and several key minerals.",
    quantity: 160,
    reviews: [],
  },
  {
    id: "15",
    name: "Kidney Beans",
    category: "Pulses",
    image: "src/images/Kidney Beans.webp",
    price: 190,
    grade: "B",
    rating: 3.9,
    description:
      "Kidney beans are a variety of the common bean. They are named for their kidney-like shape and color.",
    quantity: 140,
    reviews: [],
  },
  {
    id: "16",
    name: "Black Peas",
    category: "Pulses",
    image: "src/images/Black Peas.webp",
    price: 210,
    grade: "A",
    rating: 4.0,
    description:
      "Black peas are a type of field pea that are commonly used in traditional British cuisine.",
    quantity: 130,
    reviews: [],
  },
  {
    id: "17",
    name: "Soybeans",
    category: "Seeds",
    image: "src/images/Soybeans.webp",
    price: 320,
    grade: "A",
    rating: 4.2,
    description:
      "Soybeans are a type of legume that are rich in protein and are used in many food products.",
    quantity: 95,
    reviews: [],
  },
  {
    id: "18",
    name: "Heirloom Seeds",
    category: "Seeds",
    image: "src/images/Heirloom.webp",
    price: 150,
    grade: "A",
    rating: 4.4,
    description:
      "Heirloom seeds are open-pollinated seeds that have been passed down through generations of gardeners.",
    quantity: 250,
    reviews: [],
  },
  {
    id: "19",
    name: "SoCal Flavor Trio Bush Bean Seeds",
    category: "Seeds",
    image: "src/images/SoCal Flavor Trio Bush Bean Seeds.webp",
    price: 200,
    grade: "A",
    rating: 4.3,
    description:
      "The SoCal Flavor Trio Bush Bean Seeds feature three flavorful bush bean varieties perfect for Southern California climates. These beans are easy to grow, productive, and ideal for fresh eating, canning, or freezing.",
    quantity: 180,
    reviews: [],
  },
  {
    id: "20",
    name: "Yellow Sugar Pod Snap Pea Seeds",
    category: "Seeds",
    image: "src/images/Yellow Sugar Pod Snap Pea Seeds.webp",
    price: 220,
    grade: "A",
    rating: 4.4,
    description:
      "Yellow Sugar Pod Snap Pea Seeds produce sweet, crisp yellow snap peas that are perfect for fresh salads, snacking, or stir-fries. These peas are easy to grow, high-yielding, and bring vibrant color to your garden.",
    quantity: 170,
    reviews: [],
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    return mockProducts.map((product) => ({
      ...product,
      reviews: product.reviews || [],
      rating: product.rating || 0,
      quantity: product.quantity || 0,
      price: product.price || 0,
    }));
  });

  const getProduct = (id) => {
    return products.find((product) => product.id === id);
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const searchProducts = (query) => {
    if (!query) return products;
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category?.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  const addReview = (productId, reviewData) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const newReview = {
            ...reviewData,
            id: Date.now().toString(),
            date: new Date().toISOString(),
          };
          const currentReviews = product.reviews || [];
          return {
            ...product,
            reviews: [...currentReviews, newReview],
            rating:
              Math.round(
                ((currentReviews.reduce((sum, r) => sum + r.rating, 0) +
                  newReview.rating) /
                  (currentReviews.length + 1)) *
                  10
              ) / 10, // Round to 1 decimal
          };
        }
        return product;
      })
    );
  };

  const value = {
    products,
    getProduct,
    getProductsByCategory,
    searchProducts,
    addReview,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

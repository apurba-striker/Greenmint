// seedData.js
const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config();

const samplePlants = [
  {
    name: "Money Plant (Golden Pothos)",
    price: 299,
    categories: ["Indoor", "Air Purifying", "Home Decor", "Low Maintenance"],
    availability: true,
    description: "Perfect indoor plant that purifies air and brings good luck",
    stockCount: 50
  },
  {
    name: "Snake Plant (Sansevieria)",
    price: 450,
    categories: ["Indoor", "Air Purifying", "Low Maintenance"],
    availability: true,
    description: "Hardy plant that thrives in low light conditions",
    stockCount: 30
  },
  {
    name: "Jade Plant",
    price: 350,
    categories: ["Succulent", "Indoor", "Low Maintenance"],
    availability: true,
    description: "Beautiful succulent known as the money tree",
    stockCount: 25
  },
  {
    name: "Aloe Vera",
    price: 250,
    categories: ["Succulent", "Medicinal", "Low Maintenance"],
    availability: true,
    description: "Medicinal plant with healing properties",
    stockCount: 40
  },
  {
    name: "Tulsi (Holy Basil)",
    price: 199,
    categories: ["Outdoor", "Medicinal", "Home Decor"],
    availability: true,
    description: "Sacred plant with medicinal benefits",
    stockCount: 35
  },
  {
    name: "Peace Lily",
    price: 399,
    categories: ["Indoor", "Air Purifying", "Flowering"],
    availability: true,
    description: "Beautiful flowering plant that purifies air",
    stockCount: 20
  },
  {
    name: "Spider Plant",
    price: 199,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Easy to grow hanging plant perfect for beginners",
    stockCount: 45
  },
  {
    name: "Rubber Plant",
    price: 549,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Large decorative plant with glossy leaves",
    stockCount: 15
  },
  {
    name: "Cactus Collection",
    price: 299,
    categories: ["Succulent", "Desktop", "Low Maintenance"],
    availability: true,
    description: "Set of small cacti perfect for desk decoration",
    stockCount: 60
  },
  {
    name: "Rose Plant",
    price: 399,
    categories: ["Outdoor", "Flowering"],
    availability: false,
    description: "Beautiful flowering rose plant",
    stockCount: 0
  },
  {
    name: "Fiddle Leaf Fig",
    price: 799,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Statement plant with large glossy leaves",
    stockCount: 12
  },
  {
    name: "ZZ Plant",
    price: 399,
    categories: ["Indoor", "Low Maintenance"],
    availability: true,
    description: "Nearly indestructible plant perfect for beginners",
    stockCount: 30
  },
  {
    name: "Monstera Deliciosa",
    price: 699,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Trendy plant with distinctive split leaves",
    stockCount: 18
  },
  {
    name: "Bamboo Plant",
    price: 149,
    categories: ["Indoor", "Home Decor", "Low Maintenance"],
    availability: true,
    description: "Lucky bamboo for good fortune",
    stockCount: 55
  },
  {
    name: "Lavender",
    price: 299,
    categories: ["Outdoor", "Flowering", "Medicinal"],
    availability: true,
    description: "Fragrant herb with purple flowers",
    stockCount: 25
  },
  {
    name: "Mint Plant",
    price: 99,
    categories: ["Outdoor", "Medicinal"],
    availability: true,
    description: "Fresh herb perfect for teas and cooking",
    stockCount: 70
  },
  {
    name: "Boston Fern",
    price: 349,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Lush green fern perfect for hanging baskets",
    stockCount: 22
  },
  {
    name: "Philodendron",
    price: 399,
    categories: ["Indoor", "Air Purifying"],
    availability: true,
    description: "Heart-shaped leaves that are easy to care for",
    stockCount: 35
  },
  {
    name: "Areca Palm",
    price: 599,
    categories: ["Indoor", "Air Purifying", "Home Decor"],
    availability: true,
    description: "Elegant palm that removes indoor air pollutants",
    stockCount: 16
  },
  {
    name: "English Ivy",
    price: 199,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Cascading vine perfect for hanging planters",
    stockCount: 40
  }
];

// Add more plants to reach 50+ items
const additionalPlants = [
  "Anthurium", "Begonia", "Caladium", "Dracaena", "Eucalyptus",
  "Geranium", "Hibiscus", "Jasmine", "Marigold", "Orchid",
  "Petunia", "Rosemary", "Sunflower", "Thyme", "Violet",
  "Zinnia", "Bird of Paradise", "Chinese Evergreen", "Dieffenbachia", "Ficus",
  "Haworthia", "Jade Tree", "Kalanchoe", "Lucky Bamboo", "Norfolk Pine",
  "Parlor Palm", "Pothos Marble", "Schefflera", "Tradescantia", "Yucca",
  "African Violet", "Bromeliad", "Croton", "Dragon Tree", "Fern Boston"
];

additionalPlants.forEach((plantName, index) => {
  const categories = ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Low Maintenance', 'Flowering', 'Medicinal', 'Hanging', 'Desktop'];
  const randomCategories = categories.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
  
  samplePlants.push({
    name: plantName,
    price: Math.floor(Math.random() * 800) + 150,
    categories: randomCategories,
    availability: Math.random() > 0.15, // 85% availability
    description: `Beautiful ${plantName.toLowerCase()} for your plant collection`,
    stockCount: Math.floor(Math.random() * 50) + 5
  });
});


const seedDatabase = async () => {
  try {
    // Use environment variable instead of hardcoded connection
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plant-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
    
    await Plant.deleteMany({});
    console.log('Cleared existing plants');
    
    await Plant.insertMany(samplePlants);
    console.log(`Added ${samplePlants.length} plants to database`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();


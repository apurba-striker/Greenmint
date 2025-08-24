// seedData.js - Using proper plant API approach
const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config();

// Using reliable placeholder service that won't fail
// const createPlantImage = (plantName, id) => {
//   // Using DiceBear API which is reliable and free
//   return `https://api.dicebear.com/7.x/shapes/svg?seed=${plantName}&backgroundColor=85C88A&size=500`;
// };

const samplePlants = [
  {
    name: "Money Plant (Golden Pothos)",
    price: 299,
    categories: ["Indoor", "Air Purifying", "Home Decor", "Low Maintenance"],
    availability: true,
    description: "Perfect indoor plant that purifies air and brings good luck. Easy to propagate and grow.",
    stockCount: 50,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Snake Plant (Sansevieria)",
    price: 450,
    categories: ["Indoor", "Air Purifying", "Low Maintenance"],
    availability: true,
    description: "Hardy plant with upright sword-like leaves that thrives in low light",
    stockCount: 30,
   image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Jade Plant",
    price: 350,
    categories: ["Succulent", "Indoor", "Low Maintenance"],
    availability: true,
    description: "Beautiful succulent with thick oval leaves, known as the money tree",
    stockCount: 25,
   image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Aloe Vera",
    price: 250,
    categories: ["Succulent", "Medicinal", "Low Maintenance"],
    availability: true,
    description: "Medicinal succulent with healing gel inside thick fleshy leaves",
    stockCount: 40,
   image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Peace Lily",
    price: 399,
    categories: ["Indoor", "Air Purifying", "Flowering"],
    availability: true,
    description: "Elegant flowering plant with white spathes that purifies indoor air",
    stockCount: 20,
   image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Spider Plant",
    price: 199,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Easy-care hanging plant with arching leaves and baby plantlets",
    stockCount: 45,
  image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Rubber Plant",
    price: 549,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Large decorative plant with thick glossy dark green leaves",
    stockCount: 15,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Monstera Deliciosa",
    price: 699,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Trendy plant with distinctive split leaves and fenestrations",
    stockCount: 18,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "ZZ Plant",
    price: 399,
    categories: ["Indoor", "Low Maintenance"],
    availability: true,
    description: "Nearly indestructible plant with waxy dark green leaves",
    stockCount: 30,
   image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Fiddle Leaf Fig",
    price: 799,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Statement plant with large violin-shaped glossy leaves",
    stockCount: 12,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Boston Fern",
    price: 349,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Lush feathery fern perfect for hanging baskets in humid spaces",
    stockCount: 22,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Bamboo Plant",
    price: 149,
    categories: ["Indoor", "Home Decor", "Low Maintenance"],
    availability: true,
    description: "Lucky bamboo stalks arranged for good fortune and feng shui",
    stockCount: 55,
   image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Lavender",
    price: 299,
    categories: ["Outdoor", "Flowering", "Medicinal"],
    availability: true,
    description: "Fragrant herb with purple flower spikes perfect for aromatherapy",
    stockCount: 25,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Mint Plant",
    price: 99,
    categories: ["Outdoor", "Medicinal"],
    availability: true,
    description: "Fresh aromatic herb perfect for teas, cooking and natural remedies",
    stockCount: 70,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Sunflower",
    price: 199,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Bright yellow flowers that follow the sun throughout the day",
    stockCount: 25,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Rose Plant",
    price: 399,
    categories: ["Outdoor", "Flowering"],
    availability: false,
    description: "Classic flowering plant with fragrant colorful blooms",
    stockCount: 0,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Orchid",
    price: 799,
    categories: ["Indoor", "Flowering"],
    availability: true,
    description: "Elegant flowering plant with delicate exotic blooms",
    stockCount: 14,
 image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Cactus Collection",
    price: 299,
    categories: ["Succulent", "Desktop", "Low Maintenance"],
    availability: true,
    description: "Assorted small cacti perfect for desk decoration",
    stockCount: 60,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Areca Palm",
    price: 599,
    categories: ["Indoor", "Air Purifying", "Home Decor"],
    availability: true,
    description: "Elegant feathery palm that removes indoor air pollutants",
    stockCount: 16,
 image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "English Ivy",
    price: 199,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Cascading evergreen vine perfect for hanging planters",
    stockCount: 40,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Philodendron",
    price: 399,
    categories: ["Indoor", "Air Purifying"],
    availability: true,
    description: "Heart-shaped leaves that are easy to care for and fast-growing",
    stockCount: 35,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Anthurium",
    price: 549,
    categories: ["Indoor", "Flowering", "Home Decor"],
    availability: true,
    description: "Exotic flowering plant with glossy heart-shaped red blooms",
    stockCount: 18,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Begonia",
    price: 299,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Colorful flowering plant with waxy leaves perfect for gardens",
    stockCount: 32,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Geranium",
    price: 199,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Classic garden flower with bright cheerful blooms",
    stockCount: 39,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Petunia",
    price: 149,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Trumpet-shaped flowers in vibrant colors for outdoor gardens",
    stockCount: 48,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Marigold",
    price: 99,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Bright orange and yellow flowers with pest-repelling properties",
    stockCount: 65,
 image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Hibiscus",
    price: 449,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Tropical flowering shrub with large colorful trumpet blooms",
    stockCount: 20,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Jasmine",
    price: 299,
    categories: ["Outdoor", "Flowering", "Medicinal"],
    availability: true,
    description: "Fragrant climbing vine with small white or yellow flowers",
    stockCount: 27,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Rosemary",
    price: 179,
    categories: ["Outdoor", "Medicinal"],
    availability: true,
    description: "Aromatic evergreen herb perfect for cooking and aromatherapy",
    stockCount: 38,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Thyme",
    price: 129,
    categories: ["Outdoor", "Medicinal"],
    availability: true,
    description: "Small aromatic herb with tiny purple flowers",
    stockCount: 45,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Tulsi (Holy Basil)",
    price: 199,
    categories: ["Outdoor", "Medicinal", "Home Decor"],
    availability: true,
    description: "Sacred aromatic herb with medicinal and spiritual significance",
    stockCount: 35,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Eucalyptus",
    price: 349,
    categories: ["Outdoor", "Medicinal"],
    availability: true,
    description: "Aromatic tree with distinctive silvery-blue leaves",
    stockCount: 24,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Zinnia",
    price: 149,
    categories: ["Outdoor", "Flowering"],
    availability: true,
    description: "Bright daisy-like annual flowers in various colors",
    stockCount: 42,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Violet",
    price: 199,
    categories: ["Indoor", "Flowering"],
    availability: true,
    description: "Delicate purple flowers with heart-shaped leaves",
    stockCount: 35,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Bird of Paradise",
    price: 899,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Stunning tropical plant with large paddle-shaped leaves",
    stockCount: 8,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Haworthia",
    price: 199,
    categories: ["Succulent", "Desktop", "Low Maintenance"],
    availability: true,
    description: "Small striped succulent with thick pointed leaves",
    stockCount: 55,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Kalanchoe",
    price: 249,
    categories: ["Succulent", "Flowering", "Low Maintenance"],
    availability: true,
    description: "Succulent with clusters of small colorful flowers",
    stockCount: 33,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Lucky Bamboo",
    price: 99,
    categories: ["Indoor", "Home Decor", "Low Maintenance"],
    availability: true,
    description: "Traditional feng shui plant arranged in decorative patterns",
    stockCount: 75,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Norfolk Pine",
    price: 699,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Indoor evergreen tree perfect as a living Christmas tree",
    stockCount: 12,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Parlor Palm",
    price: 449,
    categories: ["Indoor", "Air Purifying", "Low Maintenance"],
    availability: true,
    description: "Compact elegant palm perfect for low-light indoor spaces",
    stockCount: 22,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Pothos Marble",
    price: 349,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    availability: true,
    description: "Variegated pothos with beautiful white and green marble patterns",
    stockCount: 29,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Yucca",
    price: 649,
    categories: ["Indoor", "Low Maintenance"],
    availability: true,
    description: "Tall plant with sword-like leaves that tolerates neglect",
    stockCount: 14,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "African Violet",
    price: 249,
    categories: ["Indoor", "Flowering"],
    availability: true,
    description: "Compact flowering plant with velvety leaves and purple blooms",
    stockCount: 31,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Bromeliad",
    price: 599,
    categories: ["Indoor", "Flowering", "Home Decor"],
    availability: true,
    description: "Tropical plant with colorful bracts and rosette growth pattern",
    stockCount: 16,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Croton",
    price: 449,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Colorful foliage plant with vibrant yellow red and green leaves",
    stockCount: 21,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Dragon Tree",
    price: 799,
    categories: ["Indoor", "Home Decor", "Air Purifying"],
    availability: true,
    description: "Architectural plant with spiky red-edged leaves",
    stockCount: 11,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Ficus",
    price: 599,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Classic indoor tree with small glossy green leaves",
    stockCount: 16,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Chinese Evergreen",
    price: 399,
    categories: ["Indoor", "Air Purifying", "Low Maintenance"],
    availability: true,
    description: "Colorful foliage plant with patterned leaves that tolerates low light",
    stockCount: 28,
    image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Dieffenbachia",
    price: 449,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Large tropical plant with beautiful variegated leaf patterns",
    stockCount: 19,
 image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Schefflera",
    price: 499,
    categories: ["Indoor", "Home Decor"],
    availability: true,
    description: "Umbrella plant with glossy compound leaves arranged in clusters",
    stockCount: 18,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*"
  },
  {
    name: "Tradescantia",
    price: 199,
    categories: ["Indoor", "Hanging"],
    availability: true,
    description: "Purple heart plant with colorful trailing vines",
    stockCount: 41,
   image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  },
  {
    name: "Caladium",
    price: 399,
    categories: ["Indoor", "Home Decor"],
    availability: false,
    description: "Heart-shaped leaves with stunning pink white and green patterns",
    stockCount: 0,
image:"https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747253978-.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/plant-store';
    console.log('🔗 Connecting to:', connectionString.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    const deleteResult = await Plant.deleteMany({});
    console.log(`🗑️ Cleared ${deleteResult.deletedCount} existing plants`);
    
    const insertResult = await Plant.insertMany(samplePlants);
    console.log(`✅ Added ${insertResult.length} plants to database`);
    
    const count = await Plant.countDocuments();
    console.log(`📊 Total plants in database: ${count}`);
    
    const categories = await Plant.distinct('categories');
    console.log(`🏷️ Available categories: ${categories.join(', ')}`);
    
    const availableCount = await Plant.countDocuments({ availability: true });
    const outOfStockCount = await Plant.countDocuments({ availability: false });
    console.log(`📦 Available plants: ${availableCount}`);
    console.log(`❌ Out of stock: ${outOfStockCount}`);
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, samplePlants };

const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./db");
const MenuItem = require("./models/MenuItem");
const User = require("./models/User"); // Import User model
const bcrypt = require("bcryptjs");

const menuItems = [
  { id: 1, name: "Spring Rolls", price: 5.99, category: "Appetizers", Image: "springRolls.jpg" },
  { id: 2, name: "Garlic Bread", price: 4.99, category: "Appetizers", Image: "garlicBread.jpg" },
  { id: 3, name: "Guacamole", price: 4.99, category: "Appetizers", Image: "guacamole.jpg" },
  { id: 4, name: "Spicy Lebanese Potatos", price: 4.99, category: "Appetizers", Image: "BatataHarra.jpg" },
  { id: 5, name: "Warak Enab", price: 4.99, category: "Appetizers", Image: "warakEnab.jpg" },
  { id: 6, name: "Hummos", price: 4.99, category: "Appetizers", Image: "Hommus.jpg" },
  { id: 7, name: "Baba Ghanoush", price: 4.99, category: "Appetizers", Image: "babaGhanoush.jpg" },
  { id: 8, name: "French Fries", price: 4.99, category: "Appetizers", Image: "French fries.jpg" },
  { id: 9, name: "Wedges Fries", price: 4.99, category: "Appetizers", Image: "wedges.jpg" },
  { id: 10, name: "Onion Rings", price: 4.99, category: "Appetizers", Image: "onionRings.jpg" },
  { id: 11, name: "Cheese Balls", price: 4.99, category: "Appetizers", Image: "cheeseBalls.jpg" },
  { id: 12, name: "Mozzarela Sticks", price: 4.99, category: "Appetizers", Image: "mozzerllaSticks.jpg" },
  { id: 13, name: "Grilled Chicken Plate", price: 12.99, category: "OurPlates", Image: "chickenPlate.jpg" },
  { id: 14, name: "Grilled Beef Plate", price: 12.99, category: "OurPlates", Image: "beefPlate.jpg" },
  { id: 15, name: "Beef Mushroom Steak Plate", price: 14.99, category: "OurPlates", Image: "mushroomSteakPlate.jpg" },
  { id: 16, name: "Chicken Mushroom Plate", price: 4.99, category: "OurPlates", Image: "chickenMushroomplate.jpg" },
  { id: 17, name: "Salmon Fillet Plate", price: 15.99, category: "OurPlates", Image: "salmonPlate.jpg" },
  { id: 18, name: "Escalope Plate", price: 4.99, category: "OurPlates", Image: "escalopePlate.jpg" },
  { id: 19, name: "Shrimp Plate", price: 4.99, category: "OurPlates", Image: "shrimpPlate.jpg" },
  { id: 20, name: "Classic Beef Burger", price: 8.99, category: "BeefBurgers", Image: "LebaneseBurger.jpeg" },
  { id: 21, name: "Cheeseburger", price: 9.99, category: "BeefBurgers", Image: "cheeseBurger.jpg" },
  { id: 22, name: "Mushroom Burger", price: 8.6, category: "BeefBurgers", Image: "swissMushroomBurger.jpg" },
  { id: 23, name: "Classic Chicken Burger", price: 7.99, category: "ChickenBurgers", Image: "classicBurger.jpg" },
  { id: 24, name: "Zinger Burger", price: 8.99, category: "ChickenBurgers", Image: "ZingerBurger.jpg" },
  { id: 25, name: "Crunchy Chicken Burger", price: 4.99, category: "ChickenBurgers", Image: "crunchyBurger.jpg" },
  { id: 26, name: "Chicken Sub", price: 6.99, category: "Sandwiches", Image: "CesarSandwich.jpg" },
  { id: 27, name: "Escalope", price: 7.99, category: "Sandwiches", Image: "escalopeSub.jpeg" },
  { id: 28, name: "Philladelphia", price: 7.99, category: "Sandwiches", Image: "phillySandwich.jpg" },
  { id: 29, name: "Shrimp", price: 4.99, category: "Sandwiches", Image: "ShrimpSandwich.jpg" },
  { id: 30, name: "Greek Salad", price: 5.99, category: "Salads", Image: "GreekSalad.jpg" },
  { id: 31, name: "Caesar Salad", price: 6.99, category: "Salads", Image: "CesarSalad.jpg" },
  { id: 32, name: "Fattoush", price: 4.99, category: "Salads", Image: "fattoush.jpg" },
  { id: 33, name: "Tabbouleh", price: 4.99, category: "Salads", Image: "TabboulehSalad.jpg" },
  { id: 34, name: "Margherita Pizza", price: 9.99, category: "Pizza", Image: "pizzaMarg.jpg" },
  { id: 35, name: "Pepperoni Pizza", price: 10.99, category: "Pizza", Image: "pepperoniPizza.jpg" },
  { id: 36, name: "Vegetarian Pizza", price: 11.99, category: "Pizza", Image: "veganPizza.jpg" },
  { id: 37, name: "Shrimp Pizza", price: 12.99, category: "Pizza", Image: "shrimpPizza.jpg" },
  { id: 38, name: "Spaghetti Bolognese", price: 10.99, category: "Pasta", Image: "SpaghettiBolognese.jpg" },
  { id: 39, name: "Fettuccine Alfredo", price: 11.99, category: "Pasta", Image: "chickenAlfredo.jpg" },
  { id: 40, name: "Tomato Sauce Pasta", price: 12.99, category: "Pasta", Image: "tomatoPasta.jpg" },
  { id: 41, name: "Shrimp Pasta", price: 13.99, category: "Pasta", Image: "shrimpPasta.jpg" },
  { id: 42, name: "Garlic Sauce", price: 1.99, category: "DippingSauces", Image: "GarlicSauce.jpg" },
  { id: 43, name: "Cheddar Sauce", price: 1.99, category: "DippingSauces", Image: "cheddar.jpg" },
  { id: 44, name: "Barbecue Sauce", price: 1.99, category: "DippingSauces", Image: "bpq.jpg" },
  { id: 45, name: "Ranch Sauce", price: 1.99, category: "DippingSauces", Image: "ranchSauce.jpg" },
  { id: 46, name: "Honey Mustard Sauce", price: 1.99, category: "DippingSauces", Image: "honeyMustard.jpg" },
  { id: 47, name: "Coca-Cola", price: 1.99, category: "Drinks", Image: "cocaCola.jpg" },
  { id: 48, name: "Pepsi", price: 1.99, category: "Drinks", Image: "Pepsi.jpg" },
  { id: 49, name: "Sprite", price: 1.99, category: "Drinks", Image: "sprite.jpg" },
  { id: 50, name: "Lemonade", price: 2.49, category: "Drinks", Image: "lemonade.jpg" }
];

const seedDB = async () => {
  try {
    // Re-creates tables automatically in MySQL
    await sequelize.sync({ force: true });

    // Seed Menu Items
    await MenuItem.bulkCreate(menuItems);

    // Seed Default User
    const hashedPassword = await bcrypt.hash("12345678", 10);
    await User.create({
      name: "Mariam Fakih",
      email: "mariamahmadfakih2004@gmail.com",
      password: hashedPassword,
    });

    console.log("MySQL Database seeded with Menu Items AND User successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
// Destination data for the "Popular Destinations" section.
// main.js reads this list and builds one card per destination,
// so adding a destination only means adding an object here.
// rating: a number from 0 to 5, or null when there is no rating yet.
const destinations = [
  {
    name: '"Somewhere Near Mount Fuji"',
    region: "Central Honshu, Japan",
    image: "Japanimage/andy-photos/IMG_7532.JPG",
    alt: "Waterfall and green cliffs near Mount Fuji",
    price: "Free",
    rating: null,
    description:
      'Photo is provided by an anonymous source. Source location: "Somewhere near Mount Fuji."',
    address: "Somewhere Near Mount Fuji",
    mapUrl: null,
    days: 4,
    nights: 3,
  },
  {
    name: "Mount Fuji",
    region: "Central Honshu, Japan",
    image: "Japanimage/andy-photos/IMG_7528.JPG",
    alt: "Mount Fuji",
    price: "$13-$14",
    rating: 4.6,
    description:
      "Mount Fuji is a beautiful place and is well renowned internationally as Japan's highest peak. " +
      "As a result of its growing fame, there has been a significant increase in the number of tourists " +
      "causing the prefectural government to start charging tourists for admission. This was done as a " +
      "means to slow the number of incoming tourists as well as preserve the beauty of Mount Fuji. " +
      'If you are planning a trip to Mount Fuji, please visit the link <a href="https://www.fujisan-climb.jp/en/" target="_blank" rel="noopener">Here</a> to learn more.',
    address: "Kitayama, Fujinomiya, Shizuoka 418-0112, Japan",
    mapUrl: "https://www.google.com/maps/place/mount+fuji",
    days: 4,
    nights: 3,
  },
  {
    name: "Tokyo Skytree",
    region: "Sumida City, Tokyo, Japan",
    image: "Japanimage/andy-photos/IMG_7520.JPG",
    alt: "Tokyo Skytree",
    price: "$14-$24",
    rating: 4.5,
    description:
      'The Tokyo Skytree provides the "Tembo Deck" ticket at $14 dollars per adult which allows you to ' +
      "enter the tower up to 350 meters. In order to get to the top floor, the admission fee raises an " +
      'extra $10. If you are interested in learning more, please visit the link <a href="https://www.tokyo-skytree.jp/en/ticket/individual/" target="_blank" rel="noopener">Here</a>.',
    address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan",
    mapUrl: "https://www.google.com/maps/place/Tokyo+Skytree",
    days: 4,
    nights: 3,
  },
];

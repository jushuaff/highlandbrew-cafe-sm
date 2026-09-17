import galleryTerrace from '../assets/images/highland-brew/highland-brew-terrace.jpg';
import galleryCoffee from '../assets/images/highland-brew/highland-brew-cafe.jpg';
import galleryPastry from '../assets/images/highland-brew/highland-brew-dessert.jpg';
import galleryInterior from '../assets/images/highland-brew/highland-brew-sm.png';
import galleryMenu from '../assets/images/highland-brew/highland-brew-sm-baguio.jpg';

export const siteData = {
  businessName: 'Highland Brew Cafe',
  locationLabel: 'SM City Baguio',
  phone: '(074) 422-3725',
  phoneHref: 'tel:+63744223725',
  email: 'highlandbrewcafe@gmail.com',
  emailHref: 'mailto:highlandbrewcafe@gmail.com',
  address: 'Level 3 / Sky Terrace, SM City Baguio, Luneta Hill Drive, Baguio City, Benguet 2600',
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Highland+Brew+Cafe+SM+City+Baguio+Luneta+Hill+Drive+Baguio+City+Benguet',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Highland%20Brew%20Cafe%20-%20SM%20City%20Baguio%20Luneta%20Hill%20Drive%20Baguio%20City%20Benguet&output=embed',
  navItems: [
    { label: 'Home', href: '#home' },
    { label: 'Our Coffee', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Experience', href: '#experience' },
    { label: 'Locations', href: '#locations' },
    { label: 'Contact', href: '#contact' },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/highlandbrewcafe/' },
    { label: 'Instagram', href: 'https://www.instagram.com/highlandbrewbaguio/' },
  ],
};

export const featureDrinks = [
  {
    name: 'Mt. Pulag Cloud',
    note: 'A comforting café signature built for cool mountain afternoons.',
    accent: 'cloud',
  },
  {
    name: 'Mt. Ulap Tiramisu',
    note: 'Layered and indulgent, a distinct Highland Brew favorite.',
    accent: 'mist',
  },
  {
    name: 'Mt. Kalugong Caramel Flan',
    note: 'Smooth, sweet and richly layered with caramel depth.',
    accent: 'pine',
  },
  {
    name: 'Mt. Amuyao Mocha Crumble',
    note: 'A warm, textured mocha with a comforting finish.',
    accent: 'ember',
  },
  {
    name: 'Mt. Timbak Salted Caramel Choco',
    note: 'Rich and mellow with a gentle caramel finish.',
    accent: 'terrain',
  },
  {
    name: 'Honey Latte',
    note: 'A naturally sweet café classic with a mellow finish.',
    accent: 'sunrise',
  },
  {
    name: 'Coffee Crema',
    note: 'Balanced and smooth, made for slow sipping.',
    accent: 'mist',
  },
  {
    name: 'Mocha',
    note: 'A familiar favorite with a premium Highland Brew spin.',
    accent: 'cloud',
  },
  {
    name: 'Black Coffee',
    note: 'Simple, direct and grounded in the taste of coffee itself.',
    accent: 'stone',
  },
];

export const galleryImages = [
  {
    title: 'Sky Terrace atmosphere',
    caption: 'Mountain air, open terrace energy, and Baguio daylight.',
    alt: 'Highland Brew cafe terrace and mountain atmosphere',
    className: 'tall',
    image: galleryTerrace,
  },
  {
    title: 'Coffee ritual',
    caption: 'Cordilleran coffee served with a premium café touch.',
    alt: 'Coffee service at Highland Brew Cafe',
    className: 'wide',
    image: galleryCoffee,
  },
  {
    title: 'Local pastry favorites',
    caption: 'Baguio-inspired sweet treats and pastry moments.',
    alt: 'Highland Brew pastries and local sweets',
    className: 'square',
    image: galleryPastry,
  },
  {
    title: 'Interior mood',
    caption: 'A warm and layered café experience shaped by the mountains.',
    alt: 'Interior seating and café atmosphere at Highland Brew',
    className: 'wide',
    image: galleryInterior,
  },
  {
    title: 'Brand identity',
    caption: 'Coffee culture rooted in the Cordillera and Baguio.',
    alt: 'Highland Brew branding and café identity',
    className: 'square',
    image: galleryCoffee,
  },
  {
    title: 'Adventure-driven menu',
    caption: 'Mountain names, cool-weather flavor, and local identity.',
    alt: 'Highland Brew menu exploration featured drinks',
    className: 'tall',
    image: galleryMenu,
  },
];

import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1-pack',
    name: 'CAFEPROTEICO - 1 Pack',
    description: 'Prueba individual. Energía pura.',
    price: 6,
    packSize: 1,
    image: 'https://res.cloudinary.com/dr3kq8bpj/image/upload/v1770839351/Image_202602101444_quzuz4.jpg'
  },
  {
    id: '3-pack',
    name: 'CAFEPROTEICO - 3 Pack',
    description: 'El boost necesario para el fin de semana.',
    price: 8,
    packSize: 3,
    image: 'https://res.cloudinary.com/dr3kq8bpj/image/upload/v1770839351/Image_202602101443_rfrp50.jpg'
  },
  {
    id: '4-pack',
    name: 'CAFEPROTEICO - 4 Pack',
    description: 'Equilibrio perfecto entre precio y cantidad.',
    price: 9,
    packSize: 4,
    image: 'https://res.cloudinary.com/dr3kq8bpj/image/upload/v1770839351/Image_202602101444_quzuz4.jpg'
  },
  {
    id: '6-pack',
    name: 'CAFEPROTEICO - 6 Pack',
    description: 'La opción de los campeones. Mejor valor.',
    price: 10,
    packSize: 6,
    image: 'https://res.cloudinary.com/dr3kq8bpj/image/upload/v1770839351/Image_202602101443_rfrp50.jpg'
  }
];

export const NAV_LINKS = [
  { name: 'Producto', href: '#products' },
  { name: 'Ingredientes', href: '#features' },
  { name: 'Nutrición', href: '#nutrition' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contacto', href: '#contact' },
];

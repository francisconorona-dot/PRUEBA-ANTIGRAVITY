import React from 'react';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter">POWER DRINK</h2>
          <p className="text-gray-500 text-sm">
            Redefiniendo la nutrición deportiva con sabor y tecnología.
          </p>
          <div className="flex gap-4">
            <Instagram className="text-gray-400 hover:text-white cursor-pointer" />
            <Twitter className="text-gray-400 hover:text-white cursor-pointer" />
            <Facebook className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-6">Explorar</h3>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#products" className="hover:text-white">Productos</a></li>
            <li><a href="#nutrition" className="hover:text-white">Nutrición</a></li>
            <li><a href="#blog" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6">Contacto</h3>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} /> 123 Street, Gym City, GC 10293
            </li>
            <li className="flex gap-3">
              <Phone size={16} /> +1 (555) 123-4567
            </li>
            <li className="flex gap-3">
              <Mail size={16} /> support@powerdrink.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6">Newsletter</h3>
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Tu email..." 
              className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white/30"
            />
            <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm uppercase">
              Suscribirse
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; 2024 POWER DRINK Inc. Todos los derechos reservados.</p>
        <p>Designed with ❤️ for Champions.</p>
      </div>
    </footer>
  );
};

export default Footer;

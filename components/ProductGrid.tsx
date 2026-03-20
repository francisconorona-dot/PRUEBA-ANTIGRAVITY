import React from 'react';
import { PRODUCTS } from '../constants';
import { ShoppingCart } from 'lucide-react';

const ProductGrid = () => {
  return (
    <section id="products" className="py-24 bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">Nuestros Packs</h2>
          <p className="text-gray-400">Elige tu dosis de poder.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-[#111] rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-white/5 transition-all duration-500 border border-white/5">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.packSize} Latas
                  </span>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${product.price}</span>
                  <button 
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors group-hover:scale-110 cursor-not-allowed opacity-80"
                    title="Usa a Sakura para pedir"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <p className="text-xs text-center text-gray-600 italic">
                  * Habla con Sakura para agregar al carrito
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

import React, { useState, useCallback } from 'react';
import HeroVideoScroll from './components/HeroVideoScroll';
import VoiceAgent from './components/VoiceAgent';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { PRODUCTS, NAV_LINKS } from './constants';
import { CartItem } from './types';
import { ShoppingBag, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function called by Gemini Agent
  const handleAddToCart = useCallback((productNameOrPackSize: string, quantity: number): string => {
    // Basic fuzzy matching logic for product selection
    const product = PRODUCTS.find(p => 
      p.id.includes(productNameOrPackSize.toLowerCase()) || 
      p.name.toLowerCase().includes(productNameOrPackSize.toLowerCase()) ||
      (productNameOrPackSize.includes('pack') && productNameOrPackSize.includes(p.packSize.toString()))
    );

    if (product) {
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...prev, { ...product, quantity }];
      });
      setIsCartOpen(true); // Auto open cart
      return `Agregado ${quantity} packs de ${product.name} al carrito.`;
    }
    
    return "No pude encontrar ese producto específico. Intenta decir '6 pack' o '1 pack'.";
  }, []);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="bg-black text-white min-h-screen font-poppins selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-extrabold tracking-tighter">POWER DRINK.</a>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10 py-4 px-6 space-y-4">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block text-gray-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <HeroVideoScroll />
        <Features />
        <ProductGrid />
        <Testimonials />
        <Blog />
      </main>

      <Footer />

      {/* Floating Elements */}
      <VoiceAgent onAddToCart={handleAddToCart} />
      <CartSidebar 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cart={cart} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart} 
      />

      {/* WhatsApp Floating */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 left-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c1.024.558 2.05.86 3.197.863h.001c3.181 0 5.766-2.586 5.767-5.766.001-3.181-2.587-5.767-5.768-5.767zm6.756 7.848c-.287.807-1.674 1.486-2.292 1.581-.462.071-1.071.132-2.883-.628-2.316-.97-3.804-3.328-3.921-3.484-.114-.155-.935-1.244-.935-2.373 0-1.129.588-1.685.795-1.914.195-.215.525-.269.83-.269.255 0 .509.009.61.022.198.026.467.098.66.568.21.509.715 1.764.777 1.892.062.128.103.277.015.452-.089.176-.134.285-.263.43-.129.145-.27.323-.385.433-.131.124-.268.261-.116.516.153.256.681 1.122 1.464 1.821 1.007.898 1.855 1.176 2.116 1.304.261.128.413.107.568-.07.155-.177.666-.777.846-1.043.179-.266.357-.222.599-.133.242.089 1.536.726 1.799.857.263.131.439.196.502.304.064.108.064.629-.222 1.435z"/>
        </svg>
      </a>

    </div>
  );
};

export default App;

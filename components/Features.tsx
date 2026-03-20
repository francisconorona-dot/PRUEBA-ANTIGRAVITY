import React from 'react';
import { Leaf, Award, Zap, Truck, Check } from 'lucide-react';

const Features = () => {
  return (
    <>
      {/* About */}
      <section className="py-20 bg-black text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">Nuestra Historia</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">15 Años de Tradición</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Nacidos en la búsqueda de la energía perfecta. Combinamos los granos de café más selectos con proteína aislada de alta pureza.
            Sin rellenos, sin mentiras. Solo potencia líquida.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            <div className="p-6 border border-white/10 rounded-2xl">
              <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Natural</p>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl">
              <h3 className="text-4xl font-bold text-white mb-2">25g</h3>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Proteína</p>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl">
              <h3 className="text-4xl font-bold text-white mb-2">0g</h3>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Azúcar Añadida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sakura */}
      <section id="features" className="py-24 bg-[#0a0a0a] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué SAKURA?</h2>
            <p className="text-gray-400">La tecnología y la naturaleza en una lata.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "100% Natural", desc: "Ingredientes seleccionados a mano." },
              { icon: Award, title: "Receta Auténtica", desc: "Sabor real a café, no a químicos." },
              { icon: Zap, title: "Agente Sakura", desc: "Compra por voz con IA avanzada." },
              { icon: Truck, title: "Entrega Rápida", desc: "De la fábrica a tu gym en 24h." }
            ].map((f, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                <f.icon className="w-10 h-10 text-white mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section id="nutrition" className="py-24 bg-black px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold">Nutrición de Élite</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-gray-400">Proteína</span>
                <span className="text-2xl font-bold">25g</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-gray-400">Calorías</span>
                <span className="text-2xl font-bold">120 kcal</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-gray-400">Cafeína</span>
                <span className="text-2xl font-bold">200mg</span>
              </div>
            </div>
            <ul className="space-y-2 pt-4">
               {['Sin gluten', 'Sin lactosa', 'Keto friendly'].map((item, i) => (
                 <li key={i} className="flex items-center gap-2 text-gray-400">
                   <Check size={16} className="text-green-500" /> {item}
                 </li>
               ))}
            </ul>
          </div>
          <div className="flex-1 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-[100px] opacity-20"></div>
             <img 
               src="https://res.cloudinary.com/dr3kq8bpj/image/upload/v1770839351/Image_202602101444_quzuz4.jpg" 
               alt="Nutrition Can" 
               className="relative z-10 w-full max-w-sm mx-auto rounded-3xl rotate-6 shadow-2xl hover:rotate-0 transition-transform duration-700" 
              />
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;

import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: "Carlos M.",
    role: "CrossFit Athlete",
    text: "El sabor es increíble. No parece una bebida de proteína. Me da la energía justa sin el bajón de azúcar.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Sofia R.",
    role: "Developer",
    text: "Paso horas programando y entrenando. CAFEPROTEICO es mi combustible diario. Sakura es súper útil.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Javier T.",
    role: "Marathon Runner",
    text: "Digestión ligera y recuperación rápida. Los packs de 6 son perfectos para mi semana.",
    image: "https://picsum.photos/100/100?random=3"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Lo que dicen los Campeones</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div key={idx} className="bg-[#111] p-8 rounded-2xl border border-white/5 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full grayscale" />
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

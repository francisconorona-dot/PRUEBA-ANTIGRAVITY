import React from 'react';

const POSTS = [
  {
    category: "Nutrición",
    title: "Macro-nutrientes: La verdad oculta",
    excerpt: "Entiende cómo la proteína aislada mejora tu recuperación muscular comparada con otras fuentes.",
    image: "https://picsum.photos/400/300?random=10"
  },
  {
    category: "Estilo de Vida",
    title: "Beneficios del Café antes de entrenar",
    excerpt: "Por qué la cafeína natural es el mejor pre-workout que existe en la naturaleza.",
    image: "https://picsum.photos/400/300?random=11"
  },
  {
    category: "Ciencia",
    title: "Nuestra Proteína: Proceso de Filtrado",
    excerpt: "Un vistazo dentro de nuestra fábrica y cómo logramos 0g de azúcar.",
    image: "https://picsum.photos/400/300?random=12"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-[#080808] px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Blog & Noticias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{post.category}</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-gray-300 transition-colors">{post.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

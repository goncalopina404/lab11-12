'use client';

import tecnologias from '@/app/data/tecnologias.json';

export default function TecnologiasPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Tecnologias Aprendidas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tecnologias.map((tech) => (
          <div
            key={tech.title}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={tech.image}
              alt={tech.title}
              className="w-full h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{tech.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{tech.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-yellow-500 font-bold">
                ⭐ {tech.rating.rate}
              </span>
              <span className="text-gray-500 text-sm">
                ({tech.rating.count} reviews)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


'use client';

import React from 'react';
import Image from 'next/image';
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto">
      {/* Imagem do Produto */}
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>

      {/* Detalhes do Produto */}
      <h2 className="text-lg font-bold text-gray-800 mt-4">{product.title}</h2>
      <p className="text-gray-600 text-sm mt-2">{product.description}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-800 font-semibold">{`$${product.price}`}</p>
        <p className="text-gray-600 text-sm">{`${product.rating.rate} ⭐ (${product.rating.count} reviews)`}</p>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition">
        Comprar
      </button>
    </div>
  );
};

export default Card;

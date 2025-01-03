'use client'; // Garantir que o código seja executado no lado do cliente

import React, { useState } from 'react';
import useSWR from 'swr';
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
  onAddToCart: (product: Product) => void;
}

const Card: React.FC<CardProps> = ({ product, onAddToCart }) => {
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

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
        onClick={() => onAddToCart(product)}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

// Função fetcher para obter os dados da API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Função para realizar a compra


// Componente principal
export default function Produtos() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (isLoading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar produtos: {error.message || 'Erro desconhecido'}</div>;

  const buy = () => {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    fetch('https://deisishop.pythonanywhere.com/buy/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        products: cart.map(product=> product.product.id),
        name:"",
        student: false,
        coupon:""

       }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        alert(`Compra realizada com sucesso! Total: €${total}`);
        setCart([]); 
      })
      .catch((error) => {
        console.error('Erro ao comprar:', error);
        alert('Erro ao processar a compra.');
      });
  };
  
  ;
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Pesquisa e Ícone do Carrinho */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-md"
        />
        <button
          className="relative ml-4"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <Card key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      {/* Carrinho */}
      {isCartOpen && (
        <div className="absolute top-0 right-0 bg-white shadow-lg rounded-lg w-80 p-4">
          <h2 className="text-lg font-bold mb-4">Carrinho</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.product.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{item.product.title}</h3>
                      <p className="text-sm text-gray-600">{`$${item.product.price} x ${item.quantity}`}</p>
                    </div>
                    <div>
                      <button
                        className="text-red-500 font-bold mr-2"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        -
                      </button>
                      <button
                        className="text-green-500 font-bold"
                        onClick={() => addToCart(item.product)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600 transition"
                onClick={() => buy()}
              >
                Finalizar Compra
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

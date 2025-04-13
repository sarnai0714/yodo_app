'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // 🛒 Сагсны өгөгдлийг localStorage-с татаж авах
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  // 🗑️ Хоол сагснаас устгах функц
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex items-center gap-4 mb-6">
        {/* 🔙 Буцах товч */}
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </Button>
        <h2 className="text-3xl font-bold text-orange-600">🛒 Таны сагс</h2>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600">Сагсанд ямар ч хоол байхгүй байна. 🍽️</p>
          <Button onClick={() => router.push('/')} className="mt-6 bg-orange-500 text-white">
            🏠 Нүүр хуудас руу буцах
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((food, index) => (
            <Card key={index} className="relative p-4 bg-white shadow-md rounded-xl">
              <Image src={food.image} alt={'Хоолны зураг'} width={300} height={200} className="rounded-lg mx-auto" />
              <CardContent className="text-center mt-4">
                <p className="text-lg font-semibold">{food.food}</p>
                <p className="text-gray-500">{food.price}₮</p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeFromCart(index)} 
                  className="mt-4 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Устгах
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;

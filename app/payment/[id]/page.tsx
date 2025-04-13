'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ArrowLeft } from 'lucide-react'; // Import ArrowLeft for the back arrow
import partners from '@/data/partners.json';
import { useRouter, useParams } from 'next/navigation';

export default function PaymentPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const deliveryFee = 5000; // Хүргэлтийн төлбөр
  const [selectedPartner, setSelectedPartner] = useState(partners[id - 1]); // Анхны хоолыг шууд оноох
  const router = useRouter(); // Initialize the router

  return (
    <div className="bg-pink-100 min-h-screen flex items-center justify-center p-8">
      <div className="bg-gray-200 p-6 rounded-lg w-full max-w-lg shadow-lg">
        
        {/* Position the back button next to the "Хаяг" title */}
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()} // Go back to the previous page
          >
            <ArrowLeft size={24} />
          </Button>
          <h2 className="text-xl font-semibold">Хаяг:</h2>
        </div>

        <input
          type="text"
          placeholder="Хаягаа оруулна уу"
          className="w-full p-2 border rounded mb-4"
        />

        <h3 className="text-lg font-semibold mb-2">Захиалга</h3>
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
          <Image
            src={selectedPartner.foodImage}
            alt="Хоолны зураг"
            width={80}
            height={80}
            className="rounded"
          />
          <div className="flex-1">
            <p className="font-semibold">{selectedPartner.food}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </Button>
              <span className="text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <p className="font-semibold">{selectedPartner.price}</p>
        </div>

        <div className="mt-6">
          <p className="flex justify-between font-medium">
            <span>Захиалгын дүн:</span> <span>{selectedPartner.price * quantity}</span>
          </p>
          <p className="flex justify-between font-medium">
            <span>Хүргэлтийн төлбөр:</span> <span>₮{deliveryFee}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between text-lg font-bold">
            <span>Нийт төлөх дүн:</span> <span>₮{selectedPartner.price * quantity + deliveryFee}</span>
          </p>
        </div>

        <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg">
          Төлбөр төлөх
        </Button>
      </div>
    </div>
  );
}

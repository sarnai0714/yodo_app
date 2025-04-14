'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Search, Plus, ShoppingBasket, LocateIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import partners from '@/data/partners.json';
import foods from '@/data/foods.json';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function Home() {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  const router = useRouter();

  // Сагсанд хоол нэмэх функц
  const addToCart = (food) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, food];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSelectedFood(null); // 🟢 Dialog автоматаар хаагдана
  };
  

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-orange-600">Yodo</h1>
        <nav className="flex items-center gap-4 justify-start w-full text-left ml-4">
          <a href="#" className="text-gray-700 hover:underline">Бидний тухай</a>
          <div className="relative">
            <Input placeholder="Хайх" className="pl-10" />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </nav>
        <nav className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <LocateIcon size={16} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => router.push('/cart')}>
            <ShoppingBasket size={16} />
          </Button>
        </nav>
      </header>

      {/* Санал болгож буй хоол */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Санал болгож буй хоол</h2>
        <div className="grid grid-cols-4 gap-4">
          {foods.map((food) => (
            <Card key={food.id} onClick={() => setSelectedFood(food)} className="cursor-pointer">
              <CardContent className="p-2">
                <Image src={food.image} alt={'Хоолны зураг'} width={300} height={200} className="rounded-lg mx-auto" />
                <p className="text-center font-semibold mt-2">{food.food}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Харилцагчид ба сонгогдсон мэдээлэл */}
      <div className="flex gap-8 mt-8">
        {/* Харилцагчид */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Харилцагчид</h2>
          <div className="grid grid-cols-3 gap-4">
            {partners.map((partner) => (
              <Card
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="cursor-pointer hover:shadow-lg transition"
              >
                <CardContent className="p-4">
                  <Image src={partner.image} alt={'Харилцагч'} width={300} height={200} className="rounded-lg mx-auto" />
                  <p className="text-center font-semibold mt-2">{partner.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Сонгогдсон хоолны мэдээлэл */}
        {selectedPartner && (
          <section className="p-4 bg-gray-200 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold mb-2">{selectedPartner.name}-ын хоол</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Зураг</TableHead>
                  <TableHead>Хоолны нэр</TableHead>
                  <TableHead>Үнэ</TableHead>
                  <TableHead>Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Image src={selectedPartner.foodImage} alt={'Хоолны зураг'} width={50} height={50} className="rounded-md" />
                  </TableCell>
                  <TableCell>{selectedPartner.food}</TableCell>
                  <TableCell>{selectedPartner.price}₮</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.push(`/payment/${selectedPartner.id}`)}>
                      <Plus size={16} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => addToCart(selectedPartner)}>
                      <ShoppingBasket size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        )}
      </div>

      {/* Хоолны дэлгэрэнгүй мэдээлэл Modal */}
      <Dialog open={!!selectedFood} onOpenChange={() => setSelectedFood(null)}>
        <DialogContent>
          {selectedFood && (
            <>
              <DialogTitle>{selectedFood.food}</DialogTitle>
              <Image src={selectedFood.image} alt={'Хоолны зураг'} width={300} height={200} className="rounded-lg mx-auto" />
              <p className="mt-2">Орц: {selectedFood.orts}</p>
              <p className="mt-2">Порц: {selectedFood.ports}</p>
              <p className="mt-2">Хоолны үнэ: {selectedFood.price}</p>
              <Button onClick={() => addToCart(selectedFood)} className="mt-4 bg-green-500 text-white">
                Сагслах
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

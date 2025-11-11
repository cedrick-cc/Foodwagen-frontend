// src/app/page.tsx
import SearchBar from '@/components/SearchBar';
import FoodGrid from '@/components/FoodGrid';
import Footer from '@/components/Footer';
import { FoodsProvider } from '@/contexts/FoodsContext';

export default function Home() {
  return (
    <FoodsProvider>
      <main className="min-h-screen bg-gray-50">
        <FoodGrid />  {/* Header + Grid + Modals all inside */}
      </main>
      <Footer />
    </FoodsProvider>
  );
}
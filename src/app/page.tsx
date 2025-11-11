// src/app/page.tsx
import SearchBar from '@/components/SearchBar';
import FoodGrid from '@/components/FoodGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <FoodGrid />  {/* Header + Grid + Modals all inside */}
      </main>
      <Footer />
    </>
  );
}
import React, { useState, FormEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    FiSmartphone, 
    FiShoppingBag, 
    FiHome, 
    FiSmile, 
    FiDribbble, 
    FiHeart, 
    FiPlus, 
    FiStar, 
    FiArrowRight, 
    FiArrowUpRight,
    FiGrid,
    FiZap,
    FiAperture,
    FiShield,
    FiAward,
    FiTv,
    FiDisc,
    FiShoppingCart,
    FiUser,
    FiSearch
} from 'react-icons/fi';

// Type Interfaces
export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    is_active: boolean;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    description?: string | null;
    price: number | string;
    stock: number;
    image?: string | null;
    is_active: boolean;
    category?: Category;
    rating?: number;
    reviews_count?: number;
    discount?: string;
    original_price?: number | string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
}

interface IndexProps {
    products: PaginatedProducts;
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
    };
    cartCount?: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
    electronics: <FiSmartphone className="w-4 h-4" />,
    fashion: <FiShoppingBag className="w-4 h-4" />,
    'home-living': <FiHome className="w-4 h-4" />,
    beauty: <FiSmile className="w-4 h-4" />,
    sports: <FiDribbble className="w-4 h-4" />,
};

// Brand Logos Data
const brandLogos = [
    { name: 'APPLE', icon: <FiSmartphone className="w-4 h-4" /> },
    { name: 'SAMSUNG', icon: <FiTv className="w-4 h-4" /> },
    { name: 'NIKE', icon: <FiZap className="w-4 h-4" /> },
    { name: 'ADIDAS', icon: <FiAperture className="w-4 h-4" /> },
    { name: 'SONY', icon: <FiDisc className="w-4 h-4" /> },
    { name: 'LOGITECH', icon: <FiShield className="w-4 h-4" /> },
    { name: 'ASUS', icon: <FiAward className="w-4 h-4" /> },
];

export default function Index({ products, categories, filters, cartCount = 3 }: IndexProps) {
    const [search, setSearch] = useState<string>(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState<string>(filters.category || '');

    const handleCategoryClick = (categorySlug: string) => {
        const newCategory = selectedCategory === categorySlug ? '' : categorySlug;
        setSelectedCategory(newCategory);
        router.get('/', { search, category: newCategory }, { preserveState: true });
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/', { search, category: selectedCategory }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fe] text-gray-800 font-sans flex flex-col">
            <Head title="Katalog Produk - Tokoku">
                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: flex;
                        width: max-content;
                        animation: marquee 25s linear infinite;
                    }
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </Head>

            {/* HEADER ATAS - DIBUAT FIXED AGAR TIDAK MENGGANGGU SCROLL SIDEBAR */}
            <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo / Nama Web */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#1e1b4b] text-[#67e8f9] flex items-center justify-center font-black text-lg shadow-xs">
                        T
                    </div>
                    <div>
                        <span className="text-lg font-black tracking-tight text-[#1e1b4b] block leading-none">
                            TOKOKU<span className="text-cyan-500">.</span>
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 block -mt-0.5">
                            Store Layout
                        </span>
                    </div>
                </Link>

                {/* Form Pencarian Cepat */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-1/3">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari produk impianmu..."
                        className="w-full bg-gray-50 border border-gray-200/80 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                    <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5" />
                </form>

                {/* Akses Kanan: Keranjang & Akun */}
                <div className="flex items-center gap-3">
                    {/* Ikon Keranjang */}
                    <Link
                        href="#"
                        className="relative p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center group"
                    >
                        <FiShoppingCart className="w-5 h-5 group-hover:text-[#1e1b4b] transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Ikon Akun / Profil */}
                    <Link
                        href="/login"
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-100"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center text-xs font-bold">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
                            Akun Saya
                        </span>
                    </Link>
                </div>
            </header>

            {/* BODY CONTAINER (SIDEBAR & MAIN CONTENT) - DIBERI MARGIN TOP SESUAI TINGGI HEADER */}
            <div className="pt-[64px] flex flex-col lg:flex-row items-start min-h-screen w-full">
                
                {/* SIDEBAR KATEGORI (DIJAMIN TOTALLY STICKY & TIDAK BERGERAK) */}
                <aside className="w-full lg:w-72 bg-white border-r border-gray-100 flex-shrink-0 p-6 lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] flex flex-col justify-between">
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Header Sidebar */}
                        <div className="mb-6 flex-shrink-0">
                            <h2 className="text-lg font-bold text-[#1e1b4b]">Categories</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Browse by department</p>
                        </div>

                        {/* Navigasi Kategori (Scroll Internal) */}
                        <nav className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                            <button
                                type="button"
                                onClick={() => handleCategoryClick('')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                                    selectedCategory === ''
                                        ? 'bg-[#5eead4] text-[#0f172a] shadow-xs'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <FiGrid className="w-4 h-4" />
                                <span>All Categories</span>
                            </button>

                            {categories.map((cat) => {
                                const isActive = selectedCategory === cat.slug;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => handleCategoryClick(cat.slug)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                                            isActive
                                                ? 'bg-[#67e8f9] text-[#0f172a] shadow-xs'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {categoryIcons[cat.slug] || <FiGrid className="w-4 h-4" />}
                                        <span>{cat.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
                    
                    {/* Banners Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Hero Card Utama */}
                        <div className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[360px] bg-slate-900 group flex flex-col justify-between p-8 text-white shadow-xs">
                            <img
                                src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop"
                                alt="Hero Banner"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                            <div className="relative z-10">
                                <span className="inline-block px-3.5 py-1.5 bg-[#67e8f9] text-[#0f172a] text-[11px] font-bold rounded-full mb-4">
                                    New Arrival
                                </span>
                            </div>

                            <div className="relative z-10 max-w-md space-y-3">
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                                    Elevate Your Everyday with Smart Tech.
                                </h1>
                                <p className="text-xs text-gray-200 line-clamp-2 font-normal leading-relaxed">
                                    Discover the latest innovations designed to seamlessly integrate into your modern lifestyle.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="#"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#312e81] hover:bg-[#1e1b4b] text-white text-xs font-semibold rounded-full transition-all shadow-xs"
                                    >
                                        <span>Shop Now</span>
                                        <FiArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Stacked Banner Kanan */}
                        <div className="grid grid-rows-2 gap-6">
                            <div className="relative rounded-3xl overflow-hidden p-6 bg-slate-100 flex flex-col justify-between group shadow-xs">
                                <img
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
                                    alt="Wearables"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900">Wearables</h3>
                                    <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-950 hover:underline mt-1">
                                        Explore <FiArrowUpRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative rounded-3xl overflow-hidden p-6 bg-slate-100 flex flex-col justify-between group shadow-xs">
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                                    alt="Audio"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900">Audio</h3>
                                    <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-950 hover:underline mt-1">
                                        Explore <FiArrowUpRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* MODERN BLENDED LOGO CAROUSEL */}
                    <div className="relative py-2 overflow-hidden my-2">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f8f9fe] via-[#f8f9fe]/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f8f9fe] via-[#f8f9fe]/80 to-transparent z-10 pointer-events-none" />

                        <div className="animate-marquee gap-10 items-center">
                            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-gray-400 hover:text-[#1e1b4b] hover:bg-white hover:shadow-xs transition-all duration-300 shrink-0 cursor-pointer group"
                                >
                                    <span className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                                        {brand.icon}
                                    </span>
                                    <span className="text-[11px] font-extrabold tracking-widest text-gray-500 group-hover:text-[#1e1b4b] transition-colors">
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section Trending Now */}
                    <section>
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-[#1e1b4b]">Trending Now</h2>
                                <p className="text-xs text-gray-400 mt-1">Top picks from our community</p>
                            </div>
                            <Link href="#" className="text-xs font-bold text-[#312e81] hover:underline">
                                View all products
                            </Link>
                        </div>

                        {/* Product Grid */}
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative"
                                    >
                                        <div className="aspect-square bg-gray-50 rounded-2xl relative overflow-hidden mb-4">
                                            {product.discount && (
                                                <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                                    {product.discount}
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-xs"
                                            >
                                                <FiHeart className="w-4 h-4" />
                                            </button>

                                            <img
                                                src={
                                                    product.image
                                                        ? `/storage/${product.image}`
                                                        : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
                                                }
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 mb-1.5">
                                                    <FiStar className="w-3.5 h-3.5 fill-cyan-700 text-cyan-700" />
                                                    <span className="text-gray-700">{product.rating ?? '4.8'}</span>
                                                    <span>({product.reviews_count ?? '120'})</span>
                                                </div>

                                                <h3 className="font-bold text-xs text-gray-900 line-clamp-2 leading-snug mb-2">
                                                    {product.name}
                                                </h3>
                                            </div>

                                            <div className="flex items-end justify-between pt-2">
                                                <div>
                                                    <div className="text-lg font-black text-[#1e1b4b]">
                                                        ${Number(product.price).toLocaleString()}
                                                    </div>
                                                    {product.original_price && (
                                                        <div className="text-[11px] text-gray-400 line-through">
                                                            ${Number(product.original_price).toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    className="w-8 h-8 rounded-full bg-[#1e1b4b] hover:bg-[#312e81] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs"
                                                >
                                                    <FiPlus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900">Tidak Ada Produk</h3>
                                <p className="mt-1 text-xs text-gray-400">
                                    Produk tidak ditemukan atau belum tersedia dalam kategori ini.
                                </p>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}
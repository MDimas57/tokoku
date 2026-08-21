import React, { useState, FormEvent } from 'react';
import Header from '@/components/Header';
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
    FiDisc
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

    // Helper untuk format angka ke Rupiah
    const formatRupiah = (value: number | string) => {
        const numericValue = Number(value) || 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(numericValue);
    };

    const handleCategoryClick = (categorySlug: string) => {
    const newCategory = selectedCategory === categorySlug ? '' : categorySlug;
        setSelectedCategory(newCategory);

        // Tambahkan preserveScroll: true di sini
        router.get(
            '/', 
            { search, category: newCategory }, 
            { 
                preserveState: true,
                preserveScroll: true // <-- MENJAGA POSISI SCROLL SAMA SEPERTI SEBELUMNYA
            }
        );
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
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </Head>

            {/* HEADER ATAS COMPONENT */}
            <Header 
                search={search} 
                setSearch={setSearch} 
                handleSearch={handleSearch} 
                cartCount={cartCount} 
            />

            {/* MAIN CONTENT CONTAINER */}
            <main className="pt-24 sm:pt-28 flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                
                {/* Banners Grid (Diperbesar) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hero Banner Utama (Tinggi diperbesar dari min-h-[360px] ke min-h-[460px] / md:min-h-[500px]) */}
                    <div className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[460px] md:min-h-[500px] bg-slate-900 group flex flex-col justify-between p-8 sm:p-10 text-white shadow-xs">
                        <img
                            src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop"
                            alt="Hero Banner"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                        <div className="relative z-10">
                            <span className="inline-block px-4 py-2 bg-[#67e8f9] text-[#0f172a] text-xs font-bold rounded-full mb-4">
                                New Arrival
                            </span>
                        </div>

                        <div className="relative z-10 max-w-lg space-y-4">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                                Elevate Your Everyday with Smart Tech.
                            </h1>
                            <p className="text-sm text-gray-200 line-clamp-2 font-normal leading-relaxed">
                                Discover the latest innovations designed to seamlessly integrate into your modern lifestyle.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#312e81] hover:bg-[#1e1b4b] text-white text-xs sm:text-sm font-semibold rounded-full transition-all shadow-xs"
                                >
                                    <span>Shop Now</span>
                                    <FiArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Side Banners (Mengikuti tinggi banner utama) */}
                    <div className="grid grid-rows-2 gap-6 min-h-[460px] md:min-h-[500px]">
                        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-slate-100 flex flex-col justify-between group shadow-xs">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
                                alt="Wearables"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-900">Wearables</h3>
                                <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-950 hover:underline mt-1.5">
                                    Explore <FiArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-slate-100 flex flex-col justify-between group shadow-xs">
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                                alt="Audio"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-900">Audio</h3>
                                <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-950 hover:underline mt-1.5">
                                    Explore <FiArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BRAND CAROUSEL */}
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

                {/* HORIZONTAL CATEGORIES BAR */}
                <section className="bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-white/80 shadow-xs">
                    <div className="flex items-center justify-between mb-3 px-2">
                        <h2 className="text-sm font-bold text-[#1e1b4b] tracking-wide uppercase">Explore Categories</h2>
                        <span className="text-xs text-gray-400 font-medium">{categories.length + 1} Departments</span>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 pt-1">
                        <button
                            type="button"
                            onClick={() => handleCategoryClick('')}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                                selectedCategory === ''
                                    ? 'bg-[#1e1b4b] text-white border-[#1e1b4b] shadow-md shadow-indigo-950/20'
                                    : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
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
                                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                                        isActive
                                            ? 'bg-[#1e1b4b] text-white border-[#1e1b4b] shadow-md shadow-indigo-950/20'
                                            : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                                    }`}
                                >
                                    <span className={isActive ? 'text-[#67e8f9]' : 'text-gray-400'}>
                                        {categoryIcons[cat.slug] || <FiGrid className="w-4 h-4" />}
                                    </span>
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* SECTION TRENDING NOW */}
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

                    {/* PRODUCT GRID */}
                    {products.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative"
                                >
                                    {/* Wrapper Gambar & Link */}
                                    <div className="aspect-square bg-gray-50 rounded-2xl relative overflow-hidden mb-4">
                                        {product.discount && (
                                            <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                                {product.discount}
                                            </span>
                                        )}

                                        {/* Tombol Wishlist dengan stopPropagation */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Logika Wishlist
                                            }}
                                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
                                        >
                                            <FiHeart className="w-4 h-4" />
                                        </button>

                                        <Link href={`/products/${product.slug}`} className="block w-full h-full">
                                            <img
                                                src={
                                                    product.image
                                                        ? `/storage/${product.image}`
                                                        : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
                                                }
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </Link>
                                    </div>

                                    {/* Informasi Produk */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 mb-1.5">
                                                <FiStar className="w-3.5 h-3.5 fill-cyan-700 text-cyan-700" />
                                                <span className="text-gray-700">{product.rating ?? '4.8'}</span>
                                                <span>({product.reviews_count ?? '120'})</span>
                                            </div>

                                            <Link href={`/products/${product.slug}`} className="block group-hover:text-indigo-600 transition-colors">
                                                <h3 className="font-bold text-xs text-gray-900 line-clamp-2 leading-snug mb-2">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </div>

                                        <div className="flex items-end justify-between pt-2">
                                            <div>
                                                <div className="text-base font-black text-[#1e1b4b]">
                                                    {formatRupiah(product.price)}
                                                </div>
                                                {product.original_price && (
                                                    <div className="text-[11px] text-gray-400 line-through">
                                                        {formatRupiah(product.original_price)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Tombol Keranjang dengan stopPropagation */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Logika Tambah ke Keranjang
                                                }}
                                                className="w-8 h-8 rounded-full bg-[#1e1b4b] hover:bg-[#312e81] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer"
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
    );
}
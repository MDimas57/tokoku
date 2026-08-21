import React, { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Product } from './Index';
import { 
    FiStar, 
    FiShoppingCart, 
    FiTruck, 
    FiPlayCircle, 
    FiChevronRight 
} from 'react-icons/fi';

interface ShowProps {
    product: Product;
    relatedProducts: Product[];
}

export default function Show({ product, relatedProducts }: ShowProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    
    // State UI Varian Produk
    const [selectedColor, setSelectedColor] = useState<string>('Space Grey');
    const [selectedStorage, setSelectedStorage] = useState<string>('256GB');
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    // FIX 1: Ambil `cartCount` secara dinamis dari Inertia shared props
    const { auth, cartCount } = usePage<any>().props;

    // Format Rupiah
    const formatRupiah = (value: number | string) => {
        const numericValue = Number(value) || 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(numericValue);
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/', { search }, { preserveState: true });
    };

    const handleAddToCart = () => {
        if (!auth?.user) {
            router.get('/login');
            return;
        }

        setLoading(true);

        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
        }, {
            preserveScroll: true,
            onSuccess: () => setLoading(false),
            onError: (errors) => {
                setLoading(false);
                if (errors.quantity) {
                    alert(errors.quantity);
                }
            },
        });
    };

    const handleBuyNow = () => {
        if (!auth?.user) {
            router.get('/login');
            return;
        }
        
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
        }, {
            onSuccess: () => router.get('/checkout')
        });
    };

    const primaryImg = product.image 
        ? `/storage/${product.image}` 
        : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop';
        
    const galleryImages = [
        primaryImg,
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fe] text-gray-800 font-sans flex flex-col">
            <Head title={`${product.name} - Tokoku`} />

            {/* HEADER UTAMA */}
            {/* FIX 2: Teruskan variabel cartCount dinamis dari backend (fallback ke 0 jika undefined) */}
            <Header 
                search={search} 
                setSearch={setSearch} 
                handleSearch={handleSearch} 
                cartCount={cartCount || 0} 
            />

            {/* MAIN CONTAINER */}
            <main className="pt-[80px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
                
                {/* BREADCRUMBS */}
                <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
                    <Link href="/" className="hover:text-[#1e1b4b] transition">Home</Link>
                    <span className="text-gray-300">›</span>
                    <Link href={`/?category=${product.category?.slug || ''}`} className="hover:text-[#1e1b4b] transition">
                        {product.category?.name || 'Electronics'}
                    </Link>
                    <span className="text-gray-300">›</span>
                    <span className="text-[#312e81] font-bold truncate max-w-xs">{product.name}</span>
                </nav>

                {/* PRODUCT SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* GALLERY COLUMN */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs relative">
                            <img
                                src={galleryImages[activeImageIndex] || primaryImg}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Thumbnails Row */}
                        <div className="grid grid-cols-4 gap-4">
                            {galleryImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`aspect-square rounded-2xl overflow-hidden border-2 bg-white transition-all ${
                                        activeImageIndex === idx 
                                            ? 'border-[#312e81] ring-2 ring-indigo-100' 
                                            : 'border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                            
                            <button
                                type="button"
                                className="aspect-square rounded-2xl bg-white border-2 border-transparent hover:border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#1e1b4b] transition"
                            >
                                <FiPlayCircle className="w-8 h-8 stroke-[1.5]" />
                            </button>
                        </div>
                    </div>

                    {/* DETAILS COLUMN */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-2 mt-3">
                                <div className="flex items-center text-cyan-400">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-gray-700">{product.rating ?? '4.5'}</span>
                                <span className="text-xs text-gray-400">({product.reviews_count ?? '128'} Reviews)</span>
                            </div>

                            <div className="mt-4 text-3xl font-black text-[#1e1b4b]">
                                {formatRupiah(product.price)}
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed font-normal">
                            {product.description || 'Experience unparalleled audio clarity with industry-leading active noise cancellation. Designed for ultimate comfort and extended listening sessions, these premium headphones deliver a pristine soundstage in a sleek, minimalist package.'}
                        </p>

                        {/* Color Selector */}
                        <div className="space-y-2.5 border-t border-gray-100 pt-5">
                            <label className="text-xs font-semibold text-gray-800">
                                Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedColor('Space Grey')}
                                    className={`w-8 h-8 rounded-full bg-[#1e293b] border-2 transition-all ${
                                        selectedColor === 'Space Grey' ? 'ring-2 ring-indigo-600 border-white' : 'border-transparent'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setSelectedColor('Silver')}
                                    className={`w-8 h-8 rounded-full bg-[#e2e8f0] border-2 transition-all ${
                                        selectedColor === 'Silver' ? 'ring-2 ring-indigo-600 border-white' : 'border-transparent'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Storage / Variant Selector */}
                        <div className="space-y-2.5">
                            <label className="text-xs font-semibold text-gray-800">
                                Storage <span className="text-gray-400 font-normal">(Built-in memory for lossless playback):</span>
                            </label>
                            <div className="flex items-center gap-3">
                                {['256GB', '512GB (+Rp 1.500.000)'].map((storage) => {
                                    const key = storage.split(' ')[0];
                                    const isSelected = selectedStorage === key;
                                    return (
                                        <button
                                            key={storage}
                                            type="button"
                                            onClick={() => setSelectedStorage(key)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                                                isSelected
                                                    ? 'border-[#312e81] text-[#312e81] bg-indigo-50/50'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            {storage}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 space-y-3">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={loading}
                                    className="flex-1 border-2 border-[#1e1b4b] text-[#1e1b4b] hover:bg-slate-50 font-extrabold py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 text-xs shadow-xs disabled:opacity-50"
                                >
                                    <FiShoppingCart className="w-4 h-4" />
                                    <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-[#1e1b4b] hover:bg-[#312e81] text-white font-extrabold py-3.5 px-6 rounded-2xl transition text-xs shadow-xs text-center"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-2">
                                <FiTruck className="w-4 h-4 text-gray-400" />
                                <span>Free shipping on orders over Rp 1.500.000.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

Show.layout = (page: React.ReactNode) => page;
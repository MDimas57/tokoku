import React, { useState, FormEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';

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
}

export default function Index({ products, categories, filters }: IndexProps) {
    const [search, setSearch] = useState<string>(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState<string>(filters.category || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/', { search, category: selectedCategory }, { preserveState: true });
    };

    const handleCategoryClick = (categorySlug: string) => {
        const newCategory = selectedCategory === categorySlug ? '' : categorySlug;
        setSelectedCategory(newCategory);
        router.get('/', { search, category: newCategory }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Head title="Katalog Produk - Tokoku" />

            {/* Header */}
            <header className="bg-white shadow-xs sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black tracking-tight text-indigo-600">
                        Tokoku<span className="text-gray-400">.</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-xs transition"
                        >
                            Daftar
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter Bar */}
                <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
                    <form onSubmit={handleSearch} className="w-full md:w-1/2 flex gap-2">
                        <input
                            type="text"
                            placeholder="Cari produk impianmu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shrink-0"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Filter Kategori */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            type="button"
                            onClick={() => handleCategoryClick('')}
                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition ${
                                selectedCategory === ''
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            Semua
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition ${
                                    selectedCategory === cat.slug
                                        ? 'bg-indigo-600 text-white shadow-xs'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Produk */}
                {products.data.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                        {products.data.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden hover:shadow-md transition duration-200 flex flex-col group"
                            >
                                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={
                                            product.image
                                                ? `/storage/${product.image}`
                                                : 'https://via.placeholder.com/300x300?text=No+Image'
                                        }
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    {product.category && (
                                        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-gray-700 px-2 py-0.5 rounded-full">
                                            {product.category.name}
                                        </span>
                                    )}
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-indigo-600 font-bold text-base">
                                            Rp {Number(product.price).toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            {product.stock > 0 ? (
                                                `Stok: ${product.stock}`
                                            ) : (
                                                <span className="text-red-500 font-medium">Stok Habis</span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="block w-full text-center py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center my-8">
                        <h3 className="text-sm font-semibold text-gray-900">Tidak Ada Produk</h3>
                        <p className="mt-1 text-xs text-gray-500">
                            Produk tidak ditemukan atau belum tersedia.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {products.links.length > 3 && (
                    <div className="mt-8 flex justify-center gap-1">
                        {products.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 text-xs rounded-md transition ${
                                    link.active
                                        ? 'bg-indigo-600 text-white font-bold'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Category, Product } from './Index';

interface ShowProps {
    product: Product;
    relatedProducts: Product[];
}

export default function Show({ product, relatedProducts }: ShowProps) {
    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        } else if (type === 'increase' && quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Head title={`${product.name} - Tokoku`} />

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

            {/* Breadcrumb & Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="flex text-xs text-gray-500 mb-6 gap-2 items-center">
                    <Link href="/" className="hover:text-indigo-600">Home</Link>
                    <span>/</span>
                    <span className="text-gray-400">{product.category?.name || 'Katalog'}</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate">{product.name}</span>
                </nav>

                {/* Detail Produk Section */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Gambar Produk */}
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
                        <img
                            src={product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/600x600?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {product.category && (
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-xs font-semibold text-gray-700 px-3 py-1 rounded-full shadow-xs">
                                {product.category.name}
                            </span>
                        )}
                    </div>

                    {/* Informasi Produk */}
                    <div className="flex flex-col justify-between space-y-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-2xl font-black text-indigo-600 mt-3">
                                Rp {Number(product.price).toLocaleString('id-ID')}
                            </p>

                            {/* Status Stok */}
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-500">Ketersediaan:</span>
                                {product.stock > 0 ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Tersedia ({product.stock} pcs)
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Stok Habis
                                    </span>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="mt-6 border-t border-gray-100 pt-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                    {product.description || 'Tidak ada deskripsi produk.'}
                                </p>
                            </div>
                        </div>

                        {/* Aksi Pembelian */}
                        {product.stock > 0 && (
                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">Jumlah:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold transition"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 text-sm font-semibold text-gray-800">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange('increase')}
                                            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition shadow-xs text-sm text-center"
                                    >
                                        + Keranjang Belanja
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Produk Terkait */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Produk Terkait</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((related) => (
                                <div
                                    key={related.id}
                                    className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden hover:shadow-md transition duration-200 flex flex-col group"
                                >
                                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={related.image ? `/storage/${related.image}` : 'https://via.placeholder.com/300x300?text=No+Image'}
                                            alt={related.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">{related.name}</h3>
                                            <p className="text-indigo-600 font-bold text-sm">
                                                Rp {Number(related.price).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/products/${related.slug}`}
                                            className="mt-3 block text-center py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// Menimpa layout default global app.tsx
Show.layout = (page: React.ReactNode) => page;
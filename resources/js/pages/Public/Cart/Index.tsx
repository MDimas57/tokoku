import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export interface CartProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    stock: number;
    image?: string;
    category?: {
        name: string;
    };
}

export interface CartItem {
    id: number;
    quantity: number;
    product: CartProduct;
}

interface CartIndexProps {
    cartItems: CartItem[];
}

export default function CartIndex({ cartItems }: CartIndexProps) {
    // Update jumlah item
    const handleQuantityChange = (cartItemId: number, currentQty: number, change: number, stock: number) => {
        const newQty = currentQty + change;
        if (newQty < 1 || newQty > stock) return;

        router.patch(`/cart/${cartItemId}`, {
            quantity: newQty,
        }, {
            preserveScroll: true,
        });
    };

    // Hapus item dari keranjang
    const handleDeleteItem = (cartItemId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini dari keranjang?')) {
            router.delete(`/cart/${cartItemId}`, {
                preserveScroll: true,
            });
        }
    };

    // Kalkulasi total harga
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (Number(item.product.price) * item.quantity);
    }, 0);

    const tax = subtotal * 0.11; // PPN 11% (opsional)
    const grandTotal = subtotal + tax;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Head title="Keranjang Belanja - Tokoku" />

            {/* Header Navbar */}
            <header className="bg-white shadow-xs sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black tracking-tight text-indigo-600">
                        Tokoku<span className="text-gray-400">.</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                    >
                        &larr; Lanjut Belanja
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Keranjang Belanja</h1>

                {cartItems.length === 0 ? (
                    /* Tampilan Jika Keranjang Kosong */
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
                        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Keranjang Anda Masih Kosong</h2>
                        <p className="text-gray-500 text-sm mb-6">Sepertinya Anda belum menambahkan produk apapun ke dalam keranjang.</p>
                        <Link
                            href="/"
                            className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-xs text-sm"
                        >
                            Mulai Jelajahi Produk
                        </Link>
                    </div>
                ) : (
                    /* Layout Keranjang & Ringkasan */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Daftar Item (Kolom Kiri - 2 Span) */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                >
                                    {/* Info Produk */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <img
                                            src={item.product.image ? `/storage/${item.product.image}` : 'https://via.placeholder.com/100x100?text=No+Image'}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded-xl border border-gray-200 bg-gray-50 shrink-0"
                                        />
                                        <div>
                                            {item.product.category && (
                                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                                                    {item.product.category.name}
                                                </span>
                                            )}
                                            <h3 className="font-bold text-gray-900 mt-1 text-base">
                                                <Link href={`/products/${item.product.slug}`} className="hover:text-indigo-600 transition">
                                                    {item.product.name}
                                                </Link>
                                            </h3>
                                            <p className="text-sm font-semibold text-gray-600 mt-1">
                                                Rp {Number(item.product.price).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Kontrol Qty & Aksi */}
                                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                                        {/* Counter Quantity */}
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item.id, item.quantity, -1, item.product.stock)}
                                                disabled={item.quantity <= 1}
                                                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 text-gray-600 font-bold text-sm"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 text-sm font-semibold text-gray-800">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item.id, item.quantity, 1, item.product.stock)}
                                                disabled={item.quantity >= item.product.stock}
                                                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 text-gray-600 font-bold text-sm"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Subtotal Per Item */}
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Total</p>
                                            <p className="text-sm font-bold text-indigo-600">
                                                Rp {(Number(item.product.price) * item.quantity).toLocaleString('id-ID')}
                                            </p>
                                        </div>

                                        {/* Tombol Hapus */}
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="text-gray-400 hover:text-red-600 transition p-1"
                                            title="Hapus dari keranjang"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ringkasan Belanja (Kolom Kanan - 1 Span) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs sticky top-24 space-y-4">
                                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                                    Ringkasan Belanja
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total Price ({cartItems.length} produk)</span>
                                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Pajak PPN (11%)</span>
                                        <span>Rp {tax.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-gray-900">
                                        <span>Total Tagihan</span>
                                        <span className="text-indigo-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="w-full mt-4 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition shadow-xs text-sm text-center block"
                                >
                                    Lanjut ke Pembayaran
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

CartIndex.layout = (page: React.ReactNode) => page;
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/components/Header'; // Sesuaikan path komponen Header Anda
import { FiTrash2, FiTruck, FiArrowRight, FiLock } from 'react-icons/fi';

export interface CartProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    original_price?: number; // Opsional: harga asli sebelum diskon (untuk harga tercoret)
    color?: string; // Opsional: varian warna
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
    const [search, setSearch] = useState('');
    const [promoCode, setPromoCode] = useState('');

    // Helper untuk format angka ke Rupiah
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/', { search }, { preserveState: true });
    };

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

    // Hitung total item kuantitas keseluruhan
    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Kalkulasi total harga
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (Number(item.product.price) * item.quantity);
    }, 0);

    const tax = subtotal * 0.11; // PPN 11%
    const discount = 0; // Ubah nilai ini jika ada logika promo
    const grandTotal = subtotal + tax - discount;

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
            <Head title="Keranjang Belanja - Tokoku" />

            {/* Header Navbar dari Layout Utama */}
            <Header 
                search={search} 
                setSearch={setSearch} 
                handleSearch={handleSearch} 
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {/* Heading Title */}
                <div className="flex justify-between items-baseline border-b border-slate-200/80 pb-5 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                        Shopping Cart
                    </h1>
                    <span className="text-sm font-semibold text-slate-500">
                        {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                {cartItems.length === 0 ? (
                    /* Tampilan Keranjang Kosong */
                    <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xs">
                        <div className="w-20 h-20 bg-indigo-50 text-[#1e1b4b] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiTrash2 className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Keranjang Anda Kosong</h2>
                        <p className="text-slate-500 text-sm mb-6">Belum ada produk yang ditambahkan ke dalam keranjang belanja.</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#1e1b4b] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#15133c] transition text-sm shadow-xs"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                ) : (
                    /* Layout Grid 2 Kolom */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Kolom Kiri: Items List (7 Spans) */}
                        <div className="lg:col-span-7 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs transition-all hover:shadow-sm"
                                >
                                    <div className="flex gap-4 sm:gap-5">
                                        {/* Thumbnail Gambar */}
                                        <img
                                            src={item.product.image ? `/storage/${item.product.image}` : 'https://via.placeholder.com/150'}
                                            alt={item.product.name}
                                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-slate-50 shrink-0"
                                        />

                                        {/* Details & Controls */}
                                        <div className="flex-1 flex flex-col justify-between min-h-[112px]">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                                                        <Link href={`/products/${item.product.slug}`} className="hover:text-indigo-600 transition">
                                                            {item.product.name}
                                                        </Link>
                                                    </h3>

                                                    {/* Tombol Hapus */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteItem(item.id)}
                                                        className="text-slate-400 hover:text-red-500 transition p-1 -mr-1 -mt-1"
                                                        title="Hapus item"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Varian / Warna / Kategori */}
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                    Color: {item.product.color || 'Default'}
                                                </p>

                                                {/* Stock Status Badge */}
                                                <div className="mt-2">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50/80 text-indigo-700">
                                                        <FiTruck className="w-3 h-3" />
                                                        In Stock
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Counter & Price Bottom Row */}
                                            <div className="flex items-end justify-between mt-4 pt-2">
                                                {/* Counter +/- Input */}
                                                <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-lg p-0.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity, -1, item.product.stock)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded-md disabled:opacity-40 transition font-medium text-sm"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity, 1, item.product.stock)}
                                                        disabled={item.quantity >= item.product.stock}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded-md disabled:opacity-40 transition font-medium text-sm"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Harga Unit / Subtotal */}
                                                <div className="text-right">
                                                    <p className="text-lg sm:text-xl font-black text-[#1e1b4b]">
                                                        {formatRupiah(Number(item.product.price) * item.quantity)}
                                                    </p>
                                                    {item.product.original_price && (
                                                        <p className="text-xs font-semibold text-slate-300 line-through">
                                                            {formatRupiah(Number(item.product.original_price) * item.quantity)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Kolom Kanan: Order Summary Card (5 Spans) */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs sticky top-24">
                                <h2 className="text-xl font-bold text-slate-900 mb-5">
                                    Order Summary
                                </h2>

                                {/* Promo Code Input */}
                                <div className="flex gap-2 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Kode Promo"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition"
                                    >
                                        Apply
                                    </button>
                                </div>

                                {/* Calculation Breakdown */}
                                <div className="space-y-3.5 text-xs text-slate-500 font-medium border-b border-slate-100 pb-5">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-slate-800">{formatRupiah(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimasi Pengiriman</span>
                                        <span className="font-bold text-slate-800">Gratis</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimasi Pajak (PPN 11%)</span>
                                        <span className="font-bold text-slate-800">{formatRupiah(tax)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-indigo-600 font-semibold">
                                            <span>Diskon</span>
                                            <span>-{formatRupiah(discount)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Total Price */}
                                <div className="flex justify-between items-baseline pt-5 mb-6">
                                    <span className="text-base font-bold text-slate-900">Total</span>
                                    <span className="text-2xl font-black text-[#1e1b4b]">
                                        {formatRupiah(grandTotal)}
                                    </span>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    type="button"
                                    className="w-full bg-[#1e1b4b] hover:bg-[#15133c] text-white font-bold py-3.5 px-4 rounded-2xl transition duration-200 shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm group"
                                >
                                    <span>Proceed to Checkout</span>
                                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Footer Guarantee */}
                                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                                    <FiLock className="w-3 h-3" />
                                    <span>Pembayaran aman & terenkripsi</span>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}

CartIndex.layout = undefined;
<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    // Tampilkan Halaman Keranjang Belanja
    public function index()
    {
        $cartItems = CartItem::with('product.category')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Public/Cart/Index', [
            'cartItems' => $cartItems,
        ]);
    }

    // Tambah Produk ke Keranjang
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Cek apakah stok mencukupi
        if ($product->stock < $request->quantity) {
            return back()->withErrors(['quantity' => 'Stok produk tidak mencukupi.']);
        }

        // Simpan atau update quantity jika produk sudah ada di keranjang
        $cartItem = CartItem::firstOrNew([
            'user_id'    => auth()->id(),
            'product_id' => $product->id,
        ]);

        $newQuantity = $cartItem->exists 
            ? $cartItem->quantity + $request->quantity 
            : $request->quantity;

        if ($newQuantity > $product->stock) {
            return back()->withErrors(['quantity' => 'Total pesanan melebihi stok yang tersedia.']);
        }

        $cartItem->quantity = $newQuantity;
        $cartItem->save();

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    // Update Jumlah (Quantity)
    public function update(Request $request, CartItem $cartItem)
    {
        // Pastikan item milik user yang sedang login
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cartItem->product->stock < $request->quantity) {
            return back()->withErrors(['quantity' => 'Stok tidak mencukupi.']);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return back();
    }

    // Hapus Item dari Keranjang
    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item berhasil dihapus dari keranjang.');
    }
}
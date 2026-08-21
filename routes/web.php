<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Public\CartController;
use App\Http\Controllers\Public\ProductCatalogController;

// Route Publik
Route::get('/', [ProductCatalogController::class, 'index'])->name('home');
Route::get('/products/{slug}', [ProductCatalogController::class, 'show'])->name('products.show');

// Route Authenticated (User / Pembeli)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Alihkan /dashboard berdasarkan role
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // Jika role USER biasa, langsung alihkan ke katalog utama '/'
        return redirect()->route('home');
    })->name('dashboard');

    // Keranjang Belanja
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
});

// Route Admin
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('categories', CategoryController::class)->except(['show']);
        Route::resource('products', ProductController::class)->except(['show']);
    });

require __DIR__.'/settings.php';
<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Public\ProductCatalogController;
use inertia\Inertia;

// Route Publik
Route::get('/', [ProductCatalogController::class, 'index'])->name('home');
Route::get('/products/{slug}', [ProductCatalogController::class, 'show'])->name('products.show');

// Route Authenticated (User / Pembeli)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // Jika admin mengakses /dashboard biasa, redirect ke /admin/dashboard
        if (auth()->user()->role === 'admin') { // Sesuaikan nama kolom role Anda (misal: 'admin', 'is_admin', dll)
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});
require __DIR__.'/settings.php';
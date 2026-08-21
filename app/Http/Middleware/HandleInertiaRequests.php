<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            
            // Menambahkan cartCount secara otomatis ke seluruh halaman
            'cartCount' => function () use ($request) {
                $user = $request->user();

                if (!$user) {
                    return 0;
                }

                // Pilih salah satu opsi kalkulasi di bawah ini sesuai struktur database/relasi Anda:

                // Opsi A: Menghitung total jumlah kuantitas barang (misal: 2 Baju + 3 Celana = 5)
                return $user->cartItems()->sum('quantity');

                // Opsi B: Menghitung jumlah variasi barang unik (misal: 2 Baju + 3 Celana = 2 item)
                // return $user->cartItems()->count();
            },
        ];
    }
}
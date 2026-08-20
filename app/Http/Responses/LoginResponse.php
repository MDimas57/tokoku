<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request): Response
    {
        $user = auth()->user();

        // Redirect berdasarkan role akun
        if ($user && $user->role === 'admin') { // Sesuaikan nama kolom role di DB Anda (misal: 'admin', 'is_admin', dll)
            return redirect()->route('admin.dashboard');
        }

        // Untuk user/pembeli biasa
        return redirect()->intended('/dashboard');
    }
}
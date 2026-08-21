import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { 
    FiShoppingCart, 
    FiUser, 
    FiSearch, 
    FiChevronDown, 
    FiSettings, 
    FiLogOut 
} from 'react-icons/fi';

interface User {
    id: number;
    name: string;
    email: string;
}

// Menambahkan cartCount ke dalam Shared Page Props Inertia
interface PageProps {
    auth: {
        user: User | null;
    };
    cartCount?: number;
    [key: string]: unknown;
}

interface HeaderProps {
    search: string;
    setSearch: (value: string) => void;
    handleSearch: (e: FormEvent) => void;
    cartCount?: number; // Opsional: tetap disediakan jika ingin override manual via props
}

export default function Header({ search, setSearch, handleSearch, cartCount: propCartCount }: HeaderProps) {
    // Mengambil auth dan cartCount global dari Inertia Page Props
    const { auth, cartCount: sharedCartCount } = usePage<PageProps>().props;
    
    // Gunakan cartCount dari props jika ada, jika tidak gunakan dari shared props Inertia, default ke 0
    const totalCartItems = propCartCount ?? sharedCartCount ?? 0;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        router.post('/logout');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#1e1b4b] text-[#67e8f9] flex items-center justify-center font-black text-lg shadow-xs">
                    T
                </div>
                <div>
                    <span className="text-lg font-black tracking-tight text-[#1e1b4b] block leading-none">
                        TOKOKU<span className="text-cyan-500">.</span>
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 block -mt-0.5">
                        Store Layout
                    </span>
                </div>
            </Link>

            {/* Form Pencarian */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-1/3">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari produk impianmu..."
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5" />
            </form>

            {/* Actions (Cart & User Auth) */}
            <div className="flex items-center gap-3">
                {/* Cart Link dengan Dinamis Count */}
                <Link
                    href="/cart"
                    className="relative p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center group"
                >
                    <FiShoppingCart className="w-5 h-5 group-hover:text-[#1e1b4b] transition-colors" />
                    {totalCartItems > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                            {totalCartItems > 99 ? '99+' : totalCartItems}
                        </span>
                    )}
                </Link>

                {/* User Section */}
                {auth.user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-100"
                        >
                            <div className="w-7 h-7 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center text-xs font-bold">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 hidden sm:inline max-w-[100px] truncate">
                                {auth.user.name}
                            </span>
                            <FiChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-1.5 z-50">
                                <div className="px-4 py-2 border-b border-gray-50">
                                    <p className="text-xs font-bold text-gray-900 truncate">{auth.user.name}</p>
                                    <p className="text-[10px] text-gray-400 truncate">{auth.user.email}</p>
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <FiSettings className="w-4 h-4 text-gray-400" />
                                    <span>Edit Akun</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                                >
                                    <FiLogOut className="w-4 h-4 text-red-500" />
                                    <span>Keluar</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-100"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center text-xs font-bold">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
                            Masuk
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
}
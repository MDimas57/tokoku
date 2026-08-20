import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Selamat datang di dashboard admin Tokoku.
                    </p>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-6">
                        <p className="text-sm text-muted-foreground">
                            Total Produk
                        </p>
                        <p className="mt-2 text-3xl font-bold">0</p>
                    </div>

                    <div className="rounded-xl border p-6">
                        <p className="text-sm text-muted-foreground">
                            Total User
                        </p>
                        <p className="mt-2 text-3xl font-bold">0</p>
                    </div>

                    <div className="rounded-xl border p-6">
                        <p className="text-sm text-muted-foreground">
                            Total Pesanan
                        </p>
                        <p className="mt-2 text-3xl font-bold">0</p>
                    </div>
                </div>

                <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-xl border">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-muted-foreground">
                            Grafik penjualan akan ditampilkan di sini.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs,
};
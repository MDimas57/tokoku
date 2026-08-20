import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string | number;
    stock: number;
    image: string | null;
    is_active: boolean;
    category: Category | null;
};

type Props = {
    products: Product[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Produk',
        href: '/admin/products',
    },
];

const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(price));
};

export default function Index({ products }: Props) {
    const deleteProduct = (product: Product) => {
        const confirmed = window.confirm(
            `Apakah kamu yakin ingin menghapus produk "${product.name}"?`,
        );

        if (!confirmed) {
            return;
        }

        router.delete(`/admin/products/${product.id}`);
    };

    return (
        <>
            <Head title="Produk" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Produk
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola produk yang tersedia di Tokoku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/products/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Produk
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        #
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Produk
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Kategori
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Harga
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Stok
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-right text-sm font-medium">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-8 text-center text-sm text-muted-foreground"
                                        >
                                            Belum ada produk.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product, index) => (
                                        <tr
                                            key={product.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 text-sm">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 overflow-hidden rounded-lg border bg-muted">
                                                        {product.image ? (
                                                            <img
                                                                src={`/storage/${product.image}`}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {product.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {product.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-sm">
                                                {product.category?.name ??
                                                    '-'}
                                            </td>

                                            <td className="px-4 py-3 text-sm font-medium">
                                                {formatPrice(product.price)}
                                            </td>

                                            <td className="px-4 py-3 text-sm">
                                                {product.stock}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        product.is_active
                                                            ? 'rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'
                                                            : 'rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700'
                                                    }
                                                >
                                                    {product.is_active
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/products/${product.id}/edit`}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                product,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs,
};
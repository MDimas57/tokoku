import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

type Category = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
};

type Props = {
    categories: Category[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Kategori',
        href: '/admin/categories',
    },
];

export default function Index({ categories }: Props) {
    const deleteCategory = (category: Category) => {
        const confirmed = window.confirm(
            `Apakah kamu yakin ingin menghapus kategori "${category.name}"?`,
        );

        if (!confirmed) {
            return;
        }

        router.delete(`/admin/categories/${category.id}`);
    };

    return (
        <>
            <Head title="Kategori" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Kategori
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola kategori produk Tokoku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/categories/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kategori
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        #
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Nama
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Slug
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
                                {categories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-8 text-center text-sm text-muted-foreground"
                                        >
                                            Belum ada kategori.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category, index) => (
                                        <tr
                                            key={category.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 text-sm">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 text-sm font-medium">
                                                {category.name}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                                {category.slug}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        category.is_active
                                                            ? 'rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'
                                                            : 'rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700'
                                                    }
                                                >
                                                    {category.is_active
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
                                                            href={`/admin/categories/${category.id}/edit`}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() =>
                                                            deleteCategory(
                                                                category,
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
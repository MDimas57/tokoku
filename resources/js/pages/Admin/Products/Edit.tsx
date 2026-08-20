import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { BreadcrumbItem } from '@/types';

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string | number;
    stock: number;
    image: string | null;
    is_active: boolean;
};

type Props = {
    product: Product;
    categories: Category[];
};

export default function Edit({
    product,
    categories,
}: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        category_id: string;
        name: string;
        description: string;
        price: string;
        stock: string;
        image: File | null;
        is_active: boolean;
        _method: 'PUT';
    }>({
        category_id: String(product.category_id),
        name: product.name,
        description: product.description ?? '',
        price: String(product.price),
        stock: String(product.stock),
        image: null,
        is_active: product.is_active,
        _method: 'PUT',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Produk',
            href: '/admin/products',
        },
        {
            title: `Edit ${product.name}`,
            href: `/admin/products/${product.id}/edit`,
        },
    ];

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post(`/admin/products/${product.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${product.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <Button variant="ghost" asChild>
                        <Link href="/admin/products">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="max-w-3xl rounded-xl border p-6">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold">
                            Edit Produk
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Perbarui informasi produk.
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        {/* Kategori */}
                        <div className="space-y-2">
                            <Label htmlFor="category_id">
                                Kategori
                            </Label>

                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(event) =>
                                    setData(
                                        'category_id',
                                        event.target.value,
                                    )
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">
                                    Pilih kategori
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="text-sm text-red-600">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Nama */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nama Produk
                            </Label>

                            <Input
                                id="name"
                                value={data.name}
                                onChange={(event) =>
                                    setData(
                                        'name',
                                        event.target.value,
                                    )
                                }
                            />

                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Deskripsi
                            </Label>

                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(event) =>
                                    setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                rows={5}
                            />

                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Harga & Stok */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="price">
                                    Harga
                                </Label>

                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(event) =>
                                        setData(
                                            'price',
                                            event.target.value,
                                        )
                                    }
                                />

                                {errors.price && (
                                    <p className="text-sm text-red-600">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">
                                    Stok
                                </Label>

                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={data.stock}
                                    onChange={(event) =>
                                        setData(
                                            'stock',
                                            event.target.value,
                                        )
                                    }
                                />

                                {errors.stock && (
                                    <p className="text-sm text-red-600">
                                        {errors.stock}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Gambar Lama */}
                        {product.image && (
                            <div className="space-y-2">
                                <Label>
                                    Gambar Saat Ini
                                </Label>

                                <div className="h-32 w-32 overflow-hidden rounded-lg border">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Gambar Baru */}
                        <div className="space-y-2">
                            <Label htmlFor="image">
                                Ganti Gambar
                            </Label>

                            <Input
                                id="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(event) =>
                                    setData(
                                        'image',
                                        event.target.files?.[0] ??
                                            null,
                                    )
                                }
                            />

                            <p className="text-xs text-muted-foreground">
                                Kosongkan jika tidak ingin mengganti
                                gambar. Format JPG, JPEG, PNG, atau
                                WEBP. Maksimal 2 MB.
                            </p>

                            {errors.image && (
                                <p className="text-sm text-red-600">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData(
                                        'is_active',
                                        event.target.checked,
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300"
                            />

                            <Label htmlFor="is_active">
                                Produk aktif
                            </Label>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Produk',
            href: '/admin/products',
        },
    ],
};
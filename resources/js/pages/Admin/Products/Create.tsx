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

type Props = {
    categories: Category[];
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
    {
        title: 'Tambah Produk',
        href: '/admin/products/create',
    },
];

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        category_id: string;
        name: string;
        description: string;
        price: string;
        stock: string;
        image: File | null;
        is_active: boolean;
    }>({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '0',
        image: null,
        is_active: true,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/admin/products', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Produk" />

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
                            Tambah Produk
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Tambahkan produk baru ke Tokoku.
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
                                placeholder="Contoh: Laptop ASUS"
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
                                placeholder="Deskripsi produk..."
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
                                    placeholder="1500000"
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

                        {/* Gambar */}
                        <div className="space-y-2">
                            <Label htmlFor="image">
                                Gambar Produk
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
                                Format JPG, JPEG, PNG, atau WEBP.
                                Maksimal 2 MB.
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
                                    : 'Simpan Produk'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs,
};
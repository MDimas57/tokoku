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
    slug: string;
    description: string | null;
    is_active: boolean;
};

type Props = {
    category: Category;
};

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description ?? '',
        is_active: category.is_active,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Kategori',
            href: '/admin/categories',
        },
        {
            title: `Edit ${category.name}`,
            href: `/admin/categories/${category.id}/edit`,
        },
    ];

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        put(`/admin/categories/${category.id}`);
    };

    return (
        <>
            <Head title={`Edit ${category.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <Button variant="ghost" asChild>
                        <Link href="/admin/categories">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <div className="max-w-2xl rounded-xl border p-6">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold">
                            Edit Kategori
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Perbarui informasi kategori{' '}
                            <span className="font-medium">
                                {category.name}
                            </span>
                            .
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        {/* Nama */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nama Kategori
                            </Label>

                            <Input
                                id="name"
                                name="name"
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
                                name="description"
                                value={data.description}
                                onChange={(event) =>
                                    setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                rows={4}
                            />

                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3">
                            <input
                                id="is_active"
                                name="is_active"
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
                                Kategori aktif
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
            title: 'Kategori',
            href: '/admin/categories',
        },
    ],
};
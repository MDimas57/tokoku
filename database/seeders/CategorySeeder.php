<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Elektronik',
                'description' => 'Produk elektronik dan perangkat teknologi.',
            ],
            [
                'name' => 'Fashion',
                'description' => 'Pakaian, sepatu, dan aksesoris.',
            ],
            [
                'name' => 'Makanan',
                'description' => 'Berbagai produk makanan dan minuman.',
            ],
            [
                'name' => 'Kecantikan',
                'description' => 'Produk perawatan dan kecantikan.',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'is_active' => true,
            ]);
        }
    }
}
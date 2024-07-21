<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'zakaria',
            'last_name' => 'slimi',
            'email' => 'zakaria@gmail.com',
            'password' => '12345678',
            'admin' => true,
        ]);
        // User::factory(5)->create();
    }
}

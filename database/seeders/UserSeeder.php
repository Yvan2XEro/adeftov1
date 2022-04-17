<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\models\User;
use App\Models\Permission;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = \App\Models\User::create([
            'firstname' => "Admin",
            'lastname' => "Admin",
            'email' => "admin@gmail.com",
            'email_verified_at' => now(),
            'phone' => '0123456789',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ]);

        $admin->attachRole('superadministrator');

        $permissions = Permission::all();

        foreach ($permissions as $pem) {
            $admin->attachPermission($pem);
        }

        $admin->save();
    }
}

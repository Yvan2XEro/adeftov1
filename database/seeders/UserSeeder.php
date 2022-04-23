<?php

namespace Database\Seeders;

use App\Models\Contribution;
use Illuminate\Database\Seeder;
use App\Models\User;
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
        $faker = \Faker\Factory::create();
        $admin = User::create([
            'firstname' => "Admin",
            'lastname' => "Admin",
            'email' => "admin@adefto.com",
            'email_verified_at' => now(),
            'phone' => '0123456789',
            'city' => 'Dschang',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ]);

        $admin->attachRole('superadministrator');

        $permissions = Permission::all();

        foreach ($permissions as $pem) {
            $admin->attachPermission($pem);
        }

        $admin->save();

        $j = User::create([
            'firstname' => "John",
            'lastname' => "Doe",
            'email' => "john@gmail.com",
            'email_verified_at' => now(),
            'phone' => '0123456789',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'city' => 'Cairo',
        ]);
        $j->attachRole('administrator');
        $j->save();

        $contribution = Contribution::create([
            'user_id' => $j->id,
            'is_active' => true,
            'name' => 'Adefto COTISATION',
            'description' => $faker->text(100),
        ]);
        $contribution->save();

        for ($i = 0; $i < 10; $i++) {
            $user = User::create([
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'phone' => '0123456789',
                'city' => $faker->city,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ]);
            $user->attachRole('user');
            $user->save();
            $contribution->membershipRequests()->create([
                'user_id' => $user->id,
                'is_accepted' => true,
            ]);
            $contribution->members()->attach($user->id);
            $session = $contribution->sessions()->create([
                'date' => '2022-'. ($i<10? '0'.$i: $i) .'-15',
            ]);
            $session->payments()->create([
                'amount' => $faker->numberBetween(100, 1000),
                'currency' => 'XAF',
                'transaction_id' => uniqid(),
                'customer_name' => $user->firstname,
                'customer_surname' => $faker->lastname,
                'status' => 'paid',
                'transaction_date' => now(),
                'payment_method' => 'mobile money',
                'payment_date' => now(),
                'operation_id' => $faker->numberBetween(1, 100),
                'description' => $faker->text(100),
                'payment_token' => $faker->text(100),
                'user_id' => $user->id,
                'session_id' => $session->id,
            ]);

        }
    }
}

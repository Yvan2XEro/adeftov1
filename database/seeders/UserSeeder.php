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

        $c = Contribution::create([
            'user_id' => $admin->id,
            'is_active' => true,
            'name' => 'Adefto COTISATION',
            'description' => "Une description par defaut",
        ]);
        $c->members()->attach($admin);
        $c->specialsMembers()->attach($admin);

        $admin->save();

        // $j = User::create([
        //     'firstname' => "John",
        //     'lastname' => "Doe",
        //     'email' => "john@gmail.com",
        //     'email_verified_at' => now(),
        //     'phone' => '0123456789',
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        //     'remember_token' => Str::random(10),
        //     'city' => $faker->randomElement($this->cities),
        // ]);
        // $j->attachRole('administrator');
        // $j->save();


        // $contribution->members()->attach($j);
        // $contribution->save();

        // for ($i = 0; $i < 10; $i++) {
        //     $user = User::create([
        //         'firstname' => $faker->firstName,
        //         'lastname' => $faker->lastName,
        //         'email' => $faker->unique()->safeEmail,
        //         'email_verified_at' => now(),
        //         'phone' => '0123456789',
        //         'city' => $faker->randomElement($this->cities),
        //         'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        //         'remember_token' => Str::random(10),
        //     ]);
        //     $user->attachRole('user');
        //     $user->save();
        //     $contribution->membershipRequests()->create([
        //         'user_id' => $user->id,
        //         'is_accepted' => true,
        //     ]);
        //     $contribution->members()->attach($user);
        //     $session = $contribution->sessions()->create([
        //         'date' => '2022-' . (($i + 1) < 10 ? '0' . $i + 1 : $i) . '-15 23:14:21',
        //     ]);
        //     $session->payments()->create([
        //         'amount' => $faker->numberBetween(100, 1000),
        //         'status' => 'paid',
        //         'user_id' => $user->id,
        //         'session_id' => $session->id,
        //     ]);
        // }
    }

    private
    $cities = [
        "Abong-Mbang",
        "Afanloum",
        "Ako",
        "Akoeman",
        "Akom II",
        "Akono",
        "Akonolinga",
        "Akwaya",
        "Alou",
        "Ambam",
        "Andek",
        "Angossas",
        "Atok",
        "Awaé",
        "Ayos",
    ];
}

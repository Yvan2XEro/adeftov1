<?php

namespace Database\Seeders;

use App\Models\Contribution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contributions = Contribution::all();
        $i = 0;
        // create 5 sessions for every contributions
        foreach($contributions as $contribution) {
            $i++;
            for($j = 1; $j < 11; $j++) {
                $contribution->sessions()->create([
                    'date' => date('Y-m-d', strtotime('+'.($j*30).' days')),
                    'month' => date('m', strtotime('+'.($j*30).' days')),
                ]);
            }
        }
    }
}

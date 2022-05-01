<?php

namespace App\Console;

use App\Models\Contribution;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $contributions = Contribution::where('is_active', true)->get();
            foreach ($contributions as $contribution) {
                $members = $contribution->members;
                // Save new Session in DB, with date from now + 30 days
                $contribution->sessions()->create([
                    'date' => date('Y-m-d', strtotime('+30 days')),
                ]);
                // Notify all members
            }
        })->monthlyOn(+date('d'), date('H:i:s'));
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

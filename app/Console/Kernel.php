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
                // Save new Session in DB, with date from now + 30 days if not exists
                $session = $contribution->sessions()->where('m', '==', date('m', strtotime('+30 days')))->first();

                if (!$session) {
                    $session = $contribution->sessions()->create([
                        'date' => date('Y-m-d', strtotime('+30 days')),
                        'month' => date('m', strtotime('+30 days')),
                    ]);
                    // Notify all members with swift mailer
                    $transport = (new \Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
                        ->setUsername(env('MAIL_USERNAME'))
                        ->setPassword(env('MAIL_PASSWORD'));
                    $mailer = new \Swift_Mailer($transport);

                    foreach ($members as $member) {
                        $message = (new \Swift_Message('Nouvelle session de contribution'))
                        ->setFrom(env('MAIL_USERNAME'))
                        ->setTo($member->pluck('email')->toArray())
                        ->setBody(
                            view('emails.session', ['contribution' => $contribution, 'session' => $session])->render(),
                            'text/html'
                        );
                        $mailer->send($message);
                    }
                }
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
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        /*
         * foreach user create 5 activites
         */
        foreach ($users as $user) {
            Activity::factory()
                ->count(5)
                ->for($user)
                ->create();
        }
    }
}

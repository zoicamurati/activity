<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->upsert([
            [
                "name" => "user1",
                "email" => "user1@gmail.com",
                "password" => Hash::make('12345678'),
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "name" => "user2",
                "email" => "user2@gmail.com",
                "password" => Hash::make('12345678'),
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ], ['name', 'email']);
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'AuthController@login')->name('login');
Route::post('register', 'AuthController@register')->name('register');

/**
 * Auth Routers
 */
Route::group(['middleware' => 'api','prefix' => 'auth'], function ($router) {

    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

/**
 * Activity Resource router
 */
/*'middleware' => 'jwt.verify',*/
Route::group([ 'prefix' => 'activites'], function ($router) {

    Route::get('/', 'ActivityController@index')->name('activites.index');
    Route::post('/', 'ActivityController@store')->name('activites.store');
    Route::get('/{id}', 'ActivityController@show')->name('activites.show');
    Route::put('/{id}', 'ActivityController@update')->name('activites.update');
    Route::patch('/{id}/status', 'ActivityController@updateStatus')->name('activites.update.status');
    Route::delete('/{id}', 'ActivityController@destroy')->name('activites.destroy');

});

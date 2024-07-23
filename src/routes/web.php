<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemActionController;
use App\Http\Controllers\SpaceItemController;
use Inertia\Inertia;

//Auth


Route::get('/', function () {
    return redirect("login");
});

//Login
Route::get('login', [LoginController::class, 'create'])
->name('login')
->middleware('guest');


Route::post('login', [LoginController::class, 'store'])
->name('login.store')
->middleware('guest');

//Logout
Route::delete('logout', [LoginController::class,'destroy'])
->name('logout')
->middleware('auth');

//Client



Route::group(['middleware' => ['auth', 'user']], function() {

    //My Drive Routes
    Route::get('client', [ItemActionController::class, 'index'])
    ->name('client.drive')
    ->middleware('auth');
    
    Route::get('client/{folder}/list', [ItemActionController::class, 'filter'])
    ->name('client.drive.list')
    ->middleware('auth');

    //Started Folders OR Files 
    Route::get('client/started', [ItemActionController::class, 'indexStar'])
    ->name('client.started')
    ->middleware('auth');


    //Deleted Folders Or Files
    Route::get('client/trash', [ItemActionController::class, 'indexTrash'])
    ->name('client.trash')
    ->middleware('auth');




    //Spaces Folders
    Route::get('client/spaces/{id?}', [SpaceItemController::class, "index"])
    ->name('client.spaces')
    ->middleware('auth');

    //spaces sub folders
    Route::get('client/spaces/{id}/{folder}/list', [SpaceItemController::class, 'filter'])
    ->name('client.spaces.list')
    ->middleware('auth');


    //Folder,File Utility

    Route::put('client/{item}/star', [ItemActionController::class, 'started'])
    ->name('client.drive.star')
    ->middleware('auth');

    Route::delete('client/{item}/delete', [ItemActionController::class, 'deleted'])
    ->name('client.drive.delete')
    ->middleware('auth');


    //Files Utility

    //Upload File

    Route::post('client/{spc?}/file', [FileController::class, 'upload'])
    ->name('client.drive.file.store')
    ->middleware('auth');


    //Add Folders
    Route::post('client/{id?}', [FolderController::class, 'store'])
    ->name('client.drive.store')
    ->middleware('auth');

    //Generate File Link
    Route::post('client/{file}/temp', [FileController::class, 'getTempLink'])
    ->name('link.generate')
    ->middleware('auth');

    //Download File
    Route::get('download/{file}', [FileController::class, 'download'])
    ->name('link.download')
    ->middleware('auth');
});

//Temp Link Generator


Route::get('temp/download/{link}', [FileController::class, 'downloadTemp'])
->name('local.temp');





Route::group(['middleware' => ['auth', 'admin']], function() {
    
    //Admin

    Route::get('admin',[DashboardController::class, 'index'])
    ->name('admin.home')
    ->middleware('auth');

    //Users Management
    Route::get('admin/users', [UserController::class, 'index'])
        ->name('admin.users')
        ->middleware('auth');

    Route::get('admin/users/create', [UserController::class, 'create'])
        ->name('admin.users.create')
        ->middleware('auth');

    Route::post('admin/users', [UserController::class, 'store'])
        ->name('admin.users.store')
        ->middleware('auth');

    Route::get('admin/users/{user}/edit', [UserController::class, 'edit'])
        ->name('admin.users.edit')
        ->middleware('auth');

    Route::put('admin/users/{user}', [UserController::class, 'update'])
        ->name('admin.users.update')
        ->middleware('auth');

    Route::delete('admin/users/{user}', [UserController::class, 'destroy'])
        ->name('admin.users.destroy')
        ->middleware('auth');

    Route::put('admin/users/{user}/restore', [UserController::class, 'restore'])
        ->name('admin.users.restore')
        ->middleware('auth');


    // Spaces Management
    Route::get('admin/spaces', [SpaceController::class, 'index'])
    ->name('admin.spaces')
    ->middleware('auth');

    Route::get('admin/spaces/create', [SpaceController::class, 'create'])
    ->name('admin.spaces.create')
    ->middleware('auth');

    Route::post('admin/spaces', [SpaceController::class, 'store'])
    ->name('admin.spaces.store')
    ->middleware('auth');

    Route::get('admin/spaces/{space}/edit', [SpaceController::class, 'edit'])
    ->name('admin.spaces.edit')
    ->middleware('auth');

    Route::put('admin/spaces/{space}', [SpaceController::class, 'update'])
    ->name('admin.spaces.update')
    ->middleware('auth');

    Route::delete('admin/spaces/{space}', [SpaceController::class, 'destroy'])
    ->name('admin.spaces.destroy')
    ->middleware('auth');

    Route::put('admin/spaces/{space}/restore', [SpaceController::class, 'restore'])
    ->name('admin.spaces.restore')
    ->middleware('auth');
});
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemActionController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\SpaceItemController;

//Auth
Route::middleware('locale')->group(function() {
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
    ->name('logout');

    //Client



    Route::group(['middleware' => ['auth', 'user']], function() {

        //My Drive Routes
        Route::get('client', [ItemActionController::class, 'index'])
        ->name('client.drive');
        
        Route::get('client/{folder}/list', [ItemActionController::class, 'filter'])
        ->name('client.drive.list');

        //Starred Folders OR Files 
        Route::get('client/starred', [ItemActionController::class, 'indexStar'])
        ->name('client.starred');


        //Deleted Folders Or Files
        Route::get('client/trash', [ItemActionController::class, 'indexTrash'])
        ->name('client.trash');




        //Spaces Folders
        Route::get('client/spaces/{id?}', [SpaceItemController::class, "index"])
        ->name('client.spaces');

        //spaces sub folders
        Route::get('client/spaces/{id}/{folder}/list', [SpaceItemController::class, 'filter'])
        ->name('client.spaces.list');


        //Folder,File Utility

        Route::put('client/{item}/star', [ItemActionController::class, 'starred'])
        ->name('client.drive.star');

        Route::delete('client/{item}/delete', [ItemActionController::class, 'deleted'])
        ->name('client.drive.delete');


        //Files Utility

        //Upload File

        Route::post('client/file/{spc?}', [FileController::class, 'upload'])
        ->name('client.drive.file.store');


        //Add Folders
        Route::post('client/{id?}', [FolderController::class, 'store'])
        ->name('client.drive.store');

        //Generate File Link
        Route::post('client/{file}/temp', [FileController::class, 'getTempLink'])
        ->name('link.generate');

        //Download File
        Route::get('download/{file}', [FileController::class, 'download'])
        ->name('link.download');
    });

    //Temp Link Generator


    Route::get('temp/download/{link}', [FileController::class, 'downloadTemp'])
    ->name('local.temp');



    Route::post('/language', [LanguageController::class, 'store'])->name('language.store');


    Route::group(['middleware' => ['auth', 'admin']], function() {
        
        //Admin

        Route::get('admin',[DashboardController::class, 'index'])
        ->name('admin.home');

        //Users Management
        Route::get('admin/users', [UserController::class, 'index'])
            ->name('admin.users')
    ;

        Route::get('admin/users/create', [UserController::class, 'create'])
            ->name('admin.users.create')
    ;

        Route::post('admin/users', [UserController::class, 'store'])
            ->name('admin.users.store')
    ;

        Route::get('admin/users/{user}/edit', [UserController::class, 'edit'])
            ->name('admin.users.edit')
    ;

        Route::put('admin/users/{user}', [UserController::class, 'update'])
            ->name('admin.users.update')
    ;

        Route::delete('admin/users/{user}', [UserController::class, 'destroy'])
            ->name('admin.users.destroy')
    ;

        Route::put('admin/users/{user}/restore', [UserController::class, 'restore'])
            ->name('admin.users.restore')
    ;


        // Spaces Management
        Route::get('admin/spaces', [SpaceController::class, 'index'])
        ->name('admin.spaces');

        Route::get('admin/spaces/create', [SpaceController::class, 'create'])
        ->name('admin.spaces.create');

        Route::post('admin/spaces', [SpaceController::class, 'store'])
        ->name('admin.spaces.store');

        Route::get('admin/spaces/{space}/edit', [SpaceController::class, 'edit'])
        ->name('admin.spaces.edit');

        Route::put('admin/spaces/{space}', [SpaceController::class, 'update'])
        ->name('admin.spaces.update');

        Route::delete('admin/spaces/{space}', [SpaceController::class, 'destroy'])
        ->name('admin.spaces.destroy');

        Route::put('admin/spaces/{space}/restore', [SpaceController::class, 'restore'])
        ->name('admin.spaces.restore');


        //
    });
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ItemActionController;

use Inertia\Inertia;

//Auth

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

//My Drive Routes
Route::get('client/{folder}/list', [FolderController::class, 'filter'])
    ->name('client.drive.list')
    ->middleware('auth');

Route::get('client', [FolderController::class, 'index'])
->name('client.drive')
->middleware('auth');

Route::post('client', [FolderController::class, 'store'])
    ->name('client.drive.store')
    ->middleware('auth');


//Folder Utility

Route::put('client/{item}/star', [ItemActionController::class, 'started'])
->name('client.drive.star')
->middleware('auth');

Route::delete('client/{item}/delete', [ItemActionController::class, 'deleted'])
->name('client.drive.delete')
->middleware('auth');


//Started Folders OR Files 
Route::get('client/started', [FolderController::class, 'indexStar'])
->name('client.started')
->middleware('auth');


//Deleted Folders Or Files
Route::get('client/trash', [FolderController::class, 'indexTrash'])
->name('client.trash')
->middleware('auth');


//Shared Folders
Route::get('client/shared', function () {
    return Inertia::render('Client/Shared');
})
->name('client.shared')
->middleware('auth');


//Files Utility

//Upload File

Route::post('client/file', [FileController::class, 'upload'])
    ->name('client.drive.file.store')
    ->middleware('auth');


// Route::get('client/started', function () {
//     return Inertia::render('Client/Started');
// })
// ->name('client.started')
// ->middleware('auth');


// Route::get('client/trash', function () {
//     return Inertia::render('Client/Trash');
// })
// ->name('client.trash')
// ->middleware('auth');


//Admin


Route::get('admin', function () {
    return Inertia::render('Admin/Index');
})
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


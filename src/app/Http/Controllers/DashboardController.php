<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserCollection;
use App\Http\Resources\SpaceCollection;
use App\Http\Resources\FileCollection;


use App\Models\User;
use App\Models\Space;
use App\Models\File;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $users = User::where("admin","=","false")
        ->get();
        $spaces = Space::all();
        $files = File::all();
        return Inertia::render('Admin/Index', [
            'users' => new UserCollection($users),
            'spaces'=>new SpaceCollection($spaces),
            'files'=>new FileCollection($files)
        ]);
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;

use App\Http\Resources\UserCollection;
use App\Http\Resources\SpaceCollection;
use App\Http\Resources\UserSpaceCollection;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Space;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::where("admin","=","false")->get();


        return Inertia::render('Admin/Users', [
            'users' => new UserCollection($users),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Add');
    }

    public function store(UserStoreRequest $request): RedirectResponse
    {
        $validation = $request->validated();
        $validation['admin'] = false;
        $user = User::create(
            $validation
        );
        return redirect('/admin/users');
    }

    public function edit(User $user): Response
    {
        // $spaces = Space::all();
        $mySpaces = $user->spaces;

        $spaces = Space::whereDoesntHave('users', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        return Inertia::render('Admin/Edit', [
            'user' => new UserResource($user),
            'spaces'=> new SpaceCollection($spaces),
            'mySpaces' => new UserSpaceCollection($mySpaces)
        ]);
    }

    public function update(User $user, UserUpdateRequest $request): RedirectResponse
    {
        $validation = $request->validated();
        $spaces = $validation['spaces'];
        unset($validation['spaces']);
        $user->update(
            $validation
        );
        $data = [];
        if(sizeof($spaces)>0){
            foreach ($spaces as $space) {
                $data[$space["id"]] = [
                    'read'=>$space["read"],
                    'write'=>$space["write"],
                ];
            }
        }
        $user->spaces()->sync($data);

        return redirect('/admin/users');
    }

    public function destroy(User $user, UserDeleteRequest $request): RedirectResponse
    {
        $user->delete();

        return redirect('/admin/users');
    }

    public function restore(User $user): RedirectResponse
    {
        $user->restore();

        return Redirect::back()->with('success', 'User restored.');
    }


}

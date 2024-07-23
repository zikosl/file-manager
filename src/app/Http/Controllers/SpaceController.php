<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpaceDeleteRequest;
use App\Http\Requests\SpaceStoreRequest;
use App\Http\Requests\SpaceUpdateRequest;
use App\Http\Resources\SpaceCollection;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\UserSpaceResource;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\FolderCollection;
use App\Http\Resources\FileCollection;
use App\Http\Resources\UserSpaceCollection;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Space;

class SpaceController extends Controller
{
    //Admin
    public function index(): Response
    {
        $spaces = Space::all();

        return Inertia::render('Admin/Space/Index', [
            'spaces' => new SpaceCollection($spaces),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Space/Add');
    }

    public function store(SpaceStoreRequest $request): RedirectResponse
    {
        $validation = $request->validated();
        $space = Space::create(
            $validation
        );
        return redirect('/admin/spaces');
    }

    public function edit(Space $space): Response
    {
        return Inertia::render('Admin/Space/Edit', [
            'space' => new SpaceResource($space),
        ]);
    }

    public function update(Space $space, SpaceUpdateRequest $request): RedirectResponse
    {
        $space->update(
            $request->validated()
        );

        return redirect('/admin/spaces');
    }

    public function destroy(Space $space, SpaceDeleteRequest $request): RedirectResponse
    {
        $space->delete();

        return redirect('/admin/spaces');
    }

    public function restore(Space $space): RedirectResponse
    {
        $space->restore();

        return Redirect::back()->with('success', 'Space restored.');
    }

    //Client
   
}

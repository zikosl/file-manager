<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\SpaceFileCollection;
use App\Http\Resources\SpaceFolderCollection;
use App\Http\Resources\SpaceCollection;
use App\Http\Resources\UserSpaceCollection;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserSpaceResource;
use App\Models\Folder;
use App\Models\User;
use App\Models\Space;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SpaceItemController extends Controller
{
    public function index(Space $id)
    {
        $user = Auth::user();
        $mySpaces = $user->spaces;

        if (isset($id["id"])) {
            $space = $user->spaces()->find($id->id);
        } else if (sizeof($mySpaces) > 0) {
            $space = $mySpaces[0];
        } else {
            return redirect("client");
        }

        //Load all folders inside the root path
        $folders = $space->items()
            ->with("folder")
            ->whereRelation("folder", "folder_id", null)
            ->where("deleted", false)
            ->get();

        //Load all files inside the root path
        $files = $space->items()
            ->with("file")
            ->whereRelation("file", "folder_id", null)
            ->where("deleted", false)
            ->get();

        return Inertia::render('Client/Spaces', [
            'folders' => new SpaceFolderCollection($folders),
            "folder_id" => null,
            "parent" => null,
            "files" => new SpaceFileCollection($files),
            'spaces' => new UserSpaceCollection($mySpaces),
            'space' => new UserSpaceResource($space),
        ]);
    }
    public function filter(Space $id, Folder $folder)
    {
        $user = Auth::user();
        $mySpaces = $user->spaces;

        //Load all folders inside the nested paths

        if (isset($id["id"])) {
            $space = $user->spaces()->find($id->id);
        } else if (sizeof($mySpaces) > 0) {
            $space = $mySpaces[0];
        } else {
            return redirect("client");
        }

        //Load all folders inside the root path
        $folders = $space->items()
            ->with("folder")
            ->whereRelation("folder", "folder_id", $folder->id)
            ->where("deleted", false)
            ->get();

        //Load all files inside the root path
        $files = $space->items()
            ->with("file")
            ->whereRelation("file", "folder_id", $folder->id)
            ->where("deleted", false)
            ->get();


        return Inertia::render('Client/Spaces', [
            'folders' => new SpaceFolderCollection($folders),
            "folder_id" => $folder->id,
            "parent" => $folder->folder_id,
            "files" => new SpaceFileCollection($files),
            'spaces' => new UserSpaceCollection($mySpaces),
            'space' => new UserSpaceResource($space),
        ]);
    }
}

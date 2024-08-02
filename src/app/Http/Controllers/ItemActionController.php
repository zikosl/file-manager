<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Folder;
use App\Models\ItemAction;

use App\Http\Requests\FolderStoreRequest;
use App\Http\Resources\FolderCollection;
use App\Http\Resources\FileCollection;
use App\Http\Resources\UserSpaceCollection;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ItemActionController extends Controller
{

    //Load allItems
    public function index(): Response
    {
        $user = Auth::user();

        $mySpaces = $user->spaces;
        //Load all folders inside the root path
        $folders = $user->folders()
            ->with('item_action')
            ->whereRelation('item_action', 'deleted', false)
            ->whereRelation("item_action", function ($query) {
                $query->whereHas('spaces', function ($query) {
                    $query->where('isShared', true);
                })->orDoesntHave('spaces');
            })
            ->where("folder_id", "=", null)
            ->get();

        //Load all files inside the root path
        $files = $user->files()
            ->with('item_action')
            ->whereRelation('item_action', 'deleted', false)
            ->whereRelation("item_action", function ($query) {
                $query->doesntHave('spaces');
            })
            ->where("folder_id", "=", null)
            ->get();

        return Inertia::render('Client/Index', [
            'folders' => new FolderCollection($folders),
            "folder_id" => null,
            "parent" => null,
            "files" => new FileCollection($files),
            "spaces" => new UserSpaceCollection($mySpaces)
        ]);
    }

    public function filter(Folder $folder): Response
    {
        $user = Auth::user();
        $mySpaces = $user->spaces;

        //Load all folders inside the nested paths
        $folders = $user->folders()
            ->with('item_action')
            ->where("folder_id", "=", $folder->id)
            ->whereRelation('item_action', 'deleted', false)
            ->whereRelation("item_action", function ($query) {
                $query->whereHas('spaces', function ($query) {
                    $query->where('isShared', true);
                })->orDoesntHave('spaces');
            })
            ->get();


        //Load all files inside the nested paths
        $files = $user->files()
            ->with('item_action')
            ->where("folder_id", "=", $folder->id)
            ->whereRelation('item_action', 'deleted', false)
            ->whereRelation("item_action", function ($query) {
                $query->doesntHave('spaces');
            })
            ->get();


        return Inertia::render('Client/Index', [
            'folders' => new FolderCollection($folders),
            "folder_id" => $folder->id,
            "parent" => $folder->folder_id,
            "files" => new FileCollection($files),
            "spaces" => new UserSpaceCollection($mySpaces)
        ]);
    }

    public function indexStar(): Response
    {
        $user = Auth::user();


        $folders = $user->folders()
            ->with('item_action')
            ->whereRelation('item_action', 'starred', true)
            ->whereRelation('item_action', 'deleted', false)
            ->whereRelation("item_action", function ($query) {
                $query->whereHas('spaces', function ($query) {
                    $query->where('isShared', true);
                })->orDoesntHave('spaces');
            })
            ->get();

        //Load all files with star
        $files = $user->files()
            ->with('item_action')
            ->whereRelation('item_action', 'starred', true)
            ->whereRelation('item_action', 'deleted', false)
            ->whereRelation("item_action", function ($query) {
                $query->doesntHave('spaces');
            })
            ->get();
        return Inertia::render('Client/Starred', [
            'folders' => new FolderCollection($folders),
            "folder_id" => null,
            "parent" => null,
            "files" => new FileCollection($files)
        ]);
    }

    public function indexTrash(): Response
    {
        $user = Auth::user();
        $folders = $user->folders()
            ->with('item_action')
            ->whereRelation('item_action', 'deleted', true)
            ->whereRelation("item_action", function ($query) {
                $query->doesntHave('spaces');
            })
            ->get();

        $files = $user->files()
            ->with('item_action')
            ->whereRelation('item_action', 'deleted', true)
            ->whereRelation("item_action", function ($query) {
                $query->doesntHave('spaces');
            })
            ->get();

        return Inertia::render('Client/Trash', [
            'folders' => new FolderCollection($folders),
            "folder_id" => null,
            "parent" => null,
            "files" => new FileCollection($files)
        ]);
    }
    //Update
    public function starred(ItemAction $item): RedirectResponse
    {
        $item->update([
            "starred" => !$item->starred
        ]);


        if ($item->folder) {
            $folder = $item->folder->folder_id;
        } else {
            $folder = $item->file->folder_id;
        }
        if ($folder) {
            return redirect('/client/' . $folder . "/list");
        } else {
            return redirect('/client');
        }
    }

    public function deleted(ItemAction $item): RedirectResponse
    {
        $item->update([
            "deleted" => !$item->deleted
        ]);
        if ($item->folder) {
            $folder = $item->folder->folder_id;
        } else {
            $folder = $item->file->folder_id;
        }

        if ($folder) {
            return redirect('/client/' . $folder . "/list");
        } else {
            return redirect('/client');
        }
    }

    //Share folder within specific space
    public function update(ItemAction $item, Request $request)
    {

        try {
            $item->spaces()->attach([
                $request->id => [
                    "isShared" => true
                ]
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            return Redirect::back()->with('error', 'This item is already part of the selected space');
        }

        if ($item->folder) {
            $folder = $item->folder->folder_id;
        } else {
            $folder = $item->file->folder_id;
        }

        if ($folder) {
            return redirect('/client/' . $folder . "/list");
        } else {
            return redirect('/client');
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\FolderStoreRequest;
use App\Http\Resources\FolderCollection;
use App\Http\Resources\FileCollection;
use App\Models\Folder;
use App\Models\ItemAction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

use Inertia\Inertia;
use Inertia\Response;



class FolderController extends Controller
{
    //Load
    public function index(): Response
    {
        $user = Auth::user();

        //Load all folders inside the root path
        $folders = $user->folders()
        ->with('item_action')
        ->whereRelation('item_action', 'deleted', false)
        ->where("folder_id","=",null)
        ->get();

        //Load all files inside the root path
        $files = $user->files()
        ->with('item_action')
        ->whereRelation('item_action', 'deleted', false)
        ->where("folder_id","=",null)
        ->get();

        return Inertia::render('Client/Index', [
            'folders' => new FolderCollection($folders),
            "folder_id"=>null,
            "parent"=>null,
            "files"=> new FileCollection($files)
        ]);
    }

    public function filter(Folder $folder): Response
    {
        $user = Auth::user();

        //Load all folders inside the nested paths
        $folders = $user->folders()
        ->with('item_action')
        ->where("folder_id","=",$folder->id)
        ->whereRelation('item_action', 'deleted', false)
        ->get();


        //Load all files inside the nested paths
        $files = $user->files()
        ->with('item_action')
        ->where("folder_id","=",$folder->id)
        ->whereRelation('item_action', 'deleted', false)
        ->get();


        return Inertia::render('Client/Index', [
            'folders' => new FolderCollection($folders),
            "folder_id"=>$folder->id,
            "parent"=>$folder->folder_id,
            "files"=> new FileCollection($files)
        ]);
    }

    public function indexStar(): Response
    {
        $user = Auth::user();


        $folders = $user->folders()
        ->with('item_action')
        ->whereRelation('item_action', 'started', true)
        ->whereRelation('item_action', 'deleted', false)
        ->get();
        
        //Load all files with star
        $files = $user->files()
        ->with('item_action')
        ->whereRelation('item_action', 'started', true)
        ->whereRelation('item_action', 'deleted', false)
        ->get();

        return Inertia::render('Client/Started', [
            'folders' => new FolderCollection($folders),
            "folder_id"=>null,
            "parent"=>null,
            "files"=> new FileCollection($files)
        ]);
    }

    public function indexTrash(): Response
    {
        $user = Auth::user();
        $folders = $user->folders()
        ->whereRelation('item_action', 'deleted', true)
        ->get();

        $files = $user->files()
        ->with('item_action')
        ->whereRelation('item_action', 'deleted', true)
        ->get();

        return Inertia::render('Client/Trash', [
            'folders' => new FolderCollection($folders),
            "folder_id"=>null,
            "parent"=>null,
            "files"=> new FileCollection($files)
        ]);
    }
    


    //Store
    public function store(FolderStoreRequest $request): RedirectResponse
    {
        $validation = $request->validated();
        $item = ItemAction::create([]);
        $validation["item_action_id"] = $item->id;
        $user = Auth::user()->folders()
        ->create(
            $validation
        );
        if($validation["folder_id"])
        {
            return redirect('/client/'.$validation["folder_id"]."/list");
        }
        else{
            return redirect('/client');
        }
    }
}

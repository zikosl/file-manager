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

use Inertia\Inertia;
use Inertia\Response;

class ItemActionController extends Controller
{

      //Load
      public function index(): Response
      {
          $user = Auth::user();
  
          //Load all folders inside the root path
          $folders = $user->folders()
          ->with('item_action')
          ->whereRelation('item_action', 'deleted', false)
          ->whereRelation("item_action", function ($query) {
            $query->doesntHave('spaces');
            })
          ->where("folder_id","=",null)
          ->get();
  
          //Load all files inside the root path
          $files = $user->files()
          ->with('item_action')
          ->whereRelation('item_action', 'deleted', false)
          ->whereRelation("item_action", function ($query) {
            $query->doesntHave('spaces');
            })
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
          ->whereRelation("item_action", function ($query) {
            $query->doesntHave('spaces');
            })
          ->get();
  
  
          //Load all files inside the nested paths
          $files = $user->files()
          ->with('item_action')
          ->where("folder_id","=",$folder->id)
          ->whereRelation('item_action', 'deleted', false)
          ->whereRelation("item_action", function ($query) {
            $query->doesntHave('spaces');
            })
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
          ->whereRelation("item_action", function ($query) {
            $query->doesntHave('spaces');
            })
          ->get();
          
          //Load all files with star
          $files = $user->files()
          ->with('item_action')
          ->whereRelation('item_action', 'started', true)
          ->whereRelation('item_action', 'deleted', false)
          ->whereRelation("item_action", function ($query) {
            $query->doesntHave('spaces');
            })
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
              "folder_id"=>null,
              "parent"=>null,
              "files"=> new FileCollection($files)
          ]);
      }
        //Update
    public function started(ItemAction $item): RedirectResponse
    {
        $item->update([
            "started"=>!$item->started
        ]);
        

        if($item->folder){
            $folder = $item->folder->folder_id;
        }
        else {
            $folder = $item->file->folder_id;
        }
        if($folder)
        {
            return redirect('/client/'.$folder."/list");
        }
        else{
            return redirect('/client');
        }
    }
    
    public function deleted(ItemAction $item): RedirectResponse
    {
        $item->update([
            "deleted"=>!$item->deleted
        ]);
        if($item->folder){
            $folder = $item->folder->folder_id;
        }
        else {
            $folder = $item->file->folder_id;
        }

        if($folder)
        {
            return redirect('/client/'.$folder."/list");
        }
        else{
            return redirect('/client');
        }
    }
}

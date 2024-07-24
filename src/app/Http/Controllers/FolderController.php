<?php

namespace App\Http\Controllers;


use App\Models\ItemAction;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;


use App\Http\Requests\FolderStoreRequest;
use App\Models\Space;

class FolderController extends Controller
{
  

    //Store
    public function store(Space $id,FolderStoreRequest $request): RedirectResponse
    {
        $validation = $request->validated();
        $item = ItemAction::create([]);
        if(isset($id['id'])){
            $item->spaces()->attach($id->id);
        }
        $validation["item_action_id"] = $item->id;
        Auth::user()->folders()
        ->create(
            $validation
        );
        if(isset($id["id"])){
            if($validation["folder_id"])
            {
                return redirect('/client/spaces/'.$id->id.'/'.$validation["folder_id"]."/list");
            }
            else{
                return redirect('/client/spaces/'.$id->id);
            }
        }
        else{
            if($validation["folder_id"])
            {
                return redirect('/client/'.$validation["folder_id"]."/list");
            }
            else{
                return redirect('/client');
            }
        }
    }
}

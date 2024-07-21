<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Folder;
use App\Models\ItemAction;

class ItemActionController extends Controller
{
        //Update
    public function started(ItemAction $item): RedirectResponse
    {
        $item->update([
            "started"=>!$item->started
        ]);
        
        // error_log(strval($item->folder));
        // error_log(strval($item->file));

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

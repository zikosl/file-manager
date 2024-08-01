<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FileUploadRequest;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Models\File;
use App\Models\ItemAction;
use App\Models\Space;
use App\Models\Templink;


class FileController extends Controller
{
    public function upload(Space $spc, FileUploadRequest $request, FileUploadService $fileUploadService): JsonResponse
    {        
        $user = Auth::user();
        $validation = $request->validated();
        $file = $validation['file'];
        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();

        $filePath = $fileUploadService->uploadFile($file);
        
        $item = ItemAction::create([]);

        if(isset($spc)){
            $item->spaces()->attach($spc->id);
        }
        
        $user->files()->create([
            'name'=>$fileName,
            'size'=>$fileSize,
            'path'=>$filePath,
            'folder_id'=>isset($validation["folder_id"]) ? $validation["folder_id"] : null,
            'item_action_id'=>$item->id
        ]);

        return response()->json(['message' => $filePath]);
    }


    public function getTempLink(File $file,Request $request): String
    {
        $tempLink = $file->links()->create([]);
        return env('APP_URL').'/temp/download/'.$tempLink->id;
    }


    //Check if the file is expired or not
    public function downloadTemp(Templink $link,Request $request)
    {
        // if ($link->expired_at < now()) {
        //     abort(403, 'File Expired');
        // }
        $file = $link->file;
        return Storage::download($file->path);
    }


    // allow to download url
    public function download(File $file,Request $request)
    {

        if (!Storage::exists($file->path)) {
            abort(404, 'File not found');
        }
        // $filePath = Storage::path($file->path);
        return Storage::download($file->path);
    }
}

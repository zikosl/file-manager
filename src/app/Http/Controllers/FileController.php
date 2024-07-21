<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\FileUploadRequest;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

use App\Models\File;
use App\Models\ItemAction;


class FileController extends Controller
{
    public function upload(FileUploadRequest $request, FileUploadService $fileUploadService): JsonResponse
    {        
        $user = Auth::user();
        
        $validation = $request->validated();
        $file = $validation['file'];
        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();
        $fileMimeType = $file->getMimeType();
        $fileExtension = $file->getClientOriginalExtension();

        $filePath = $fileUploadService->uploadFile($file);
        
        error_log($filePath);

        $item = ItemAction::create([]);
        
        $user->files()->create([
            'name'=>$fileName,
            'size'=>$fileSize,
            'path'=>$filePath,
            'folder_id'=>isset($validation["folder_id"]) ? $validation["folder_id"] : null,
            'item_action_id'=>$item->id
        ]);

        return response()->json(['message' => $filePath]);
    }
}

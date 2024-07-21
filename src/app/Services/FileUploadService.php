<?php
namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    public function uploadFile($file)
    {
        // Generate a unique name for the file
        $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();

        // Store the file in the 'public' disk (you can configure other disks as needed)
        $path = Storage::putFileAs('secure_uploads', $file, $fileName);
        return $path;

        // Return the file path for future use (e.g., storing in the database)
    }
}
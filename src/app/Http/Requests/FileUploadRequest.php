<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FileUploadRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Adjust authorization logic if needed
    }

    public function rules()
    {
        return [
            'folder_id' => ['nullable', 'integer'],
            'file' => [
                'required',
                'file',
                function ($attribute, $value, $fail) {
                    $allowedMimes = [
                        'images' => ['png', 'jpeg', 'jpg', 'svg'],
                        'docs' => ['pdf', 'docx','ppt','xls','xlsx'],
                        'videos' => ['mp4', 'avi', 'mov', 'mkv']
                    ];

                    $fileMime = $value->getClientOriginalExtension();
                    $fileSize = $value->getSize();

                    // Images (png/jpeg/svg max size: 5MB)
                    if (in_array($fileMime, $allowedMimes['images']) && $fileSize > 5242880) {
                        return $fail('The image must not be greater than 5MB.');
                    }

                    // Docs (pdf/docx max size: 25MB)
                    if (in_array($fileMime, $allowedMimes['docs']) && $fileSize > 26214400) {
                        return $fail('The document must not be greater than 25MB.');
                    }

                    // Videos (max size can be defined here)
                    if (in_array($fileMime, $allowedMimes['videos']) && $fileSize > 104857600) {
                        return $fail('The video must not be greater than 100MB.');
                    }

                    if (!in_array($fileMime, array_merge(...array_values($allowedMimes)))) {
                        return $fail('The file type is not allowed.');
                    }
                }
            ],
        ];
    }
}
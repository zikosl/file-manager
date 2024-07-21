<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FileCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(fn ($folder) => [
            'id' => $folder->id,
            'name' => $folder->name,
            'size' => $folder->size,
            'created' => $folder->created,
            'started' => $folder->item_action->started,
            'itemId' => $folder->item_action->id,
        ]);
    }
}

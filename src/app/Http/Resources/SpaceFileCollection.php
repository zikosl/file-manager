<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SpaceFileCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(fn ($item) => [
            'id' => $item->file->id,
            'name' => $item->file->name,
            'size' => $item->file->size,
            'created' => $item->file->created,
            'started' => $item->started,
            'itemId' => $item->id,
        ]);
    }
}

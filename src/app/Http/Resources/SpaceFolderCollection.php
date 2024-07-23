<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SpaceFolderCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(fn ($item) => [
            'id' => $item->folder->id,
            'title' => $item->folder->title,
            'started' => $item->started,
            'created' => $item->folder->created,
            'itemId' => $item->id
        ]);
    }
}

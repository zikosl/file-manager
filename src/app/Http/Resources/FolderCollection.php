<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FolderCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(fn ($folder) => [
            'id' => $folder->id,
            'title' => $folder->title,
            'starred' => $folder->item_action->starred,
            'created' => $folder->created,
            'itemId' => $folder->item_action->id
        ]);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserSpaceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(fn ($space) => [
            'id' => $space->id,
            'name' => $space->name,
            'color' => $space->color,
            'read'=> $space->pivot->read,
            'write'=> $space->pivot->write,
        ]);
    }
}

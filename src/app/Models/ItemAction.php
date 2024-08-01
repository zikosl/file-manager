<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Folder;
use App\Models\File;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ItemAction extends Model
{
    use HasFactory;


   /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'deleted',
        'starred'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
        ];
    }

    //Relations


    public function folder()
    {
        return $this->hasOne(Folder::class);
    }

    public function file()
    {
        return $this->hasOne(File::class);
    }

    public function spaces(): BelongsToMany
    {
        return $this->belongsToMany(Space::class, 'space_item_action')
        ->withPivot('isShared');
    }
}

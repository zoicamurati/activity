<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'status',
    ];


    /**
     * Get the user that owns the activity.
     */
    public function user()
    {
        return $this->belongsTo(Activity::class);
    }

}

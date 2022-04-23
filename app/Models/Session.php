<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'contribution_id'
    ];

    public function contribution()
    {
        return $this->belongsTo(Contribution::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}

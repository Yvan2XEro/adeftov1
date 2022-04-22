<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipRequest extends Model
{
    use HasFactory;

    protected $casts = [
        'is_accepted' => 'boolean',
    ];

    protected $fillable = [
        'message',
        'user_id',
        'is_accepted',
        'contribution_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contribution()
    {
        return $this->belongsTo(Contribution::class);
    }
}

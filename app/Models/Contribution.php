<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'user_id', 'is_active', 'balance'];
    protected $casts = [
        'is_active' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'contributions_users');
    }
    public function specialsMembers()
    {
        return $this->belongsToMany(User::class, 'contributions_specials_users');
    }
    public function membershipRequests()
    {
        return $this->hasMany(MembershipRequest::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}

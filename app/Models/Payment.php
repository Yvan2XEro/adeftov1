<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Malico\MeSomb\Helper\HasPayments;

class Payment extends Model
{
    use HasFactory, HasPayments;
    protected $fillable = [
        'amount',
        'status',
        'method',
        'user_id',
        'session_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function session()
    {
        return $this->belongsTo(Session::class);
    }
}

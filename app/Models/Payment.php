<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'amount',
        'currency',
        'transaction_id',
        'customer_name',
        'customer_surname',
        'status',
        'transaction_date',
        'payment_method',
        'payment_date',
        'operation_id',
        'payment_token',
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

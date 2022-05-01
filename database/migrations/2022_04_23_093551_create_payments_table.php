<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2)->default(0);
            $table->enum('status', ['pending', 'paid', 'failed', 'cancelled']);
            // $table->string('currency');
            // $table->string('transaction_id');
            // $table->string('customer_name');
            // $table->string('customer_surname');
            // $table->date('transaction_date')->nullable();
            // $table->string('payment_method')->default('');
            // $table->date('payment_date')->nullable();
            // $table->string('operation_id')->default('');
            // $table->text('description')->default('');
            // $table->text('payment_token')->default('');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('session_id');
            $table->foreign('session_id')->references('id')->on('sessions')->onDelete('cascade');
            $table->unique(['user_id', 'session_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
};

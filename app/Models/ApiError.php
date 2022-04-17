<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Cast\String_;

/**
 * This class with be help to make error and translate it in the front-end
 */
class ApiError extends Model implements \JsonSerializable
{
    use HasFactory;
    private String $messageLabel; //this is the code which is in the json file for translation
    private int $code; //this is the code error like 500; it could be used by distinguish the color of errors
    private String $message;

    public function __construct(String $theMessageLabel, int $theCode, $theMessage = "")
    {
        $this->messageLabel = $theMessageLabel;
        $this->message = $theMessage;
        $this->code =  $theCode;
    }

    public function messageLabel()
    {
        return $this->messageLabel;
    }
    public function message()
    {
        return $this->message;
    }

    public function code()
    {
        return $this->code;
    }

    public function setMessageLabel(String  $theMessageLabel)
    {
        $this->messageLabel = $theMessageLabel;
    }

    public function setMessage(String  $theMessage)
    {
        $this->message = $theMessage;
    }

    public function setCode(int $theCode)
    {
        $this->code = $theCode;
    }

    /**
     * Implementation of JsonSerializable interface
     */
    public function jsonSerialize():array
    {
        return [
            'error' => [
                "messageLabel" => $this->messageLabel(),
                "code" => $this->code(),
                "message" => $this->message()
            ]
        ];
    }
}

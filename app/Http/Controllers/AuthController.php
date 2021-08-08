<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function user(){
        return auth()->user();
    }
    public function users(){
        return User::all();
    }
    public function register(Request $request){
        return User::create([
            "name" => $request->input("name"),   
            "email" => $request->input("email"),   
            "password" => Hash::make($request->input("password")),   
        ]);
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response([
                "status"=>false,
                "message"=> "Invalid credentials"
            ], Response::HTTP_BAD_REQUEST);
        }
        $user = Auth::user();
        $token = $user->createToken("token")->plainTextToken;
        return response([
            'status'=>true,
            "message"=> "Login Successfull",
            "data" => [
                "user"=>$user
            ],
            "token" => $token
        ], Response::HTTP_ACCEPTED);
    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return response([
            "status" => true,
            "message"=> "Logout successfull"
        ], Response::HTTP_ACCEPTED);
    }
}

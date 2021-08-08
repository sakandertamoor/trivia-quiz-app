<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserManagmentController extends Controller
{
    public function updateUser(Request $request, User $user){
        $updateStatus = $user->update($request->all());
        if($updateStatus){
            return response([
                "status" => true,
                "data" => $user,
                "message" => "Record Updated Succesfully"
            ]);
        }
        
        return response([
            "status" => false,
            "message" => "Fail to update record"
        ], Response::HTTP_BAD_REQUEST);
    }
    public function bulkDeleteUser(Request $request){
        // $deleteResponse = User::whereIn("id", $request->input("ids"))->delete();
        return [
            "status"=>true,
            "message"=> "Records Deleted Successfully"
        ];
    }
}

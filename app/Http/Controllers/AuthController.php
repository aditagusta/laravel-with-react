<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if(!Auth::attempt($data))
        {
            return response([
                'message' => 'E-mail or Password Wrong !!!'
            ]);
        }
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['name'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout()
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 200);
    }
}
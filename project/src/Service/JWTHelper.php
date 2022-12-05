<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHelper {
    private string $mercureSecret;

    public function __construct() {
        $this->mercureSecret = '!ChangeMeTestTestTestTestTestTestTestTest!';
    }

    public function createJWT( User $user )
    : string {
        $payload = [
            "mercure" => [
                "publish"   => [
                    "*",
                ],
                "subscribe" => [ "http://caddy/user/{$user->getId()}/{?topic}" ],
                "payload"   => [
                    "username" => $user->getUsername(),
                    "userid"   => $user->getId(),
                ],
            ],
        ];

        return JWT::encode( $payload, $this->mercureSecret, 'HS256' );
    }

    public function isJwtValid( string $jwt )
    : bool {
        try {
            return (bool) JWT::decode( $jwt, new Key( $this->mercureSecret, 'HS256' ) );
        } catch ( \Exception $e ) {
            return false;
        }
    }
}
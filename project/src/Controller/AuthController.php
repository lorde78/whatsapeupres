<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use App\Service\JWTHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController {
    #[Route( '/login', name: 'app_login' )]
    public function getCookie( CookieHelper $cookieHelper, JWTHelper $jwtHelper )
    : JsonResponse {
        /** @var $user User */
        $user = $this->getUser();
        if ( $user ) {
            return $this->json(
                [ 'jwt' => $jwtHelper->createJWT( $user ) ],
                200,
                [ 'set-cookie' => $cookieHelper->buildCookie( $user ) ]

            );
        }

        return $this->json(
            [ 'message' => 'Bad credentials' ],
            401
        );
    }

}

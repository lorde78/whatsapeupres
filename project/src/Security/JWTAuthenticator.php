<?php

namespace App\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use mysql_xdevapi\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class JWTAuthenticator extends AbstractAuthenticator {
    public function supports( Request $request )
    : ?bool {
        return $request->attributes->get( '_route' ) !== 'app_login';
    }

    public function authenticate( Request $request )
    : Passport {

        $jwt = $request->cookies->get( 'mercureAuthorization' ) ?? str_replace('Bearer ', '', getallheaders()['Authorization']);

        try {
            
            $jwtDecoded = JWT::decode( $jwt, new Key( '!ChangeMeTestTestTestTestTestTestTestTest!', 'HS256' ) );

            return new SelfValidatingPassport(new UserBadge($jwtDecoded->mercure->payload->username));

        } catch ( \Exception $e ) {
            throw new AuthenticationException('erreur');
        }

    }

    public function onAuthenticationSuccess( Request $request, TokenInterface $token, string $firewallName )
    : ?Response {
        return null;
    }

    public function onAuthenticationFailure( Request $request, AuthenticationException $exception )
    : ?Response {
        return new JsonResponse( ["message" => "baaad"] );
    }

//    public function start(Request $request, AuthenticationException $authException = null): Response
//    {
//        /*
//         * If you would like this class to control what happens when an anonymous user accesses a
//         * protected page (e.g. redirect to /login), uncomment this method and make this class
//         * implement Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface.
//         *
//         * For more details, see https://symfony.com/doc/current/security/experimental_authenticators.html#configuring-the-authentication-entry-point
//         */
//    }
}

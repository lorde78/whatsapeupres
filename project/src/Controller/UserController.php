<?php

namespace App\Controller;


use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class UserController extends AbstractController {
    #[Route( '/user', name: 'app_user' )]
    public function index()
    : Response {
        return $this->render( 'user/index.html.twig', [
            'controller_name' => 'UserController',
        ] );
    }

/*    #[Route( '/', name: 'user_index' )]
    #[IsGranted( 'ROLE_USER' )]
    public function test( Request $request )
    : JsonResponse {
        return $this->json( [
            'headers' => getallheaders()["Authorization"],
        ] );
    }*/

    #[Route( '/users-list', name: 'app_users' )]
    public function getAllUsers( UserRepository $userRepository ) {

        return $this->json(
            ['users' => $userRepository->findAllButMe($this->getUser())]

        );
    }


}

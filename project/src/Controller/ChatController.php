<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class ChatController extends AbstractController {
    #[Route( '/chat/{idUser}', name: 'app_chat' )]
    public function joinChat(
        HubInterface $hub, string $mercureSecret, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, $idUser
    )
    : JsonResponse {
        /*        $target = [];
                if ($user !== null) {
                    $target = [
                        "http://caddy/user/{$user->getId()}/?topic=" . urlencode("http://caddy/chat")
                    ];
                }*/

        $currentUser = $this->getUser();
        $currentUserId = $currentUser->id;

        $entityManager = $doctrine->getManager();

        $product = new Chat();
        $product->setIdCurrentUserChatRoom( ( [ $currentUserId, $idUser ] ) );

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist( $product );

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();


        /*$update = new Update(
            [
                "http://caddy/chat/",
                "http://caddy/user/{$user->getId()}/?topic=" . urlencode( "http://caddy/chat" ),
            ],
            json_encode( [
                'user' => $user->getUsername(),
                'id'   => $user->getId(),
            ] ),
            true
        );

        $hub->publish( $update );*/


        return $this->json( [
            'message' => 'Ping sent in chat',
        ] );
    }

    #[Route( '/chat/{idChat}/{idUser}', name: 'app_message' )]
    public function createMessage(
        HubInterface $hub, string $mercureSecret, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, $idUser, $idChat
    )
    : JsonResponse {
        /*        $target = [];
                if ($user !== null) {
                    $target = [
                        "http://caddy/user/{$user->getId()}/?topic=" . urlencode("http://caddy/chat")
                    ];
                }*/

        $currentUser = $this->getUser();
        $currentUserId = $currentUser->id;

        $entityManager = $doctrine->getManager();

        $message = new Message();
        $message->setChat( $idChat );
        $message->setIdUser( $currentUserId );

        // tell Doctrine you want to (eventually) save the message (no queries yet)
        $entityManager->persist( $message );

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();


        /*$update = new Update(
            [
                "http://caddy/chat/",
                "http://caddy/user/{$user->getId()}/?topic=" . urlencode( "http://caddy/chat" ),
            ],
            json_encode( [
                'user' => $user->getUsername(),
                'id'   => $user->getId(),
            ] ),
            true
        );

        $hub->publish( $update );*/


        return $this->json( [
            'message' => 'Ping sent in chat',
        ] );
    }





    #[Route( '/currentChatRoom/{idUser}', name: 'app_get_current_chat_room' )]
    public function getCurrentChatRoom(
        ChatRepository $chatRepository, $idUser
    )

    : JsonResponse {

        $currentUser = $this->getUser();
        $currentUserId = $currentUser->id;
        $currentChatRoom = $chatRepository->findAllByIdCurrentUserChatRoom( $idUser, $currentUserId );



        return $this->json( [
            'currentChatRoom' => $currentChatRoom,
        ] );
    }




    #[Route( 'chats-list/{user}', name: 'app_chat_list' )]
    public function chatList( ChatRepository $chatRepository )
    : JsonResponse {
        //TODO  faire la liste des conversation en fonction de l'utilisateur connecté
        return $this->json(
            [ 'users' => $chatRepository->findAllByUser( $this->getUser() ) ]
        );
    }

    //TODO faire une fonction qui va récuperer la liste des messages en fonction du chat ouvert
}

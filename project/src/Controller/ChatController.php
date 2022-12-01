<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/chat/{user}', name: 'app_chat', methods: 'POST')]
    public function sendMessageChat(User $user, HubInterface $hub, string $mercureSecret): JsonResponse
    {


        $update = new Update(
            [
                "https://example.com/chat/",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/chat")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId()
            ]),
            true
        );

        $hub->publish($update);


        $hub->publish($update);

        return $this->json([
            'message' => 'Ping sent in chat'
        ]);
    }

    #[Route('chats-list/{user}', name: 'app_chat_list')]
    public function chatList(ChatRepository $chatRepository): JsonResponse
    {
        //TODO  faire la liste des conversation en fonction de l'utilisateur connecté
        return $this->json(
            ['users' => $chatRepository->findAllByUser($this->getUser())]
        );
    }

    //TODO faire une fonction qui va récuperer la liste des messages en fonction du chat ouvert
}

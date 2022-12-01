<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class PingController extends AbstractController
{
    #[Route('/ping/{user}', name: 'app_ping', methods: 'POST')]
    public function ping(User $user, HubInterface $hub, string $mercureSecret): JsonResponse
    {
                $update = new Update(
                    [
                        "https://example.com/ping/",
                        "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/ping")
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
            'message' => 'Ping sent'
        ]);
    }
}
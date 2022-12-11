<?php

namespace App\Entity;

use App\Repository\IdChatRoomUserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IdChatRoomUserRepository::class)]
class IdChatRoomUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    public function getId(): ?int
    {
        return $this->id;
    }
}

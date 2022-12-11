<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;
use \Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity( repositoryClass: UserRepository::class )]
#[ORM\Table( name: '`user`' )]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface {
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column( length: 255 )]
    private ?string $username = null;

    #[ORM\Column( type: Types::ARRAY )]
    private array $roles = [];

    #[ORM\Column( length: 255 )]
    private ?string $password = null;

    #[ORM\OneToMany( mappedBy: 'idUser', targetEntity: Message::class )]
    private Collection $messages;

    public function __construct() {
        $this->messages = new ArrayCollection();
    }

    public function getId()
    : ?int {
        return $this->id;
    }

    public function getUsername()
    : ?string {
        return $this->username;
    }

    public function setUsername( string $username )
    : self {
        $this->username = $username;

        return $this;
    }

    public function getRoles()
    : array {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique( $roles );
    }

    public function setRoles( array $roles )
    : self {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword()
    : ?string {
        return $this->password;
    }

    public function setPassword( string $password )
    : self {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages()
    : Collection {
        return $this->messages;
    }

    public function addMessage( Message $message )
    : self {
        if ( !$this->messages->contains( $message ) ) {
            $this->messages->add( $message );
            $message->setIdUser( $this );
        }

        return $this;
    }

    public function removeMessage( Message $message )
    : self {
        if ( $this->messages->removeElement( $message ) ) {
            // set the owning side to null (unless already changed)
            if ( $message->getIdUser() === $this ) {
                $message->setIdUser( null );
            }
        }

        return $this;
    }

    public function eraseCredentials() {
        // TODO: Implement eraseCredentials() method.
    }

    public function getUserIdentifier(): string {
        return $this->getUsername();
    }
}

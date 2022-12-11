<?php

namespace App\Repository;

use App\Entity\Chat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @extends ServiceEntityRepository<Chat>
 *
 * @method Chat|null find( $id, $lockMode = null, $lockVersion = null )
 * @method Chat|null findOneBy( array $criteria, array $orderBy = null )
 * @method Chat[]    findAll()
 * @method Chat[]    findBy( array $criteria, array $orderBy = null, $limit = null, $offset = null )
 */
class ChatRepository extends ServiceEntityRepository {
    public function __construct( ManagerRegistry $registry ) {
        parent::__construct( $registry, Chat::class );
    }

    public function save( Chat $entity, bool $flush = false )
    : void {
        $this->getEntityManager()->persist( $entity );

        if ( $flush ) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove( Chat $entity, bool $flush = false )
    : void {
        $this->getEntityManager()->remove( $entity );

        if ( $flush ) {
            $this->getEntityManager()->flush();
        }
    }

    public function findAllByUser( UserInterface $user ) {
        return $this->createQueryBuilder( 'user' )
                    ->andWhere( 'user.username != :val' )
                    ->setParameter( 'val', $user->getUserIdentifier() )
                    ->getQuery()
                    ->getResult();
    }

    public function findAllByIdCurrentUserChatRoom( $idUser, $currentUser ) {
        $arrayUsers =  [$currentUser, $idUser] ;

        $objectCurrentUsers = 'a:2:{i:0;i:'.$currentUser.';i:1;s:2:"'. $idUser .'";}';

        return $this->createQueryBuilder( 'chat' )
                    ->andWhere( 'chat.idCurrentUserChatRoom = :val' )
                    ->setParameter( 'val', $objectCurrentUsers )
                    ->getQuery()
                    ->getResult();
    }



//    /**
//     * @return Chat[] Returns an array of Chat objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Chat
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

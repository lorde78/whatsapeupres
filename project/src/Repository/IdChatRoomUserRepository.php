<?php

namespace App\Repository;

use App\Entity\IdChatRoomUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<IdChatRoomUser>
 *
 * @method IdChatRoomUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method IdChatRoomUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method IdChatRoomUser[]    findAll()
 * @method IdChatRoomUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IdChatRoomUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, IdChatRoomUser::class);
    }

    public function save(IdChatRoomUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(IdChatRoomUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return IdChatRoomUser[] Returns an array of IdChatRoomUser objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?IdChatRoomUser
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

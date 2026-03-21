-- Script d'initialisation de la base de données pour l'application web
DROP DATABASE IF EXISTS `tp_sio2_bdjourneeintegration`;

CREATE DATABASE IF NOT EXISTS `tp_sio2_bdjourneeintegration`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

DROP USER IF EXISTS 'consultSIO2Integration'@'%';
CREATE USER 'consultSIO2Integration'@'%' IDENTIFIED BY 'pwd2Consult';

FLUSH PRIVILEGES;

USE `tp_sio2_bdjourneeintegration`;

DROP TABLE IF EXISTS `Developpeur`;

CREATE TABLE `Developpeur` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nom` VARCHAR(20) NOT NULL,
  `prenom` VARCHAR(15) NOT NULL,
  CONSTRAINT `Developpeur_PK` PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

INSERT INTO `Developpeur` (id, nom, prenom) VALUES
  (1, 'COVER', 'Harry'),
  (2, 'TOUIL', 'Sacha');

GRANT SELECT ON `tp_sio2_bdjourneeintegration`.`Developpeur`
  TO 'consultSIO2Integration'@'%';

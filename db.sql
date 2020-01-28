drop database if exists election;

create database if not exists election character set 'utf8';

use election;

CREATE TABLE Electeurs(
  idElecteur VARCHAR(200),
  nomElecteur VARCHAR(200),
  prenomsElecteur VARCHAR(200),
  sexeElecteur VARCHAR(200),
  datenaissanceElecteur VARCHAR(200),
  lieunaissanceElecteur VARCHAR(200),
  domicileElecteur VARCHAR(200),
  professionElecteur VARCHAR(200),
  contactElecteur VARCHAR(200),
  photoElecteur VARCHAR(200),
  carteElecteur VARCHAR(200),
  statusVote VARCHAR(20)
) Engine = InnoDB;

CREATE TABLE Votes(
  idVote int(11) primary key not null auto_increment,
  voteCandidat VARCHAR(255)
) Engine = InnoDB;

CREATE TABLE Candidats(
  idCandidat VARCHAR(200),
  nomCandidat VARCHAR(200),
  partiCandidat VARCHAR(200),
  photoCandidat VARCHAR(255)
) Engine = InnoDB;
-- MySQL Script generated by MySQL Workbench
-- Sat Nov 20 01:01:55 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema LaEscondida_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `LaEscondida_db` ;

-- -----------------------------------------------------
-- Schema LaEscondida_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LaEscondida_db` DEFAULT CHARACTER SET utf8 ;
USE `LaEscondida_db` ;

-- -----------------------------------------------------
-- Table `LaEscondida_db`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaEscondida_db`.`Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LaEscondida_db`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaEscondida_db`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `size` FLOAT NOT NULL,
  `price` FLOAT NOT NULL,
  `Categoria_id` INT NOT NULL,
  PRIMARY KEY (`idProductos`, `Categoria_id`),
  CONSTRAINT `fk_Productos_Categoria`
    FOREIGN KEY (`Categoria_id`)
    REFERENCES `LaEscondida_db`.`Categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Productos_Categoria_idx` ON `LaEscondida_db`.`Productos` (`Categoria_id` ASC);

CREATE INDEX `fk_Productos_Categoria` ON `LaEscondida_db`.`Productos` (`Categoria_id` ASC);


-- -----------------------------------------------------
-- Table `LaEscondida_db`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaEscondida_db`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `avatar` VARCHAR(45),
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LaEscondida_db`.`Compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaEscondida_db`.`Compras` (
  `id_compra` INT NOT NULL AUTO_INCREMENT,
  `Productos_idProductos` INT NOT NULL,
  `Productos_Categoria_idCategoria` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  `precioTotal` FLOAT NOT NULL,
  PRIMARY KEY (`id_compra`, `Productos_idProductos`, `Productos_Categoria_idCategoria`, `Usuarios_idUsuarios`),
  CONSTRAINT `fk_Productos_has_Usuarios_Productos1`
    FOREIGN KEY (`Productos_idProductos` , `Productos_Categoria_idCategoria`)
    REFERENCES `LaEscondida_db`.`Productos` (`idProductos` , `Categoria_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_has_Usuarios_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `LaEscondida_db`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Productos_has_Usuarios_Usuarios1_idx` ON `LaEscondida_db`.`Compras` (`Usuarios_idUsuarios` ASC);

CREATE INDEX `fk_Productos_has_Usuarios_Productos1_idx` ON `LaEscondida_db`.`Compras` (`Productos_idProductos` ASC, `Productos_Categoria_idCategoria` ASC);

CREATE INDEX `fk_Productos_has_Usuarios_Productos1` ON `LaEscondida_db`.`Compras` (`Productos_idProductos` ASC, `Productos_Categoria_idCategoria` ASC);

CREATE INDEX `fk_Productos_has_Usuarios_Usuarios1` ON `LaEscondida_db`.`Compras` (`Usuarios_idUsuarios` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

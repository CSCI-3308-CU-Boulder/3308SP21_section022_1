SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `mydb` ;

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `DOB` DATE NOT NULL,
  `PhoneNumber` VARCHAR(15) NULL,
  `City` VARCHAR(45) NULL,
  `State` VARCHAR(45) NULL,
  `Zip` VARCHAR(45) NULL,
  `Country` VARCHAR(45) NULL,
  `AccountCreationDate` DATETIME NOT NULL,
  `SecurityQuestion1` TINYTEXT NOT NULL,
  `Answer1` VARCHAR(45) NOT NULL,
  `SecurityQuestion2` TINYTEXT NOT NULL,
  `Answer2` VARCHAR(45) NOT NULL,
  `SecurityQuestion3` TINYTEXT NOT NULL,
  `Answer3` VARCHAR(45) NOT NULL,
  `Recently Played` VARCHAR(45) NULL,
  `Recent Play Time` TIMESTAMP NULL,
  `Last Played Date` DATE NULL,
  `Total Time Played` TIMESTAMP NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `UserName_UNIQUE` (`UserName` ASC) VISIBLE,
  UNIQUE INDEX `UserID_UNIQUE` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`Games` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Games` (
  `GameID` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `Description` TEXT(1000) NULL,
  `Multiplayer` TINYINT NULL,
  `ESRB_Rating` VARCHAR(4) NULL,
  `DateReleased` DATE NULL,
  `Publisher` VARCHAR(45) NULL,
  `Link` VARCHAR(45) NULL,  
  `Developer` VARCHAR(45) NULL,
  `Notes` TINYTEXT NULL,
  `CommunityReview` DECIMAL(2,1) NULL,
  `IGNReview` DECIMAL(2,1) NULL,
  `Platform` VARCHAR(45) NULL,
  PRIMARY KEY (`GameID`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`UserGame` ;

CREATE TABLE IF NOT EXISTS `mydb`.`UserGame` (
  `User_UserID` INT NOT NULL,
  `Games_GameID` INT NOT NULL,
  `UserIGN` DECIMAL(2,1) NULL,
  `UserReview` TEXT(1000) NULL,
  `UserRating` DECIMAL(2,1) NULL,
  `LastTimePlayed` DATE NULL,
  `Notes` TEXT(1000) NULL,
  `TotalTimePlayed` TIMESTAMP NULL,
  PRIMARY KEY (`User_UserID`, `Games_GameID`),
  INDEX `fk_UserGame_User_idx` (`User_UserID` ASC) VISIBLE,
  INDEX `fk_UserGame_Games1_idx` (`Games_GameID` ASC) VISIBLE,
  CONSTRAINT `fk_UserGame_User`
    FOREIGN KEY (`User_UserID`)
    REFERENCES `mydb`.`User` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserGame_Games1`
    FOREIGN KEY (`Games_GameID`)
    REFERENCES `mydb`.`Games` (`GameID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`Tags` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Tags` (
  `TagName` VARCHAR(24) NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`TagName`),
  UNIQUE INDEX `Tags_UNIQUE` (`TagName` ASC) VISIBLE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`GameTags` ;

CREATE TABLE IF NOT EXISTS `mydb`.`GameTags` (
  `Games_GameID` INT NOT NULL,
  `Tags_TagName` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`Games_GameID`, `Tags_TagName`),
  INDEX `fk_GameTags_Games1_idx` (`Games_GameID` ASC) VISIBLE,
  INDEX `fk_GameTags_Tags1_idx` (`Tags_TagName` ASC) VISIBLE,
  CONSTRAINT `fk_GameTags_Games1`
    FOREIGN KEY (`Games_GameID`)
    REFERENCES `mydb`.`Games` (`GameID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GameTags_Tags1`
    FOREIGN KEY (`Tags_TagName`)
    REFERENCES `mydb`.`Tags` (`TagName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mydb`.`Achievements` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Achievements` (
  `AchievementID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  `Completed` TINYINT NOT NULL,
  `Date Completed` DATE NULL,
  `UserGame_User_UserID` INT NOT NULL,
  `UserGame_Games_GameID` INT NOT NULL,
  PRIMARY KEY (`AchievementID`, `UserGame_User_UserID`, `UserGame_Games_GameID`),
  INDEX `fk_Achievements_UserGame1_idx` (`UserGame_User_UserID` ASC, `UserGame_Games_GameID` ASC) VISIBLE,
  CONSTRAINT `fk_Achievements_UserGame1`
    FOREIGN KEY (`UserGame_User_UserID` , `UserGame_Games_GameID`)
    REFERENCES `mydb`.`UserGame` (`User_UserID` , `Games_GameID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

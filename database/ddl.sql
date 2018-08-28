CREATE TABLE `profiles`.`peoples` (
  `id` VARCHAR(48) NOT NULL,
  `type` VARCHAR(48) NULL,
  `slug` VARCHAR(45) NULL,
  `job_title` VARCHAR(124) NULL,
  `first_name` VARCHAR(64) NULL,
  `last_name` VARCHAR(64) NULL,
  `bio` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


CREATE TABLE `profiles`.`headshots` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `people_id` VARCHAR(48) NULL,
  `type` VARCHAR(45) NULL,
  `mime_type` VARCHAR(45) NULL,
  `image_id` VARCHAR(45) NULL,
  `url` VARCHAR(256) NULL,
  `alt` TEXT NULL,
  `height` INT(5) NULL,
  `width` INT(5) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

CREATE TABLE `profiles`.`social_links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `people_id` VARCHAR(48) NULL,
  `type` VARCHAR(48) NULL,
  `call_to_action` VARCHAR(124) NULL,
  `url` VARCHAR(256) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

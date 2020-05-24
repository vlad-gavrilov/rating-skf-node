--drop database rating_skf; create database rating_skf; use rating_skf;

CREATE TABLE `Degrees` (
  `degree_id` TINYINT(50) UNSIGNED NOT NULL AUTO_INCREMENT,
  `degree_title` varchar(60) NOT NULL,
  PRIMARY KEY (`degree_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Departments` (
  `department_id` TINYINT(50) UNSIGNED NOT NULL AUTO_INCREMENT,
  `department_title` varchar(60) NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Positions` (
  `position_id` TINYINT(50) UNSIGNED NOT NULL AUTO_INCREMENT,
  `position_title` varchar(60) NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Statuses` (
  `status_id` TINYINT(5) NOT NULL,
  `status_title` varchar(60) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Titles` (
  `title_id` TINYINT(50) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title_title` varchar(60) NOT NULL,
  PRIMARY KEY (`title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `Teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(60) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `patronymic` varchar(60) DEFAULT NULL,
  `position` TINYINT(50) UNSIGNED NOT NULL DEFAULT '1',
  `academic_degree` TINYINT(50) UNSIGNED NOT NULL DEFAULT '1',
  `academic_title` TINYINT(50) UNSIGNED NOT NULL DEFAULT '1',
  `coefficient` TINYINT(5) UNSIGNED NOT NULL DEFAULT '1',
  `department` TINYINT(50) UNSIGNED NOT NULL DEFAULT '1',
  `status` TINYINT(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `Teachers_ibfk_1` FOREIGN KEY (`position`) REFERENCES `Positions` (`position_id`) ON DELETE CASCADE,
  CONSTRAINT `Teachers_ibfk_2` FOREIGN KEY (`department`) REFERENCES `Departments` (`department_id`) ON DELETE CASCADE,
  CONSTRAINT `Teachers_ibfk_3` FOREIGN KEY (`academic_degree`) REFERENCES `Degrees` (`degree_id`) ON DELETE CASCADE,
  CONSTRAINT `Teachers_ibfk_4` FOREIGN KEY (`academic_title`) REFERENCES `Titles` (`title_id`) ON DELETE CASCADE,
  CONSTRAINT `Teachers_ibfk_5` FOREIGN KEY (`status`) REFERENCES `Statuses` (`status_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `Auth` (
  `teacher_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `Auth_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `ND_table` (
  `teacher_id` int(11) NOT NULL,
  `nd1` TINYINT(50) UNSIGNED DEFAULT '0',
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `ND_table_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `NP_table` (
  `teacher_id` int(11) NOT NULL,
  `np1` TINYINT(50) UNSIGNED DEFAULT '0',
  `np2` TINYINT(50) UNSIGNED DEFAULT '0',
  `np3` TINYINT(50) UNSIGNED DEFAULT '0',
  `np4` TINYINT(50) UNSIGNED DEFAULT '0',
  `np5` TINYINT(50) UNSIGNED DEFAULT '0',
  `np6` TINYINT(50) UNSIGNED DEFAULT '0',
  `np7` TINYINT(50) UNSIGNED DEFAULT '0',
  `np8` TINYINT(50) UNSIGNED DEFAULT '0',
  `np9` TINYINT(50) UNSIGNED DEFAULT '0',
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `NP_table_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `OD_table` (
  `teacher_id` int(11) NOT NULL,
  `od1` TINYINT(50) UNSIGNED DEFAULT '0',
  `od2` TINYINT(50) UNSIGNED DEFAULT '0',
  `od3` TINYINT(50) UNSIGNED DEFAULT '0',
  `od4` TINYINT(50) UNSIGNED DEFAULT '0',
  `od5` TINYINT(50) UNSIGNED DEFAULT '0',
  `od6` TINYINT(50) UNSIGNED DEFAULT '0',
  `od7` TINYINT(50) UNSIGNED DEFAULT '0',
  `od8` TINYINT(50) UNSIGNED DEFAULT '0',
  `od9` TINYINT(50) UNSIGNED DEFAULT '0',
  `od10` TINYINT(50) UNSIGNED DEFAULT '0',
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `OD_table_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `OP_table` (
  `teacher_id` int(11) NOT NULL,
  `op1` TINYINT(50) UNSIGNED DEFAULT '0',
  `op2` TINYINT(50) UNSIGNED DEFAULT '0',
  `op3` TINYINT(50) UNSIGNED DEFAULT '0',
  `op4` TINYINT(50) UNSIGNED DEFAULT '0',
  `op5` TINYINT(50) UNSIGNED DEFAULT '0',
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `OP_table_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `R_table` (
  `teacher_id` int(11) NOT NULL,
  `r1` TINYINT(50) UNSIGNED DEFAULT '0',
  `r2` TINYINT(50) UNSIGNED DEFAULT '0',
  `r3` TINYINT(50) UNSIGNED DEFAULT '0',
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `R_table_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `Degrees` VALUES
(1,'младший научный сотрудник'),
(2,'старший научный сотрудник'),
(3,'кандидат наук'),
(4,'доктор наук'),
(5,'член-корреспондент'),
(6,'академик');

INSERT INTO `Departments` VALUES
(1,'инфокоммуникационных технологий и систем связи'),
(2,'информатики и вычислительной техники'),
(3,'общенаучной подготовки'),
(4,'научно-исследовательской работы и инновационного развития');

INSERT INTO `Positions` VALUES
(1,'ассистент'),
(2,'преподаватель'),
(3,'старший преподаватель'),
(4,'доцент'),
(5,'профессор'),
(6,'заведующий кафедрой'),
(7,'декан факультета');

INSERT INTO `Titles` VALUES
(1,'доцент'),
(2,'профессор');

INSERT INTO `Statuses` VALUES
(0,'пользователь'),
(1,'администратор кафедры'),
(2,'глобальный администратор');


INSERT INTO `Teachers` VALUES
(1,'Кравченко','Болеслав','Артёмович',2,2,1,1,2,0),
(2,'Марков','Зенон','Леонидович',5,4,2,1,3,0),
(3,'Денисов','Николай','Сергеевич',3,4,1,2,3,1),
(4,'Савельева','Ольга','Анатолиевна',5,4,1,2,2,2),
(5,'Фокин','Петр','Артёмович',5,3,2,1,1,0);

INSERT INTO `Auth` VALUES
(1,'sample1@mail.com','d8578edf8458ce06fbc5bb76a58c5ca4'),
(2,'sample2@mail.com','a152e841783914146e4bcd4f39100686'),
(3,'sample3@mail.com','d8578edf8458ce06fbc5bb76a58c5ca4'),
(4,'sample4@mail.com','a152e841783914146e4bcd4f39100686'),
(5,'sample5@mail.com','d8578edf8458ce06fbc5bb76a58c5ca4');


INSERT INTO `ND_table` VALUES
(1,5),
(2,2),
(3,0),
(4,13),
(5,9);

INSERT INTO `NP_table` VALUES
(1,3,1,2,0,4,7,0,9,0),
(2,0,0,0,0,4,0,0,5,0),
(3,0,0,1,0,4,0,0,5,0),
(4,0,0,0,0,4,15,0,5,0),
(5,0,4,0,0,4,0,0,5,0);

INSERT INTO `OD_table` VALUES
(1,3,4,4,0,0,3,0,0,0,0),
(2,10,4,7,0,0,0,5,4,10,0),
(3,10,4,0,0,0,0,5,4,10,0),
(4,10,4,0,0,0,0,5,4,0,0),
(5,10,4,0,0,1,0,5,4,10,0);

INSERT INTO `OP_table` VALUES
(1,0,7,10,1,3),
(2,7,8,3,10,8),
(3,5,8,23,10,8),
(4,5,8,0,10,8),
(5,5,8,3,10,8);

INSERT INTO `R_table` VALUES
(1,0,8,2),
(2,8,10,3),
(3,10,3,7),
(4,3,8,10),
(5,9,8,3);

-- drop database rating_skf; create database rating_skf; use rating_skf;

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
  `avatar` varchar(100) DEFAULT NULL,
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



CREATE TABLE `Rating` (
  `teacher_id` int(11) NOT NULL,
  `teacher_rating` varchar(255) NOT NULL DEFAULT '{"OD":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"OP":{"1":0,"2":0,"3":0,"4":0,"5":0},"ND":{"1":0},"NP":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"R":{"1":0,"2":0,"3":0}}',
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`) ON DELETE CASCADE
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
(1,'Кравченко','Болеслав','Артёмович',2,2,1,1,2,0,NULL),
(2,'Марков','Зенон','Леонидович',5,4,2,1,3,0,NULL),
(3,'Денисов','Николай','Сергеевич',3,4,1,2,3,1,NULL),
(4,'Савельева','Ольга','Анатолиевна',5,4,1,2,2,2,NULL),
(5,'Фокин','Петр','Артёмович',5,3,2,1,1,0,NULL);

INSERT INTO `Auth` VALUES
(1,'sample1@mail.com','$2b$10$gvXZ7zuFrni9nSQu/mnyhOsQQSxRfW5zWZCNgMHtKg1Jlz0mZnDTS'),
(2,'sample2@mail.com','$2b$10$gvXZ7zuFrni9nSQu/mnyhOsQQSxRfW5zWZCNgMHtKg1Jlz0mZnDTS'),
(3,'sample3@mail.com','$2b$10$gvXZ7zuFrni9nSQu/mnyhOsQQSxRfW5zWZCNgMHtKg1Jlz0mZnDTS'),
(4,'sample4@mail.com','$2b$10$gvXZ7zuFrni9nSQu/mnyhOsQQSxRfW5zWZCNgMHtKg1Jlz0mZnDTS'),
(5,'sample5@mail.com','$2b$10$gvXZ7zuFrni9nSQu/mnyhOsQQSxRfW5zWZCNgMHtKg1Jlz0mZnDTS');


INSERT INTO `Rating` VALUES
(1,'{"OD":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"OP":{"1":0,"2":0,"3":0,"4":0,"5":0},"ND":{"1":0},"NP":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"R":{"1":0,"2":0,"3":0}}'),
(2,'{"OD":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":2,"8":0,"9":0,"10":0},"OP":{"1":0,"2":0,"3":0,"4":0,"5":0},"ND":{"1":0},"NP":{"1":0,"2":0,"3":0,"4":2,"5":0,"6":0,"7":0,"8":0,"9":0},"R":{"1":0,"2":0,"3":0}}'),
(3,'{"OD":{"1":0,"2":0,"3":0,"4":0,"5":3,"6":0,"7":0,"8":0,"9":0,"10":0},"OP":{"1":0,"2":0,"3":0,"4":0,"5":0},"ND":{"1":0},"NP":{"1":0,"2":0,"3":0,"4":0,"5":3,"6":0,"7":0,"8":0,"9":0},"R":{"1":3,"2":0,"3":0}}'),
(4,'{"OD":{"1":0,"2":0,"3":0,"4":0,"5":4,"6":0,"7":0,"8":0,"9":0,"10":0},"OP":{"1":4,"2":0,"3":0,"4":0,"5":0},"ND":{"1":0},"NP":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"R":{"1":0,"2":0,"3":0}}'),
(5,'{"OD":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"OP":{"1":0,"2":0,"3":0,"4":0,"5":0},"ND":{"1":0},"NP":{"1":0,"2":0,"3":0,"4":5,"5":0,"6":0,"7":0,"8":0,"9":0},"R":{"1":0,"2":0,"3":0}}');

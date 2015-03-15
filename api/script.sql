CREATE DATABASE IF NOT EXISTS magicball;
SET NAMES 'utf8';
USE magicball;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Answer;
DROP TABLE IF EXISTS AnswerType;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Sex;
DROP TABLE IF EXISTS Status;
DROP TABLE IF EXISTS User;
SET FOREIGN_KEY_CHECKS = 1;

/*==============================================================*/
/* Table: Answer                                                */
/*==============================================================*/
CREATE TABLE Answer
(
  Id     INT NOT NULL AUTO_INCREMENT,
  Text   VARCHAR(100),
  TypeId INT,
  PRIMARY KEY (Id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: AnswerType                                            */
/*==============================================================*/
CREATE TABLE AnswerType
(
  Id   INT NOT NULL AUTO_INCREMENT,
  Type VARCHAR(30),
  PRIMARY KEY (Id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: Question                                              */
/*==============================================================*/
CREATE TABLE Question
(
  Id       INT NOT NULL AUTO_INCREMENT,
  Text     TEXT,
  DateTime DATETIME,
  AnswerId INT,
  UserId   INT,
  PRIMARY KEY (Id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: Sex                                                   */
/*==============================================================*/
CREATE TABLE Sex
(
  Id   INT NOT NULL AUTO_INCREMENT,
  Type VARCHAR(10),
  PRIMARY KEY (Id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
CREATE TABLE User
(
  Id    INT NOT NULL AUTO_INCREMENT,
  Name  VARCHAR(100),
  Password VARCHAR(100),
  Token    CHAR(32),
  SexId INT,
  PRIMARY KEY (Id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* References                                                 */
/*==============================================================*/

ALTER TABLE Answer ADD CONSTRAINT FK_Reference_5 FOREIGN KEY (TypeId)
REFERENCES AnswerType (Id)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE Question ADD CONSTRAINT FK_Reference_2 FOREIGN KEY (AnswerId)
REFERENCES Answer (Id)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE Question ADD CONSTRAINT FK_Reference_4 FOREIGN KEY (UserId)
REFERENCES User (Id)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE User ADD CONSTRAINT FK_Reference_1 FOREIGN KEY (SexId)
REFERENCES Sex (Id)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

INSERT INTO `AnswerType` (`Type`) VALUES
  ('Положительный'),
  ('Нерешительно положительный'),
  ('Нейтральный'),
  ('Отрицательный');

INSERT INTO `Answer` (`Text`, `TypeId`) VALUES
  ('Бесспорно!', 1),
  ('Предрешено!', 1),
  ('Никаких сомнений!', 1),
  ('Определённо - «да»!', 1),
  ('Можешь быть уверен в этом!', 1),
  ('Мне кажется — «да».', 2),
  ('Вероятнее всего.', 2),
  ('Хорошие перспективы.', 2),
  ('Знаки говорят — «да».', 2),
  ('Да.', 2),
  ('Пока не ясно, попробуй снова...', 3),
  ('Спроси позже...', 3),
  ('Лучше не рассказывать...', 3),
  ('Сейчас нельзя предсказать...', 3),
  ('Сконцентрируйся и спроси опять...', 3),
  ('Даже не думай.', 4),
  ('Мой ответ — «нет».', 4),
  ('По моим данным — «нет».', 4),
  ('Перспективы не очень хорошие.', 4),
  ('Весьма сомнительно.', 4);

INSERT INTO `Sex` (`Type`) VALUES
  ('Женский'),
  ('Мужской'),
  ('Не определён');

INSERT INTO `User` (`Name`, `Password`, `SexId`) VALUES
  ('igor', 'rogi', 2);
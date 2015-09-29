create table `users` (
    `userId` int not null auto_increment,
    `email` varchar(50),
    `fbId` varchar(256),
    `fbAccessToken` varchar(256),
    `firstName` varchar(50),
    `lastName` varchar(50),
    `dob` date,
    `sex` varchar(6),
    `dateJoined` datetime,
    `dateUpdated` datetime,
    `latitude` varchar(50),
    `longitude` varchar(50),
    `city` varchar(50),
    `state` varchar(50),

    PRIMARY KEY (userId)
);

create table `crops` (
  `cropId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL ,
  `amount` FLOAT,
  `amountUnit` VARCHAR(10),
  `type` VARCHAR(100),
  `category` VARCHAR(100),
  `organic` TINYINT,
  `pesticides` TEXT,

  FOREIGN KEY (userId) REFERENCES users(userId),
  PRIMARY KEY (cropId)
);

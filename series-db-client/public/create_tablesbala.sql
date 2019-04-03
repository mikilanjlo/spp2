CREATE TABLE IF NOT EXISTS `game`(
	`id` int(22) NOT NULL AUTO_INCREMENT,
    `name` varchar(255),
    `company` int(22),
    `price` int(22),
    PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `comment`(
	`id` int(22) NOT NULL AUTO_INCREMENT,
    `name` varchar(255),
    `company` int(22),
    PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `company`(
	`id` int(22) NOT NULL AUTO_INCREMENT,
    `name` varchar(255),
    PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
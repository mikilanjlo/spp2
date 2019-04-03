CREATE TABLE IF NOT EXISTS `game` (
    `name` varchar(255),
    `Company` int(22),
    `price` int(22),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(22) NOT NULL AUTO_INCREMENT,
    `name` varchar(255),
    `Game` int(22),
    PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `company` (
  `id` int(22) NOT NULL AUTO_INCREMENT,
    `name` varchar(255),
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


COMMIT;

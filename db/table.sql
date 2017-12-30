SET CHARSET 'utf8';
CREATE TABLE IF NOT EXISTS `ml_lianjia_house` (
  `id`          INT           NOT NULL        COMMENT '房子ID',
  `name`        VARCHAR(100)  NOT NULL        COMMENT '房源名称',
  `description` VARCHAR(500)  NOT NULL        COMMENT '房源描述',
  `area`        DECIMAL(10,2) NOT NULL        COMMENT '面积',
  `huxing`      VARCHAR(100)  DEFAULT NULL    COMMENT '户型',
  `floor`       VARCHAR(100)  DEFAULT NULL    COMMENT '楼层',
  `face`        VARCHAR(50)   DEFAULT NULL    COMMENT '朝向',
  `subway`      VARCHAR(100)  DEFAULT NULL    COMMENT '地铁',
  `community`   VARCHAR(50)   DEFAULT NULL    COMMENT '小区',
  `location`    VARCHAR(100)  DEFAULT NULL    COMMENT '位置',
  `postdate`    INT           DEFAULT NULL    COMMENT '发布日',
  `housecode`   VARCHAR(20)   DEFAULT NULL    COMMENT '房源编码',
  `lianjiacode` VARCHAR(20)   DEFAULT NULL    COMMENT '链家编码',
  `middleman`   VARCHAR(50)   DEFAULT NULL    COMMENT '经纪人',
  `score`       DECIMAL(5,1)  DEFAULT NULL    COMMENT '评分',
  `comment`     INT           DEFAULT NULL    COMMENT '评论数',
  `looktimes`   INT           DEFAULT NULL    COMMENT '看房次数',
  `phone`       VARCHAR(50)   DEFAULT NULL    COMMENT '经纪人电话',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `ml_lianjia_price` (
  `id`          INT           NOT NULL        COMMENT '房子ID',
  `price`       INT           NOT NULL        COMMENT '价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci AUTO_INCREMENT=1;

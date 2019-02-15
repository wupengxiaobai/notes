/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : 127.0.0.1:3306
 Source Schema         : temp

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 14/02/2019 23:53:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for test1
-- ----------------------------
DROP TABLE IF EXISTS `test1`;
CREATE TABLE `test1`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test1
-- ----------------------------
INSERT INTO `test1` VALUES (2, 'username', 'descript', 'avatar/1550072372177_avatar.jpg');
INSERT INTO `test1` VALUES (3, 'username2', 'description2', 'avatar/1550072640904_avatar.jpg');
INSERT INTO `test1` VALUES (4, '4', '4', 'avatar/1550151478848_avatar.jpg');
INSERT INTO `test1` VALUES (5, '5', '5', 'avatar/1550151489743_avatar.jpg');
INSERT INTO `test1` VALUES (6, '6', '6', 'avatar/1550151499448_avatar.jpg');
INSERT INTO `test1` VALUES (7, '7', '7', 'avatar/1550151506575_avatar.jpg');
INSERT INTO `test1` VALUES (10, '10', '10', 'avatar/1550152869846_avatar.jpg');
INSERT INTO `test1` VALUES (13, '13', '13', 'avatar/1550154504976_avatar.jpg');

SET FOREIGN_KEY_CHECKS = 1;

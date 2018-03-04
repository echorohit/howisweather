-- phpMyAdmin SQL Dump
-- version 4.7.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 04, 2018 at 03:25 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `howisweather`
--
CREATE DATABASE IF NOT EXISTS `howisweather` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `howisweather`;

-- --------------------------------------------------------

--
-- Table structure for table `configurations`
--

CREATE TABLE `configurations` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `country` varchar(100) NOT NULL,
  `country_code` char(2) NOT NULL,
  `polling_frequency` enum('HOURLY','DAILY','WEEKLY','MONTHLY') NOT NULL DEFAULT 'HOURLY',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `configurations`
--

INSERT INTO `configurations` (`id`, `country`, `country_code`, `polling_frequency`, `last_updated`) VALUES
(5, 'INDIA', 'IN', 'HOURLY', '2018-03-03 11:31:07'),
(8, 'USA', 'US', 'HOURLY', '2018-03-04 14:17:08');

-- --------------------------------------------------------

--
-- Table structure for table `country_city`
--

CREATE TABLE `country_city` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `country_code` char(2) NOT NULL,
  `country` varchar(150) NOT NULL,
  `city` varchar(255) NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country_city`
--

INSERT INTO `country_city` (`id`, `country_code`, `country`, `city`, `added_on`) VALUES
(1, 'IN', 'INDIA', 'DELHI', '2018-03-04 14:21:15'),
(2, 'US', 'USA', 'NEW YORK', '2018-03-04 14:21:15'),
(3, 'PK', 'PAKISTAN', 'KARACHI', '2018-03-04 14:21:43'),
(4, 'SG', 'SINGAPORE', 'SINGAPORE', '2018-03-04 14:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_city_id` smallint(6) UNSIGNED NOT NULL,
  `read_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_read_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_temp_c` decimal(10,2) NOT NULL,
  `last_temp_f` decimal(10,2) NOT NULL,
  `country` varchar(150) NOT NULL,
  `city` varchar(255) NOT NULL,
  `temp_c` decimal(10,2) NOT NULL,
  `temp_f` decimal(10,2) NOT NULL,
  `humidity` smallint(6) NOT NULL,
  `last_humidity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNQ_IDX_COUNTY_CITY` (`country`,`country_code`);

--
-- Indexes for table `country_city`
--
ALTER TABLE `country_city`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_country_to_city` (`country_code`,`city`,`country`) USING BTREE;

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_index` (`country`,`city`),
  ADD KEY `fk_country_city` (`country_city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `country_city`
--
ALTER TABLE `country_city`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `weather`
--
ALTER TABLE `weather`
  ADD CONSTRAINT `weather_ibfk_1` FOREIGN KEY (`country_city_id`) REFERENCES `country_city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

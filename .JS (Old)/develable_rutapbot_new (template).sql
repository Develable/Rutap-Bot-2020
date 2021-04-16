-- Develable Rutapbot SQL Dump
--
-- Generation Time: May 03, 2020 at 05:13 PM
-- Server version: 5.7.28-log

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `develable_rutapbot_new`
--
CREATE DATABASE IF NOT EXISTS `develable_rutapbot_new` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `develable_rutapbot_new`;

-- --------------------------------------------------------

--
-- Table structure for table `afk_info`
--

CREATE TABLE `afk_info` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `start_datetime` datetime NOT NULL,
  `afk_reason` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_user`
--

CREATE TABLE `blocked_user` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `reason` longtext NOT NULL,
  `noticed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bot_notice`
--

CREATE TABLE `bot_notice` (
  `id` int(11) NOT NULL,
  `writer_id` bigint(20) NOT NULL,
  `writer_name` longtext NOT NULL,
  `writer_image_url` longtext NOT NULL,
  `receive_target` json NOT NULL,
  `notice_info` longtext NOT NULL,
  `notice_sent` tinyint(1) NOT NULL,
  `notice_sent_details` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `custom_commands`
--

CREATE TABLE `custom_commands` (
  `id` int(11) NOT NULL,
  `guild_id` bigint(20) NOT NULL,
  `command_name` longtext NOT NULL,
  `return_message` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `guild_event_message`
--

CREATE TABLE `guild_event_message` (
  `id` int(11) NOT NULL,
  `guild_id` bigint(20) NOT NULL,
  `welcome_channel_id` bigint(20) DEFAULT NULL,
  `welcome_message` longtext,
  `farewell_channel_id` bigint(20) DEFAULT NULL,
  `farewell_message` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `guild_info`
--

CREATE TABLE `guild_info` (
  `id` int(11) NOT NULL,
  `guild_id` bigint(20) NOT NULL,
  `guild_enabled` tinyint(1) DEFAULT '0',
  `guild_enabled_by` bigint(20) DEFAULT NULL,
  `pro_enabled` tinyint(1) DEFAULT '0',
  `pro_enabled_by` bigint(20) DEFAULT NULL,
  `warn_limit` bigint(2) DEFAULT '8',
  `warn_exceed_kick` tinyint(1) DEFAULT '1',
  `log_setting_info` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `neko_tags`
--

CREATE TABLE `neko_tags` (
  `id` int(11) NOT NULL,
  `kr` text NOT NULL,
  `en` text NOT NULL,
  `des` longtext NOT NULL,
  `category` mediumtext,
  `nsfw` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `neko_tags`
--

INSERT INTO `neko_tags` (`id`, `kr`, `en`, `des`, `category`, `nsfw`) VALUES
(1, '네코', 'neko', '고양이 소녀 (Catgirl)', '일반', 0),
(2, '여우', 'fox', '여우 소녀', '일반', 0),
(3, '아바타', 'avatar', '1:1 비율로 잘라진 소녀 이미지', '일반', 0),
(4, '호로', 'holo', '\'늑대와 향신료\'에 등장하는 호로', '일반', 0),
(5, '동물귀', 'kemonomimi', '네코 + 여우 + 호로', '일반', 0),
(6, '도마뱀', 'lizard', '(현실) 도마뱀 사진', '일반', 0),
(7, '고양이', 'meow', '(현실) 고양이 사진', '일반', 0),
(8, '와이푸', 'waifu', '적절한 비율로 잘라진 소녀 이미지', '일반', 0),
(9, '간질간질', 'tickle', '간지럽히는 움짤', '움짤', 0),
(10, '냠', 'feed', '밥 먹여주는 움짤', '움짤', 0),
(11, '콕', 'poke', '콕 찌르는 움짤', '움짤', 0),
(12, '싸대기', 'slap', '볼 때리는 움짤', '움짤', 0),
(13, '폭', 'cuddle', '부드럽게 안기는 움짤', '움짤', 0),
(14, '포옥', 'hug', '격하게 안기는 움짤', '움짤', 0),
(15, '쓰담', 'pat', '쓰다듬는 움짤', '움짤', 0)

-- --------------------------------------------------------

--
-- Table structure for table `vote_info`
--

CREATE TABLE `vote_info` (
  `id` int(11) NOT NULL,
  `guild_id` bigint(20) NOT NULL,
  `starter_id` bigint(20) NOT NULL,
  `vote_title` mediumtext NOT NULL,
  `vote_detail` longtext NOT NULL,
  `vote_type` int(1) NOT NULL,
  `vote_count` json NOT NULL,
  `voted_users` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warn_info`
--

CREATE TABLE `warn_info` (
  `id` int(11) NOT NULL,
  `guild_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `warn_count` bigint(2) NOT NULL,
  `kicked_or_banned` int(1) NOT NULL,
  `detail` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `afk_info`
--
ALTER TABLE `afk_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blocked_user`
--
ALTER TABLE `blocked_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_commands`
--
ALTER TABLE `custom_commands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guild_event_message`
--
ALTER TABLE `guild_event_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guild_info`
--
ALTER TABLE `guild_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `neko_tags`
--
ALTER TABLE `neko_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vote_info`
--
ALTER TABLE `vote_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warn_info`
--
ALTER TABLE `warn_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `afk_info`
--
ALTER TABLE `afk_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blocked_user`
--
ALTER TABLE `blocked_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_commands`
--
ALTER TABLE `custom_commands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guild_event_message`
--
ALTER TABLE `guild_event_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guild_info`
--
ALTER TABLE `guild_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `neko_tags`
--
ALTER TABLE `neko_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `vote_info`
--
ALTER TABLE `vote_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warn_info`
--
ALTER TABLE `warn_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

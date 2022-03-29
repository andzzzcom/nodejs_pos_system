-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2022 at 08:43 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id_admin` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `born_place` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` int(11) NOT NULL,
  `role` bigint(20) UNSIGNED DEFAULT NULL,
  `expired_reset` datetime DEFAULT NULL,
  `token_reset` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_reset` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `creator` int(11) DEFAULT NULL,
  `last_updater` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id_admin`, `email`, `password`, `avatar`, `name`, `phone`, `address`, `born_place`, `gender`, `role`, `expired_reset`, `token_reset`, `status_reset`, `status`, `creator`, `last_updater`, `last_login`, `created_date`, `last_updated_date`) VALUES
(1, 'admin@gmail.com', '$2y$10$oo71oURavmzSkuovoZ7EwuuzkWZvIU9OI8QOv/S10JIXB63w0iuSi', 'admin.jpg', 'admin', '5512345', 'alamat default', 'Jakarta', 1, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-12-21 15:44:52', '2021-12-21 15:44:52'),
(2, 'admin2@gmail.com', '$2b$10$pjN51O/LgzerlTPZGBgULenU/lU/e/ex69kNPEYCRhGOICjdxHyx6', 'admin-avatar-1647051038901.jpeg', 'admin', '5512345', 'alamat default', 'Jakarta', 1, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-12-21 15:44:52', '2022-03-12 15:03:53'),
(3, 'anama@gmail.com', '', 'admin-avatar-1646638653247.png', 'nama1', '123456789', 'alamat1', 'jakarta', 1, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, '2022-03-07 14:37:33', '2022-03-07 14:37:33'),
(4, 'email3@gmail.com', '$2b$10$wLS2pWjzAM09CET6rZDnre75v17fswyuhWv.4PP449rhFfHjKG7Va', 'admin-avatar-1646639811562.png', 'nama3s', 'phone1', 'alamat2', 'jakarta', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:56:51', '2022-03-12 10:25:30'),
(5, 'email3@gmail.com', '$2b$10$PXqWYm58s9ZocSSbOublFugizm2LYjBVDat7Pk.VlOJXLAIGWUbbK', 'admin-avatar-1646639826390.png', 'nama3', 'phone1', 'alamat2', 'jakarta', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:57:06', '2022-03-07 15:35:13'),
(6, 'email3@gmail.com', '$2b$10$ovWm1z4q5M7B6ZYNfpBmDOVvgxRpF6czBeS6klCTD1OQZgLXuJqC.', 'admin-avatar-1646639838373.png', 'nama3', 'phone1', 'alamat2', 'jakarta', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:57:18', '2022-03-07 15:35:08'),
(7, 'adminbaru2@gmail.com', '$2b$10$2yVK9HFtpL4YtTSuwZ.ZMumQKOTlbZAdKD38bAyviWCKXFeDZIxYy', 'admin-avatar-1646641449309.png', 'admin baru2', '1234567890', 'alamat23', 'tangerang', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:57:41', '2022-03-07 15:35:01');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator` int(10) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `created_date`, `last_updated`, `creator`, `status`) VALUES
(1, 'Kategori 1', '2022-03-07 11:41:48', '2022-03-07 11:41:48', 1, 1),
(2, 'Kategori 2', '2022-03-07 11:41:48', '2022-03-12 10:22:22', 1, 0),
(3, 'Kategori 3', '2022-03-07 13:45:23', '2022-03-07 13:54:55', 1, -1),
(4, 'Kategori 5', '2022-03-07 13:45:33', '2022-03-07 13:54:47', 1, -1);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id_invoice` int(11) NOT NULL,
  `invoice_code` varchar(100) NOT NULL,
  `subtotal_price` decimal(10,0) NOT NULL,
  `tax_price` decimal(10,0) NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `status` int(1) NOT NULL,
  `creator` int(1) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id_invoice`, `invoice_code`, `subtotal_price`, `tax_price`, `total_price`, `status`, `creator`, `created_date`, `last_updated_date`) VALUES
(1, 'INV-1234567-ABCDE', '15000', '1000', '16000', 1, 1, '2022-03-10 16:13:29', '2022-03-10 16:13:29'),
(2, 'code-1234567', '15000', '15000', '15000', 1, 1, '2022-03-11 09:30:41', '2022-03-11 09:30:41'),
(3, 'code-12345678', '15000', '24997', '1500024997', 1, 1, '2022-03-11 10:03:31', '2022-03-11 10:03:31'),
(4, 'asdadsda', '15000', '1000', '150001000', 1, 1, '2022-03-11 10:03:50', '2022-03-11 10:03:50'),
(5, 'invoice-5', '15000', '1500', '150001500', 1, 1, '2022-03-11 10:04:51', '2022-03-11 10:04:51'),
(6, 'code-1234567', '15000', '2500', '17500', 1, 1, '2022-03-11 10:05:56', '2022-03-11 10:05:56'),
(7, 'invoice2', '15000', '1500', '16500', 1, 1, '2022-03-11 10:07:23', '2022-03-11 10:07:23'),
(8, 'abcde-12345', '15000', '2500', '17500', 1, 1, '2022-03-11 10:09:53', '2022-03-11 10:09:53'),
(9, 'abcde-12345', '15000', '2500', '17500', -1, 1, '2022-03-11 10:10:07', '2022-03-12 10:19:35'),
(10, 'abcde-12345', '15000', '3500', '18500', 1, 1, '2022-03-11 10:11:04', '2022-03-11 10:11:04'),
(11, 'asdasdasd', '0', '1500', '0', 1, 1, '2022-03-11 10:16:46', '2022-03-11 10:16:46'),
(12, 'asdsada', '125000', '132313', '257313', 1, 1, '2022-03-11 10:17:13', '2022-03-12 10:19:27'),
(13, 'code-12345', '15000', '2500', '150002500', -1, 1, '2022-03-11 10:17:44', '2022-03-11 15:28:55'),
(14, 'code-1234567', '25000', '1500', '26500', -1, 1, '2022-03-11 10:18:16', '2022-03-11 15:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `invoices_detail`
--

CREATE TABLE `invoices_detail` (
  `id_invoice_detail` int(11) NOT NULL,
  `id_invoice` int(10) NOT NULL,
  `id_product` int(1) NOT NULL,
  `status` int(1) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoices_detail`
--

INSERT INTO `invoices_detail` (`id_invoice_detail`, `id_invoice`, `id_product`, `status`, `created_date`, `last_updated_date`) VALUES
(1, 1, 1, 1, '2022-03-10 16:02:22', '2022-03-11 10:45:52'),
(2, 1, 2, 1, '2022-03-10 16:02:22', '2022-03-10 16:02:49'),
(3, 9, 11, -1, '2022-03-11 10:10:07', '2022-03-12 10:19:35'),
(4, 10, 11, 1, '2022-03-11 10:11:04', '2022-03-11 10:11:04'),
(5, 11, 11, 1, '2022-03-11 10:16:46', '2022-03-11 10:16:46'),
(6, 12, 2, 1, '2022-03-11 10:17:13', '2022-03-12 10:19:27'),
(7, 13, 11, -1, '2022-03-11 10:17:44', '2022-03-11 15:28:55'),
(8, 14, 3, -1, '2022-03-11 10:18:16', '2022-03-11 15:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `category` int(10) NOT NULL,
  `thumbnail` varchar(100) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `last_updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator` int(1) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_product`, `name`, `price`, `category`, `thumbnail`, `created_date`, `last_updated`, `creator`, `status`) VALUES
(1, 'Buku Tulis 1234567', '15000', 1, '', '2022-03-04 15:39:56', '2022-03-12 10:08:20', 1, -1),
(2, 'Buku Tulis 12', '125000', 1, '', '2022-03-04 15:39:56', '2022-03-10 17:04:53', 1, 1),
(3, 'abcde', '25000', 1, '', '2022-03-05 01:10:13', '2022-03-10 17:04:51', 1, 1),
(4, 'produck 1', '15000', 1, 'tes', '2022-03-07 09:57:35', '2022-03-07 09:57:35', 1, 1),
(5, 'produk2', '25000', 1, 'Capture.PNG', '2022-03-07 10:31:40', '2022-03-07 10:31:40', 1, 1),
(6, 'produk2', '25000', 1, 'Capture.PNG', '2022-03-07 10:34:30', '2022-03-07 11:54:33', 1, -1),
(7, 'produk3', '14999', 1, 'Capture.PNG', '2022-03-07 10:36:59', '2022-03-07 11:38:25', 1, -1),
(8, 'produk3', '14999', 1, 'admin-thumbnail-1646624262871.png', '2022-03-07 10:37:42', '2022-03-07 11:38:20', 1, -1),
(9, 'produk5', '15000', 1, 'admin-thumbnail-1646624278297.png', '2022-03-07 10:37:58', '2022-03-07 11:38:16', 1, -1),
(10, 'produk5', '15000', 1, 'admin-thumbnail-1646624311183.png', '2022-03-07 10:38:31', '2022-03-07 11:38:11', 1, -1),
(11, 'produk lagi', '149999', 1, 'admin-thumbnail-1646627619461.png', '2022-03-07 10:39:09', '2022-03-12 10:07:30', 1, 1),
(12, 'produk abcdefg', '1150000', 1, 'admin-thumbnail-1646627604710.png', '2022-03-07 10:41:16', '2022-03-07 11:38:04', 1, -1),
(13, 'produk 5', '5000', 1, 'admin-thumbnail-1646628742355.png', '2022-03-07 11:48:37', '2022-03-07 11:54:26', 1, -1),
(14, 'tes', '15000', 2, 'admin-thumbnail-1647054572296.jpeg', '2022-03-12 10:09:32', '2022-03-12 10:09:32', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id_setting` bigint(20) UNSIGNED NOT NULL,
  `title_web` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle_web` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `favicon_web` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_web` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `creator` bigint(20) UNSIGNED DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id_setting`, `title_web`, `subtitle_web`, `favicon_web`, `logo_web`, `email`, `status`, `creator`, `created_date`, `last_updated_date`) VALUES
(2, 'POSify', 'Posifys', 'admin-favicon_web-1647049948627.png', 'admin-logo_web-1646716648731.png', 'testing@gmail.coms', 1, 1, '2022-03-08 11:38:48', '2022-03-12 10:26:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `c_admins_role_foreign` (`role`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id_invoice`);

--
-- Indexes for table `invoices_detail`
--
ALTER TABLE `invoices_detail`
  ADD PRIMARY KEY (`id_invoice_detail`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id_setting`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id_invoice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `invoices_detail`
--
ALTER TABLE `invoices_detail`
  MODIFY `id_invoice_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id_setting` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 20, 2024 at 12:28 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Nutrimate`
--

-- --------------------------------------------------------

--
-- Table structure for table `bulk`
--

CREATE TABLE `bulk` (
  `ID` int NOT NULL,
  `RecipeName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Ingredients` text COLLATE utf8mb4_general_ci NOT NULL,
  `Proteins` decimal(10,2) NOT NULL,
  `Carbs` decimal(10,2) NOT NULL,
  `Fat` decimal(10,2) NOT NULL,
  `TotalCalories` decimal(10,2) NOT NULL,
  `Instructions` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bulk`
--

INSERT INTO `bulk` (`ID`, `RecipeName`, `Ingredients`, `Proteins`, `Carbs`, `Fat`, `TotalCalories`, `Instructions`) VALUES
(1, 'Beef Steak with Sweet Potatoes', 'Beef steak, sweet potatoes, olive oil, spinach', 45.00, 40.00, 18.00, 550.00, 'Season beef steak and grill to your desired doneness. Roast sweet potatoes until tender.'),
(2, 'Chicken and Rice', 'Chicken breast, brown rice, broccoli, olive oil', 50.00, 60.00, 12.00, 600.00, 'Cook chicken breasts and serve over steamed rice with a side of vegetables.'),
(3, 'Pasta with Meatballs', 'Ground beef, pasta, tomato sauce, cheese', 40.00, 70.00, 20.00, 700.00, 'Cook pasta and top with prepared meatballs and marinara sauce.'),
(4, 'Egg and Avocado Toast', 'Eggs, whole wheat bread, avocado, olive oil', 30.00, 40.00, 25.00, 550.00, 'Toast bread and top with sliced avocado and a fried egg. Season with salt and pepper.'),
(5, 'Protein Smoothie', 'Protein powder, banana, oats, peanut butter, almond milk', 30.00, 45.00, 15.00, 500.00, 'Blend protein powder, banana, almond milk, and ice until smooth.'),
(6, 'Grilled Chicken with Quinoa', 'Chicken breast, quinoa, spinach, olive oil', 45.00, 50.00, 14.00, 600.00, 'Grill chicken and serve over cooked quinoa with a side of vegetables.'),
(7, 'Salmon with Brown Rice', 'Salmon, brown rice, broccoli, olive oil', 40.00, 45.00, 20.00, 650.00, 'Bake salmon and serve over brown rice with lemon and herbs.'),
(8, 'Beef Stir-fry with Veggies', 'Beef, mixed vegetables, soy sauce, olive oil', 42.00, 40.00, 18.00, 600.00, 'Stir-fry beef slices with mixed vegetables and soy sauce until cooked.'),
(9, 'Turkey Chili', 'Ground turkey, kidney beans, tomatoes, onions, chili spices', 40.00, 50.00, 15.00, 650.00, 'Simmer ground turkey with beans, tomatoes, and chili spices until flavors blend.'),
(10, 'Chicken Alfredo', 'Chicken breast, whole wheat pasta, Alfredo sauce, broccoli', 45.00, 60.00, 20.00, 700.00, 'Cook chicken and toss with pasta and Alfredo sauce. Garnish with parsley.'),
(11, 'Tofu & Sweet Potato Bowl', 'Tofu, sweet potatoes, kale, olive oil', 35.00, 50.00, 18.00, 600.00, 'Bake tofu and sweet potatoes, serve with greens and a drizzle of tahini sauce.'),
(12, 'Steak and Potato Salad', 'Beef steak, potatoes, mixed greens, olive oil', 45.00, 55.00, 20.00, 700.00, 'Grill steak and toss with roasted potatoes and a light vinaigrette.'),
(13, 'Egg White & Spinach Breakfast Burrito', 'Egg whites, spinach, whole wheat tortilla, cheese', 30.00, 40.00, 15.00, 450.00, 'Scramble egg whites with spinach and wrap in a tortilla with salsa.'),
(14, 'Salmon & Avocado Salad', 'Salmon, avocado, mixed greens, olive oil, lemon', 40.00, 15.00, 20.00, 500.00, 'Mix flaked salmon with avocado slices, greens, and a lemon vinaigrette.'),
(15, 'Grilled Chicken with Avocado and Rice', 'Chicken breast, avocado, brown rice, olive oil', 45.00, 60.00, 15.00, 650.00, 'Grill chicken and serve with avocado slices and steamed rice.'),
(16, 'Chicken & Lentil Soup', 'Chicken breast, lentils, carrots, onions, garlic', 40.00, 45.00, 10.00, 500.00, 'Simmer chicken, lentils, carrots, and celery in broth until lentils are tender.'),
(17, 'Pork Tenderloin with Roasted Vegetables', 'Pork tenderloin, sweet potatoes, carrots, olive oil', 50.00, 50.00, 20.00, 700.00, 'Roast pork tenderloin with seasoned vegetables until cooked through.'),
(18, 'Eggs and Sausage Breakfast', 'Eggs, turkey sausage, spinach, olive oil', 35.00, 25.00, 25.00, 550.00, 'Cook scrambled eggs and sausage, serve with toast on the side.'),
(19, 'Beef and Broccoli Stir-fry', 'Beef, broccoli, soy sauce, olive oil', 42.00, 30.00, 18.00, 550.00, 'Stir-fry beef with broccoli and garlic in a soy-based sauce.'),
(20, 'Chicken Burrito Bowl', 'Chicken breast, brown rice, black beans, salsa, avocado', 45.00, 55.00, 18.00, 650.00, 'Layer rice, chicken, beans, salsa, and guacamole in a bowl.'),
(21, 'Salmon with Sweet Potatoes', 'Salmon, sweet potatoes, spinach, olive oil', 45.00, 40.00, 22.00, 650.00, 'Bake salmon and sweet potatoes with a drizzle of olive oil and herbs.'),
(22, 'Beef Tacos with Avocado', 'Ground beef, whole wheat tortillas, avocado, lettuce, cheese', 40.00, 50.00, 25.00, 700.00, 'Fill taco shells with seasoned beef, avocado slices, and your favorite toppings.'),
(23, 'Chicken Parmesan', 'Chicken breast, whole wheat breadcrumbs, marinara sauce, mozzarella', 40.00, 45.00, 20.00, 650.00, 'Bread chicken cutlets, fry, and top with marinara and mozzarella before baking.'),
(24, 'Tofu and Rice Stir-fry', 'Tofu, brown rice, mixed vegetables, soy sauce, sesame oil', 30.00, 40.00, 18.00, 550.00, 'Stir-fry tofu with rice, mixed vegetables, and a light soy sauce.'),
(25, 'Salmon and Quinoa Bowl', 'Salmon, quinoa, spinach, olive oil', 40.00, 50.00, 18.00, 600.00, 'Serve baked salmon over a bowl of quinoa with avocado and greens.');

-- --------------------------------------------------------

--
-- Table structure for table `cut`
--

CREATE TABLE `cut` (
  `ID` int NOT NULL,
  `RecipeName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Ingredients` text COLLATE utf8mb4_general_ci NOT NULL,
  `Proteins` decimal(10,2) NOT NULL,
  `Carbs` decimal(10,2) NOT NULL,
  `Fat` decimal(10,2) NOT NULL,
  `TotalCalories` decimal(10,2) NOT NULL,
  `Instructions` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cut`
--

INSERT INTO `cut` (`ID`, `RecipeName`, `Ingredients`, `Proteins`, `Carbs`, `Fat`, `TotalCalories`, `Instructions`) VALUES
(1, 'Chicken Salad', 'Chicken breast, lettuce, tomato, cucumber, olive oil', 35.00, 10.00, 8.00, 290.00, 'Mix cooked chicken, lettuce, cucumber, and your favorite dressing.'),
(2, 'Tuna Salad', 'Tuna, spinach, avocado, olive oil', 40.00, 8.00, 6.00, 280.00, 'Combine tuna, celery, mayonnaise, and seasonings. Serve chilled.'),
(3, 'Grilled Salmon with Asparagus', 'Salmon, asparagus, olive oil, lemon', 30.00, 7.00, 14.00, 350.00, 'Grill salmon and asparagus until cooked through. Season with lemon and herbs.'),
(4, 'Turkey Wrap', 'Turkey breast, whole wheat wrap, spinach, mustard', 25.00, 20.00, 5.00, 280.00, 'Fill a tortilla with turkey, lettuce, tomato, and avocado. Wrap tightly.'),
(5, 'Egg White Scramble', 'Egg whites, spinach, mushrooms, olive oil', 25.00, 5.00, 7.00, 210.00, 'Scramble egg whites with spinach, mushrooms, and a pinch of salt.'),
(6, 'Grilled Shrimp and Veggie Skewers', 'Shrimp (150g), Bell peppers (100g), Zucchini (100g), Red onion (50g), Olive oil (5ml), Garlic powder, Lemon juice (10ml), Salt, Pepper', 28.00, 15.00, 8.00, 220.00, 'Skewer shrimp and veggies, brush with olive oil, and grill until shrimp is pink.'),
(7, 'Spinach and Feta Omelette', 'Egg whites (4), Spinach (50g), Feta cheese (30g), Onion (30g, chopped), Olive oil (5ml), Salt, Pepper', 22.00, 5.00, 9.00, 180.00, 'Whisk eggs with spinach and feta, cook in a non-stick pan until set.'),
(8, 'Zoodles with Tomato Basil Sauce', 'Zucchini noodles (200g), Tomato sauce (100g), Basil leaves (10g), Garlic (1 clove, minced), Olive oil (5ml), Parmesan cheese (10g)', 6.00, 12.00, 7.00, 130.00, 'Cook zoodles in a pan, add tomato basil sauce, and heat until warm.'),
(9, 'Baked Cod with Lemon and Dill', 'Cod fillet (200g), Lemon slices, Dill (fresh, 5g), Olive oil (5ml), Salt, Pepper', 34.00, 3.00, 5.00, 180.00, 'Bake cod with lemon slices and dill at 400°F for 15-20 minutes.'),
(10, 'Cauliflower Fried Rice', 'Cauliflower rice (200g), Peas (50g), Carrots (50g, diced), Egg (1), Soy sauce (15ml), Green onions (10g, chopped), Garlic (1 clove, minced)', 10.00, 15.00, 5.00, 130.00, 'Sauté riced cauliflower with peas, carrots, and scrambled eggs. Add soy sauce.'),
(11, 'Greek Yogurt Berry Parfait', 'Greek yogurt (150g), Blueberries (50g), Strawberries (50g, sliced), Honey (10g), Chia seeds (5g)', 12.00, 18.00, 5.00, 170.00, 'Layer Greek yogurt, berries, and granola in a cup. Serve chilled.'),
(12, 'Turkey Lettuce Wraps', 'Ground turkey (150g), Lettuce leaves, Cucumber slices (50g), Red bell pepper (50g), Soy sauce (15ml), Ginger (grated, 5g), Garlic (1 clove, minced)', 27.00, 10.00, 7.00, 200.00, 'Fill lettuce leaves with turkey, shredded carrots, and hoisin sauce. Wrap and serve.'),
(13, 'Chicken & Cucumber Salad', 'Chicken breast, cucumber, mixed greens, olive oil', 30.00, 8.00, 10.00, 300.00, 'Toss chicken with cucumber, herbs, and a light vinaigrette.'),
(14, 'Salmon & Avocado Bowl', 'Salmon, avocado, mixed greens, olive oil', 35.00, 12.00, 18.00, 400.00, 'Combine salmon chunks, avocado slices, and quinoa in a bowl. Drizzle with dressing.'),
(15, 'Grilled Chicken with Roasted Vegetables', 'Chicken breast, bell peppers, zucchini, olive oil', 32.00, 15.00, 12.00, 350.00, 'Grill chicken breasts and vegetables, season with herbs, and serve together.'),
(16, 'Spicy Tuna Salad', 'Tuna, avocado, cucumber, chili flakes, olive oil', 35.00, 6.00, 12.00, 330.00, 'Mix tuna with spicy mayo and chopped celery. Serve over greens or with bread.'),
(17, 'Chicken & Avocado Lettuce Wraps', 'Chicken breast, avocado, lettuce leaves, olive oil', 30.00, 8.00, 15.00, 350.00, 'Fill lettuce leaves with chicken and avocado slices, season, and serve.'),
(18, 'Grilled Shrimp with Cabbage Slaw', 'Shrimp, cabbage, olive oil, vinegar', 25.00, 12.00, 10.00, 280.00, 'Grill shrimp and serve with a cabbage slaw tossed in a tangy dressing.'),
(19, 'Egg White Veggie Scramble', 'Egg whites, spinach, mushrooms, bell peppers, olive oil', 25.00, 10.00, 8.00, 220.00, 'Scramble egg whites with diced vegetables, season with salt and pepper.'),
(20, 'Tuna & Celery Salad', 'Tuna, celery, Greek yogurt, mustard', 30.00, 5.00, 5.00, 200.00, 'Mix tuna, chopped celery, and light mayo. Serve chilled or on toast.'),
(21, 'Grilled Chicken with Broccoli', 'Chicken breast, broccoli, olive oil', 35.00, 10.00, 12.00, 320.00, 'Grill chicken breasts and steam broccoli. Serve together with seasoning.'),
(22, 'Salmon & Kale Salad', 'Salmon, kale, avocado, olive oil, lemon', 40.00, 10.00, 18.00, 400.00, 'Mix salmon pieces with kale, lemon, and a light vinaigrette for a salad.'),
(23, 'Turkey & Cucumber Roll-ups', 'Turkey breast, cucumber, mustard, olive oil', 25.00, 5.00, 8.00, 250.00, 'Layer turkey slices, cucumber, and cream cheese. Roll up and serve.'),
(24, 'Shrimp & Spinach Stir-fry', 'Shrimp, spinach, garlic, olive oil', 30.00, 8.00, 10.00, 270.00, 'Stir-fry shrimp and spinach with garlic and soy sauce until shrimp is pink.'),
(25, 'Tofu & Veggie Stir-fry', 'Tofu, bell peppers, zucchini, soy sauce, sesame oil', 22.00, 18.00, 10.00, 280.00, 'Stir-fry tofu and mixed vegetables with soy sauce until golden.');

-- --------------------------------------------------------

--
-- Table structure for table `maintain`
--

CREATE TABLE `maintain` (
  `RecipeID` int NOT NULL,
  `RecipeName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Ingredients` text COLLATE utf8mb4_general_ci NOT NULL,
  `Proteins` float NOT NULL,
  `Carbs` float NOT NULL,
  `Fat` float NOT NULL,
  `TotalCalories` float NOT NULL,
  `Instructions` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintain`
--

INSERT INTO `maintain` (`RecipeID`, `RecipeName`, `Ingredients`, `Proteins`, `Carbs`, `Fat`, `TotalCalories`, `Instructions`) VALUES
(1, 'Chicken Caesar Salad', 'Chicken breast, romaine lettuce, croutons, caesar dressing, parmesan', 30, 20, 15, 350, 'Grill chicken and toss with lettuce, croutons, dressing, and parmesan.'),
(2, 'Shrimp and Avocado Salad', 'Shrimp, avocado, cherry tomatoes, cucumber, lime', 25, 15, 18, 350, 'Mix cooked shrimp with avocado and vegetables, drizzle with lime.'),
(3, 'Mediterranean Quinoa Bowl', 'Quinoa, chickpeas, cucumber, tomato, feta, olives', 15, 35, 12, 400, 'Combine cooked quinoa with chickpeas and chopped vegetables.'),
(4, 'Grilled Chicken Pita', 'Chicken breast, pita bread, tzatziki, lettuce, tomato', 30, 35, 10, 400, 'Stuff pita with grilled chicken, tzatziki, and vegetables.'),
(5, 'Salmon and Brown Rice', 'Salmon fillet, brown rice, asparagus, lemon', 35, 40, 12, 450, 'Bake salmon and serve with rice and asparagus.'),
(6, 'Turkey Meatball Bowl', 'Ground turkey, quinoa, spinach, tomato sauce', 28, 30, 10, 380, 'Serve turkey meatballs over quinoa with tomato sauce.'),
(7, 'Avocado and Chicken Wrap', 'Chicken breast, avocado, tortilla, spinach, hummus', 25, 40, 15, 450, 'Wrap chicken and avocado in a tortilla with spinach and hummus.'),
(8, 'Steak Salad', 'Steak, mixed greens, cherry tomatoes, red onion, balsamic vinaigrette', 35, 10, 20, 400, 'Slice steak and serve over greens with tomatoes and dressing.'),
(9, 'Tofu Stir-fry', 'Tofu, bell peppers, broccoli, soy sauce, sesame oil', 15, 25, 10, 300, 'Stir-fry tofu and vegetables with soy sauce.'),
(10, 'Stuffed Sweet Potato', 'Sweet potato, black beans, avocado, Greek yogurt, cilantro', 15, 40, 12, 380, 'Bake sweet potato and stuff with beans and avocado.'),
(11, 'Lentil Curry', 'Lentils, coconut milk, curry powder, spinach, onion', 18, 35, 15, 400, 'Simmer lentils with coconut milk and spices, add spinach.'),
(12, 'Chicken Fajitas', 'Chicken breast, bell peppers, onions, tortilla, seasoning', 28, 40, 10, 400, 'Sauté chicken and vegetables with fajita seasoning and serve in tortillas.'),
(13, 'Tuna Niçoise Salad', 'Tuna, green beans, potatoes, eggs, olives, vinaigrette', 30, 20, 15, 400, 'Mix tuna with boiled potatoes, eggs, and green beans.'),
(14, 'Grilled Fish Tacos', 'White fish, cabbage, tortilla, lime, avocado', 25, 30, 12, 350, 'Grill fish and serve in tortillas with cabbage and avocado.'),
(15, 'Zucchini Lasagna', 'Zucchini, ricotta, marinara sauce, ground beef, mozzarella', 35, 15, 20, 450, 'Layer zucchini slices with beef, ricotta, and sauce, bake.'),
(16, 'Egg Fried Rice', 'Eggs, brown rice, peas, carrots, soy sauce', 15, 45, 10, 350, 'Stir-fry rice with eggs, vegetables, and soy sauce.'),
(17, 'Greek Chicken Bowl', 'Chicken breast, cucumber, tomato, feta, tzatziki', 30, 25, 15, 400, 'Serve grilled chicken over vegetables with feta and tzatziki.'),
(18, 'Beef and Sweet Potato Skillet', 'Ground beef, sweet potatoes, spinach, garlic, herbs', 25, 30, 15, 420, 'Cook beef with sweet potato cubes and spinach.'),
(19, 'Shrimp Scampi with Zoodles', 'Shrimp, zucchini noodles, garlic, butter, lemon', 25, 15, 15, 350, 'Cook shrimp in garlic butter, serve over zoodles.'),
(20, 'Caprese Chicken', 'Chicken breast, tomato, mozzarella, basil, balsamic glaze', 30, 10, 15, 350, 'Top chicken with tomato, mozzarella, and bake.'),
(21, 'Asian Chicken Salad', 'Chicken breast, cabbage, carrots, sesame seeds, soy dressing', 28, 20, 12, 350, 'Toss chicken with shredded cabbage and soy dressing.'),
(22, 'Teriyaki Salmon', 'Salmon fillet, teriyaki sauce, jasmine rice, broccoli', 32, 45, 12, 450, 'Bake salmon with teriyaki sauce, serve with rice.'),
(23, 'Vegetarian Chili', 'Kidney beans, black beans, tomato, chili spices, onion', 15, 40, 10, 350, 'Simmer beans with tomatoes and chili spices.'),
(24, 'Stuffed Bell Peppers with Turkey', 'Bell peppers, ground turkey, quinoa, tomato sauce', 28, 30, 8, 380, 'Stuff bell peppers with turkey and quinoa, bake.'),
(25, 'Couscous and Veggie Bowl', 'Couscous, roasted vegetables, chickpeas, lemon', 12, 40, 10, 350, 'Serve couscous with roasted veggies and chickpeas.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `goal` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`, `height`, `weight`, `birthdate`, `goal`) VALUES
(27, 'luke', 'nagooroo', 'luke.nagooroo12@icloud.com', '$2b$10$CSxwgiJXTDWuwbeaRnyiI.AOP7o25Q1RmX02RMGFt8KKBYLB3ob/W', 9, 9, '2024-11-06', 'maintaining'),
(28, 'arya', 'jarya', 'admin@hw.ac.uk', '$2b$10$5TAgeTVeAJTtn.XCZ5pwPej0tw4J6p7a.ZuPvlAUItwpdAaKKkDQ2', 261, 30, '2005-11-03', 'maintaining'),
(29, 'test', 'subject', 'test@hw.ac.uk', '$2b$10$8oyIu.kb6P5BNRLaVQk/yOmdoqhJJzW1qePf2x/dUQH6LNi1nRHMC', 53, 31, '1976-12-03', 'bulking'),
(30, 'john', 'peter', 'johnpeter@hotmail.com', '$2b$10$.XWiXF6qr2Y3Qmdt.87z/.wMbtxzSM5v0hEzw/BsKB3GTYcuBLZBW', 154, 83, '1998-01-02', 'cutting'),
(31, 'Isha', 'Venkat', 'isha.venkat0602@gmail.com', '$2b$10$nbn9UV2k3aqBxQqboX93ReLMDeXrRmezov2VgLU2pEuCrYMR7cqYW', 158, 41, '2006-06-02', 'bulking'),
(32, 'Isha', 'Venkat', 'isha.venkat@gmail.com', '$2b$10$.TVqEiWmhiQxIIQwbYi/LOfShPyot6jmiDeFS7XP3LQbypnOqh90O', 154, 42, '2006-06-02', 'bulking'),
(33, 'Isha', 'Venkat', 'isha.venkat06@gmail.com', '$2b$10$NSzti176BRAk16XSVNeqxekghnjfzaAdpL.ZHAoVSZTM5hbZOhthq', 154, 50, '2006-06-02', 'cutting'),
(34, 'adnan', 'murtaza', 'adoonimurtaza@gmail.com', '$2b$10$bi5xjAafb43rD49zVqZLweVR/0J9YxEEC/cer.5NnYQmI5o5klB2G', 180, 71, '2005-03-16', 'bulking');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bulk`
--
ALTER TABLE `bulk`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cut`
--
ALTER TABLE `cut`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `maintain`
--
ALTER TABLE `maintain`
  ADD PRIMARY KEY (`RecipeID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bulk`
--
ALTER TABLE `bulk`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `cut`
--
ALTER TABLE `cut`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `maintain`
--
ALTER TABLE `maintain`
  MODIFY `RecipeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

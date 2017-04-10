'use strict';

/*
 * This file contains the list of all recipes
 * known so far.
 *
 * The representation of a recipe inside every
 * sub-function is as follows:
 *   A				->	Unique type A (child)
 *   [A]			->	Generic type A (parent)
 *   [A - B - ...]	->	Parent type A excluding B
 *   A|B 			->	Type A or B
 *
 * The order of the checks matter a lot, whence this
 * representation to understand every one of them.
 * Also, no 'else if' is used since every 'if' returns
 * from the function if it is evaluated successfully.
 *
 * A few rules apply when checking for a recipe:
 * 1. The recipes w/ the most ingredients should be
 *    checked first or it could create false positives
 *    e.g. wheat, then wheat + butter.
 *         the first check would return, though the
 *         second one should be the one returned.
 * 2. When checking for only 1 type, this type should
 *    never appear again in subsequent checks, unless
 *    if we are in a child type check.
 * 3. Try to align the ingredients common to successive
 *    checks for more readability.
 */

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'seafood' type.
 */
function seafoodRecipes(type) {
	return "Seafood Skewer";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'fruit' type.
 */
function fruitRecipes(type) {
	// [Fruit] + Mushroom
	if (type.has("mushroom"))
		return "Fruit and Mushroom Mix";
	// [Fruit] + [Herb]|[Vegetable]
	if (type.has("herb") || type.has("vegetable"))
		return "Steamed Fruit";
	////// Apple
	if (type.has("apple")) {
		// Apple + Wheat + Sugar + Butter
		if (type.has("wheat") && type.has("sugar") && type.has("butter"))
			return "Apple Pie";
		// Apple + Wheat + Sugar
		if (type.has("wheat") && type.has("sugar"))
			return "Fruitcake";
		// Apple + Honey
		if (type.has("honey"))
			return "Honeyed Apple";
	}
	// [Fruit - Apple] + Wheat + Sugar + Butter
	if (type.has("wheat") && type.has("sugar") && type.has("butter"))
		return "Fruit Pie";
	// [Fruit - Apple] + Honey
	if (type.has("honey"))
		return "Honeyed Fruits";
	////// Wildberry
	if (type.has("wildberry")) {
		// Wildberry + Wheat + Sugar + Milk + Egg
		if (type.has("wheat") && type.has("sugar") && type.has("milk") && type.has("egg"))
			return "Wildberry Crepe";
		// Wildberry + Wheat + Sugar
		if (type.has("wheat") && type.has("sugar"))
			return "Fruitcake";
	}
	////// Peppers
	if (type.has("pepper")) {
		// Peppers + [Meat]
		if (type.has("meat"))
			return "Pepper Steak";
		// Peppers + [Seafood]
		if (type.has("seafood"))
			return "Pepper Seafood";
		// Peppers
		return "Sauteed Peppers";
	}
	// [Fruit]
	return "Simmered Fruit";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'vegetable' type.
 */
function vegetableRecipes(type) {
	return "Fried Wild Greens";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'herb' type.
 */
function herbRecipes(type) {
	return "Fried Wild Greens";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'meat' type.
 */
function meatRecipes(type) {
	return "Meat Skewer";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'mushroom' type.
 */
function mushroomRecipes(type) {
	return "Mushroom Skewer";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'misc' type.
 */
function miscRecipes(type) {
	return "Dubious Food";
}

/*
 * Returns the name of the dish, knowing that
 * it contains at least the 'insect' type.
 */
function insectRecipes(type) {
	return "Dubious Food";
}

/*
 * Determines the name of a given dish
 * based on what makes it up.
 */
function _getName(dish) {
	var name = "",
		type = dish.type;

	debug && console.log(dish);
	/* Seafood */
	if (type.has("seafood")) {
		name = seafoodRecipes(type);
	}
	/* Fruits */
	else if (type.has("fruit")) {
		name = fruitRecipes(type);
	}
	/* Vegetable */
	else if (type.has("vegetable")) {
		name = vegetableRecipes(type);
	}
	/* Herb */
	else if (type.has("herb")) {
		name = herbRecipes(type);
	}
	/* Meat */
	else if (type.has("meat")) {
		name = meatRecipes(type);
	}
	/* Mushroom */
	else if (type.has("mushroom")) {
		name = mushroomRecipes(type);
	}
	/* Misc */
	else if (type.has("misc")) {
		name = miscRecipes(type);
	}
	/* Insect */
	else if (type.has("insect")) {
		name = insectRecipes(type);
	}
	/*
	 * No type matched: only non-edible types are left.
	 */
	else {
		return "Dubious food";
	}

	return (hasEffect(dish) ? dish.effect + " " : "") + name;
}
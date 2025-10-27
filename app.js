// Här hämtar vi måltider från API:t du rekommenderade och gör om till JS-objekt.
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Denna kod betyder att vi hämtar datan, fetch, och gör om svaret till ett JS-objekt.
// Om TheMealDB ger null blir det en tom array.
async function fetchMeals() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.meals || [];
}

// Koden betyder att jag har skrivit de 5 första namnen i alfabetisk ordning så som vi skulle göra.
function printFirstFiveAlphabetical(meals) {
    const firstFiveNames = [...meals]
        .sort((a, b) => a.strMeal.localeCompare(b.strMeal))
        .slice(0, 5)
        .map(m => m.strMeal);

    console.log("första fem i A–Ö:");
    console.log(firstFiveNames);
}

// Denna funktion visar en lista med måltider i vald kategori.
function printMealsByCategory(meals, category) {
    const list = meals.filter(
        (meal) => meal.strCategory.toLowerCase() === category.toLowerCase()
    );
    console.log("kategori:", category);
    list.forEach((meal) => console.log(`${meal.strMeal} (${meal.strCategory})`));
}

// Och denna räknar ut hur många måltider det finns per kategori.
function printCountByCategory(meals) {
    const count = meals.reduce((acc, meal) => {
        acc[meal.strCategory] = (acc[meal.strCategory] || 0) + 1;
        return acc;
    }, {});

    console.log(count);
}

// Funktionen startar uppgiften och hämtar måltiderna.
// Sen skriver den ut de 5 första i alfabetisk ordning.
// Sen skriver ut alla i en kategori.
// Och slutligen räknar antalet per kategori.
async function main() {
    const meals = await fetchMeals();
    printFirstFiveAlphabetical(meals);
    printMealsByCategory(meals, "Dessert");
    printCountByCategory(meals);
}

main();
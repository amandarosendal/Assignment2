// Här hämtar vi måltider från API:t jag fick rekommenderat och gör om till JS-objekt.
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Här hämtar vi rätter från API:t och gör då om svaret till JS-objekt.
// Om TheMealDB ger null blir det en tom array.
// async är att jag väntar på svaret innan nästa rad körs.
// res.json() menas med att jag plockar ut datan som objekt.
async function fetchMeals() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.meals || [];
}

// Här tar jag först en kopia av listan så originalet inte blir rört.
// Sen sorterar jag namnen i alfabetisk ordning.
// Sen tar jag de 5 första namnen och loggar rubriken + resultatet i konsolen.
function printFirstFiveAlphabetical(meals) {
    const firstFiveNames = [...meals]
        .sort((a, b) => a.strMeal.localeCompare(b.strMeal))
        .slice(0, 5)
        .map(m => m.strMeal);

    console.log("första fem i A–Ö:");
    console.log(firstFiveNames);
}

// Så, denna funktion visar en lista med måltider i vald kategori.
// Den filtrerar då ut rätter som matchar kategorin.
// Sparar träffarna i 'list' och loggar då den kategori jag sökte på.
// Slutligen då skriver ut varje träff i konsolen som: Namn (Kategori).
function printMealsByCategory(meals, category) {
    const list = meals.filter(
        (meal) => meal.strCategory.toLowerCase() === category.toLowerCase()
    );
    console.log("kategori:", category);
    list.forEach((meal) => console.log(`${meal.strMeal} (${meal.strCategory})`));
}

// Denna funktion räknar ut hur många måltider det finns per kategori.
// Reduce används för att spara räkningen i ett objekt.
// Om kategorin inte finns än börjar den på 0 och då lägger +1 varje gång den dyker upp.
function printCountByCategory(meals) {
    const count = meals.reduce((acc, meal) => {
        acc[meal.strCategory] = (acc[meal.strCategory] || 0) + 1;
        return acc;
    }, {});

    console.log(count);
}

// Här startar allt och måltiderna hämtas med await (jag väntar på svaret).
// Sedan skriver jag ut de 5 första i alfabetisk ordning.
// Sedan skriver jag ut alla i en kategori.
// Till sist räknar jag hur många per kategori.
// Allt loggas i konsolen.
const CATEGORY = "Dessert";
async function main() {
    const meals = await fetchMeals();
    printFirstFiveAlphabetical(meals);
    printMealsByCategory(meals, CATEGORY);
    printCountByCategory(meals);
}
main();

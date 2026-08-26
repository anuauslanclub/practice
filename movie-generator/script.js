const sentences = [
  "Toy Story",
  "Jaws",
  "Home Alone",
  "Shrek",
  "Titanic",
  "Twilight",
  "Monsters Inc.",
  "The Incredibles",
  "Willy Wonka and the Chocolate Factory",
  "Ratatouille",
  "Aladdin",
  "Sleeping Beauty",
  "Snow White and the Seven Dwarfs",
  "Mulan",
  "Beauty & the Beast",
  "Cinderella",
  "High School Musical",
  "The Little Mermaid",
  "The Princess Bride",
  "Avatar",
  "The Wizard of Oz",
  "Jurassic Park",
  "Back to the Future",
  "The Sound of Music",
  "Inside Out",
  "Zootopia",
  "WALL-E",
  "Up",
  "Finding Nemo",
  "How to Train Your Dragon",
  "KPop Demon Hunters",
  "Shrek 2",
  "Tangled",
  "Frozen",
  "Despicable Me",
  "Lilo & Stitch",
  "Kung Fu Panda",
  "Ice Age",
  "Chicken Run",
  "The Jungle Book",
  "Megamind",
  "Ferris Bueller's Day Off",
  "The Princess and the Frog",
  "Hotel Transylvania",
  "The Cat in the Hat",
  "The Muppet Movie",
  "Alice in Wonderland",
  "Matilda",
  "Mary Poppins",
  "Cars",
  "The Parent Trap",
  "Alvin and the Chipmunks",
  "101 Dalmatians",
  "Brave",
  "Paddington",
  "Peter Pan",
  "Night at the Museum",
  "Stuart Little",
  "Ella Enchanted",
  "Spy Kids",
  "Freaky Friday",
  "Groundhog Day",
  "The Hunger Games",
  "The Fault in Our Stars",
  "Little Women",
  "Mean Girls",
  "Legally Blonde",
  "Wicked",
  "Madagascar"
];

const btn = document.getElementById("generator");

var index = 0;

let shuffled = sentences
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

btn.addEventListener("click", function () {
  const randomElement = shuffled[index];
  if (index == shuffled.length - 1) {
    index = 0;
  } else {
    index++;
  }
  document.getElementById("sentence").innerHTML = randomElement;
});

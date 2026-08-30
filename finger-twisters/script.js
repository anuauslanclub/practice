const sentences = [
  "I’ve told hundreds of boys about lunch in Melbourne.",
  "Jesus is responsible for the puritan internet.",
  "Golden paper makes my brother run to his partner’s appointment.",
  "I’ll try to find the pink lollies, but it won’t be easy.",
  "I should be planning and preparing at the office now, but instead they’ve decided to postpone!",
  "The cute lesbian with a nice smile tells lies to boys in Dublin",
  "My sister <i>can</i> sneeze at young people!"
];

const btn = document.getElementById("dna-icon");

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

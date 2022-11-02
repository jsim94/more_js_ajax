const BASE_URL = "https://deckofcardsapi.com/api/deck";
const PILE = $("#pile");

function logCards(cards) {
  for (const card of cards) {
    console.log(`${card.value} of ${card.suit}`);
  }
}

// 1)
async function one() {
  let res = await axios.get(`${BASE_URL}/new/draw`);
  console.log("1)");
  logCards(res.data.cards);
}

// 2)
async function two() {
  const cards = [];
  let res = await axios.get(`${BASE_URL}/new/draw`);
  res.data.cards.forEach((card) => {
    cards.push(card);
  });
  res = await axios.get(`${BASE_URL}/${res.data.deck_id}/draw`);
  res.data.cards.forEach((card) => {
    cards.push(card);
  });
  console.log("2)");
  logCards(cards);
}

// 3)
const deck = {
  init: async () => {
    res = await axios.get(`${BASE_URL}/new/shuffle`);
    this.deckId = res.data.deck_id;
  },
  draw: async (count) => {
    res = await axios.get(`${BASE_URL}/${this.deckId}/draw?count=${count}`);
    return res.data.cards;
  },
  reshuffle: async () => {
    await axios.get(`${BASE_URL}/${this.deckId}/shuffle`);
  },
};

async function drawCard() {
  function randomCords() {
    this.x = Math.random() * 25;
    this.y = Math.random() * 25;
    this.angle = Math.random() * 360;
  }

  cards = await deck.draw(1);
  cards.forEach((card) => {
    cords = new randomCords();
    $("<img>", {
      src: card.image,
      class: "game-card",
      style: `
        transform: translate(${cords.x}px, ${cords.y}px) rotate(${cords.angle}deg);
        `,
    }).appendTo(PILE);
  });
}

async function shuffle() {
  PILE.empty();
  deck.reshuffle();
}

function start() {
  one();
  two();
  deck.init();
}

$(document).ready(start);
$("#draw").on("click", drawCard);
$("#reshuffle").on("click", shuffle);

const BASE_URL = "https://deckofcardsapi.com/api/deck";
const PILE = $("#pile");

function logCards(cards) {
  for (const card of cards) {
    console.log(`${card.value} of ${card.suit}`);
  }
}

// 1)
axios.get(`${BASE_URL}/new/draw`).then((res) => {
  console.log("1)");
  logCards(res.data.cards);
});

// 2)
const cards = [];
axios
  .get(`${BASE_URL}/new/draw`)
  .then((res) => {
    res.data.cards.forEach((card) => {
      cards.push(card);
    });
    return axios.get(`${BASE_URL}/${res.data.deck_id}/draw`);
  })
  .then((res) => {
    console.log("2)");
    res.data.cards.forEach((card) => {
      cards.push(card);
    });
    logCards(cards);
  });

// 3)
const deck = {
  init: () => {
    axios.get(`${BASE_URL}/new/shuffle`).then((res) => {
      this.deckId = res.data.deck_id;
    });
  },
  draw: (count) => {
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/${this.deckId}/draw?count=${count}`).then((res) => {
        resolve(res.data.cards);
      });
    });
  },
  reshuffle: () => {
    axios.get(`${BASE_URL}/${this.deckId}/shuffle`);
  },
};

function drawCard() {
  function randomCords() {
    this.x = Math.random() * 25;
    this.y = Math.random() * 25;
    this.angle = Math.random() * 360 - 180;
  }

  deck.draw(1).then((cards) => {
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
  });
}

function shuffle() {
  deck.reshuffle();
  PILE.empty();
}

$(document).ready(deck.init);
$("#draw").on("click", drawCard);
$("#reshuffle").on("click", shuffle);

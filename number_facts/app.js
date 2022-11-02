function displayLine(line) {
  const el = document.createElement("p");
  el.innerHTML = line;
  document.body.appendChild(el);
}

function displayAllTrivia(data) {
  for (const line in data) {
    displayLine(`${data[line]}`);
  }
}
// 1)
async function one() {
  res1 = await axios.get("http://numbersapi.com/1?json");
  displayLine(res1.data.text);
}
// 2)
async function two() {
  res2 = await axios.get("http://numbersapi.com/1..10?json");
  displayLine("2)");
  displayAllTrivia(res2.data);
}
// 3)
async function three() {
  lines = await Promise.all(
    Array.from({ length: 4 }, () => {
      return axios.get(`http://numbersapi.com/12?json`);
    })
  );
  displayLine("3)");
  lines.forEach((line) => {
    displayLine(line.data.text);
  });
}

one();
two();
three();

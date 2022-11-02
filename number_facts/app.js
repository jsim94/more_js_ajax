function displayLine(line) {
  const el = document.createElement("p");
  el.innerHTML = line;
  document.body.appendChild(el);
  console.log(el);
}

function displayAllTrivia(data) {
  console.log(data);
  for (const line in data) {
    displayLine(`${data[line]}`);
  }
}
// 1)
axios.get("http://numbersapi.com/1?json").then((res) => {
  displayLine("1)");
  displayLine(res.data.text);
});
// 2)
axios.get("http://numbersapi.com/1..10?json").then((res) => {
  displayLine("2)");
  displayAllTrivia(res.data);
});
// 3)
Promise.all(
  Array.from({ length: 4 }, () => {
    return axios.get(`http://numbersapi.com/1?json`);
  })
).then((lines) => {
  displayLine("3)");
  lines.forEach((line) => {
    console.log(line.data.text);
    displayLine(line.data.text);
  });
});

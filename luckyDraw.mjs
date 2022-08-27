function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

/*luckyDraw("Joe")
  .then((data) => console.log(data))
  .then(() => luckyDraw("Caroline"))
  .then((data) => console.log(data))
  .then(() => luckyDraw("Sabrina"))
  .then((data) => console.log(data))
  .catch((error) => console.error(error));*/

async function getResults() {
  try {
    const data = await luckyDraw("Joe");
    console.log("data:", data);

    const data1 = await luckyDraw("Caroline");
    console.log("data:", data1);

    const data2 = await luckyDraw("Sabrina");
    console.log("data:", data2);
  } catch (error) {
    console.error(error);
  }
}

console.log(getResults());

const form = document.getElementById("waterForm");
const resultDisplay = document.getElementById("result");
 
function animarContagem(finalValue, duration = 1500) {
  let start = null;
 
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    let current = (progress / duration) * finalValue;
 
    if (current > finalValue) current = finalValue;
 
    resultDisplay.textContent = `${current.toFixed(2)} L`;
 
    if (progress < duration) {
      requestAnimationFrame(step);
    }
  }
 
  requestAnimationFrame(step);
}
 
form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const temperature = parseFloat(form.temperature.value);
  const humidity = parseFloat(form.humidity.value);
  const pressure = parseFloat(form.pressure.value);
  const windSpeed = parseFloat(form.windSpeed.value);
 
  const dados = {
    Temperatura: temperature,
    Umidade: humidity,
    Pressao: pressure,
    Velocidade_Vento: windSpeed,
  };
 
  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        resultDisplay.textContent = "Erro: " + data.error;
      } else {
        const litros = data["Quantidade de água captada em Litros"];
        animarContagem(litros);
      }
    })
    .catch((error) => {
      resultDisplay.textContent = "Erro na requisição: " + error;
    });
});
let step = 0;

const steps = [
  { text: "🌞 Freunde, Die Urlaubsplanung steht an 🌍", buttons: ["Los geht’s!"] },
  { text: "Wer ist dabei? 😎", buttons: ["Alle! Natürlich!", "Ich bin dabei"] },
  { text: "Wann könnten wir gehen?", buttons: ["Pfingstferien KW22+23", "Nach Pfingsten KW24+25", "Vor den Sommerferien KW29+30", "Sommerferien", "Nach Sommerferien"] },
  { text: "Bitte mal überlegen, Abstimmung kommt", buttons: ["Weiter"] },
  { text: "Wo soll’s hingehen? 🌍", type: "continent" },
  { text: "Perfekt! Dann sehen wir uns am Flughafen 😂", buttons: ["Nochmal 🔁"] }
];

function showStep() {
  const msg = document.getElementById("message");

  if (steps[step].type === "continent") {
    msg.innerHTML = `
      <h1>${steps[step].text}</h1>
      <div class="world-map fade-in">
        <div class="continent north-america"><button onclick="chooseContinent('Nordamerika')">Nordamerika</button></div>
        <div class="continent south-america"><button onclick="chooseContinent('Südamerika')">Südamerika</button></div>
        <div class="continent europe"><button onclick="chooseContinent('Europa')">Europa</button></div>
        <div class="continent africa"><button onclick="chooseContinent('Afrika')">Afrika</button></div>
        <div class="continent asia"><button onclick="chooseContinent('Asien')">Asien</button></div>
        <div class="continent australia"><button onclick="chooseContinent('Australien')">Australien</button></div>
      </div>
    `;
  } else {
    msg.innerHTML = `
      <h1>${steps[step].text}</h1>
      <div class="buttons">
        ${steps[step].buttons.map(b => `<button onclick="nextStep('${b}')">${b}</button>`).join("")}
      </div>
    `;
  }
  msg.classList.add("fade-in");
}

function nextStep(choice) {
  if (step === 0 && choice === "Los geht’s!") step = 1;
  else if (step === 1 && choice === "Alle! Natürlich!") step = 2;
  else if (step === 1 && choice === "Ich bin raus 😅") step = 5;
  else if (step === 2) step = 3; // nach Zeitwahl weiter
  else if (step === 3) step = 4;
  else if (step === 5 && choice === "Nochmal 🔁") step = 0;
  showStep();
}

function skip() {
  step = 5;
  showStep();
}

function chooseContinent(continent) {
  const msg = document.getElementById("message");

  switch(continent) {
    case "Asien":
      msg.innerHTML = `<h1>Laura sagt nein 😅</h1><div class="buttons"><button onclick="showStep()">Zurück</button></div>`;
      break;
    case "Australien":
    case "Nordamerika":
      msg.innerHTML = `<h1>Zu teuer 💸</h1><div class="buttons"><button onclick="showStep()">Zurück</button></div>`;
      break;
    case "Afrika":
      msg.innerHTML = `
        <h1>Aha, Safari / Lodge oder All-In oder unser Standard Strandurlaub? 🏝️</h1>
        <div class="buttons">
          <button onclick="nextStep('Safari')">Safari / Lodge</button>
          <button onclick="nextStep('All-In')">All-In</button>
          <button onclick="nextStep('Strand')">Strand</button>
        </div>`;
      break;
    case "Europa":
      msg.innerHTML = `
        <h1>Dann bleiben wir in Europa 🇪🇺</h1>
        <div class="buttons">
          <button onclick="nextStep('Albanien')">Albanien</button>
          <button onclick="nextStep('Zypern')">Zypern</button>
          <button onclick="nextStep('Montenegro')">Montenegro</button>
        </div>`;
      break;
    case "Südamerika":
      msg.innerHTML = `<h1>Nein 😂</h1><div class="buttons"><button onclick="showStep()">Zurück</button></div>`;
      break;
  }
}

document.addEventListener("DOMContentLoaded", showStep);

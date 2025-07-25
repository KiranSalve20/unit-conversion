function filterConverters() {
  const input = document.getElementById("searchBox").value.toLowerCase();
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  if (input.trim() === "") return;

  const matches = converterSections.filter(section =>
    section.name.toLowerCase().includes(input)
  );

  matches.forEach(section => {
    const div = document.createElement("div");
    div.textContent = section.name;
    div.onclick = () => {
      showTab(section.id);
      results.innerHTML = "";
      document.getElementById("searchBox").value = "";
    };
    results.appendChild(div);
  });

  if (matches.length === 0) {
    results.innerHTML = "<div>No matches found.</div>";
  }
}

function showTab(id) {
  const sections = document.querySelectorAll('main section');
  const buttons = document.querySelectorAll('nav button');
  sections.forEach(section => section.classList.remove('active'));
  buttons.forEach(button => button.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`nav button[onclick="showTab('${id}')"]`).classList.add('active');
}

// Length
function convertLength() {
  const value = parseFloat(document.getElementById('lengthValue').value);
  const from = document.getElementById('lengthFrom').value;
  const to = document.getElementById('lengthTo').value;

  // Conversion factors to meters
  const toMeters = {
    mm: 0.001,
    cm: 0.01,
    dm: 0.1,
    m: 1,
    dam: 10,
    hm: 100,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
  };

  if (!value || isNaN(value)) {
    document.getElementById('lengthResult').innerText = "Please enter a valid number.";
    return;
  }

  if (!(from in toMeters) || !(to in toMeters)) {
    document.getElementById('lengthResult').innerText = "Invalid unit selection.";
    return;
  }

  const result = (value * toMeters[from]) / toMeters[to];
  document.getElementById('lengthResult').innerText = `Result: ${result}`;
}

// Weight
function convertWeight() {
  const value = parseFloat(document.getElementById('weightValue').value);
  const from = document.getElementById('weightFrom').value;
  const to = document.getElementById('weightTo').value;
  const factors = {
    kilograms: 1,
    pounds: 0.453592,
    grams: 0.001
  };
  const result = (value * factors[from]) / factors[to];
  document.getElementById('weightResult').innerText = `Result: ${result}`;
}

// Temperature
function convertTemperature() {
  const value = parseFloat(document.getElementById('tempValue').value);
  const from = document.getElementById('tempFrom').value;
  const to = document.getElementById('tempTo').value;
  let celsius;

  if (from === 'C') celsius = value;
  else if (from === 'F') celsius = (value - 32) * 5 / 9;
  else if (from === 'K') celsius = value - 273.15;

  let result;
  if (to === 'C') result = celsius;
  else if (to === 'F') result = (celsius * 9 / 5) + 32;
  else if (to === 'K') result = celsius + 273.15;

  document.getElementById('tempResult').innerText = `Result: ${result}`;
}

// Area
function convertArea() {
  const value = parseFloat(document.getElementById('areaValue').value);
  const from = document.getElementById('areaFrom').value;
  const to = document.getElementById('areaTo').value;

  // Conversion factors to square meters
  const toSquareMeters = {
    sqm: 1,
    sqft: 0.092903,
    acres: 4046.8564224,
    sqin: 0.00064516,
    ha: 10000,
    sqmi: 2_589_988.110336
  };

  if (!value || isNaN(value)) {
    document.getElementById('areaResult').innerText = "Please enter a valid number.";
    return;
  }

  if (!(from in toSquareMeters) || !(to in toSquareMeters)) {
    document.getElementById('areaResult').innerText = "Invalid unit selection.";
    return;
  }

  const result = (value * toSquareMeters[from]) / toSquareMeters[to];
  document.getElementById('areaResult').innerText = `Result: ${result.toFixed(6)}`;
}

// Volume
function convertVolume() {
  const value = parseFloat(document.getElementById('volumeValue').value);
  const from = document.getElementById('volumeFrom').value;
  const to = document.getElementById('volumeTo').value;

  // Conversion factors to liters
  const toLiters = {
    liters: 1,
    milliliters: 0.001,
    gallons: 3.78541,
    cubic_meters: 1000
  };

  if (!value || isNaN(value)) {
    document.getElementById('volumeResult').innerText = "Please enter a valid number.";
    return;
  }

  if (!(from in toLiters) || !(to in toLiters)) {
    document.getElementById('volumeResult').innerText = "Invalid unit selection.";
    return;
  }

  const result = (value * toLiters[from]) / toLiters[to];
  document.getElementById('volumeResult').innerText = `Result: ${result.toFixed(6)}`;
}

// Time
function convertTime() {
  const value = parseFloat(document.getElementById('timeValue').value);
  const from = document.getElementById('timeFrom').value;
  const to = document.getElementById('timeTo').value;

  // Conversion factors to seconds
  const toSeconds = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    years: 31536000 // assuming non-leap year (365 days)
  };

  if (!value || isNaN(value)) {
    document.getElementById('timeResult').innerText = "Please enter a valid number.";
    return;
  }

  if (!(from in toSeconds) || !(to in toSeconds)) {
    document.getElementById('timeResult').innerText = "Invalid unit selection.";
    return;
  }

  const result = (value * toSeconds[from]) / toSeconds[to];
  document.getElementById('timeResult').innerText = `Result: ${result.toFixed(6)}`;
}
function convertTrig() {
  const value = parseFloat(document.getElementById('trigValue').value);
  const from = document.getElementById('trigFrom').value;
  const to = document.getElementById('trigTo').value;
  const conversions = {
    degrees: { radians: Math.PI / 180, gradians: 10 / 9 },
    radians: { degrees: 180 / Math.PI, gradians: 200 / Math.PI },
    gradians: { degrees: 0.9, radians: Math.PI / 200 }
  };
  let result = value;
  if (from !== to) result = value * conversions[from][to];
  document.getElementById('trigResult').innerText = `Result: ${result}`;
}
function convertLog() {
  const x = parseFloat(document.getElementById('logValue').value);
  const a = parseFloat(document.getElementById('logBase').value);
  const result = Math.log(x) / Math.log(a);
  document.getElementById('logResult').innerText = `Result: ${result}`;
}
function convertExp() {
  const base = parseFloat(document.getElementById('expBase').value);
  const exponent = parseFloat(document.getElementById('expPower').value);
  const result = Math.pow(base, exponent);
  document.getElementById('expResult').innerText = `Result: ${result}`;
}
function convertSI() {
  const value = parseFloat(document.getElementById('siValue').value);
  const from = parseFloat(document.getElementById('siFrom').value);
  const to = parseFloat(document.getElementById('siTo').value);
  const result = (value * from) / to;
  document.getElementById('siResult').innerText = `Result: ${result}`;
}
function fractionToOthers() {
  const input = document.getElementById('fractionInput').value;
  const [num, denom] = input.split('/').map(Number);
  if (isNaN(num) || isNaN(denom) || denom === 0) {
    document.getElementById('fractionOutput').innerText = "Invalid fraction.";
    return;
  }
  const decimal = num / denom;
  const percent = decimal * 100;
  document.getElementById('fractionOutput').innerText = `Decimal: ${decimal}, Percentage: ${percent}%`;
}

function decimalToOthers() {
  const dec = parseFloat(document.getElementById('decimalInput').value);
  document.getElementById('decimalOutput').innerText = `Percentage: ${dec * 100}%, Fraction: ${dec.toFixed(2)}`;
}

function percentToOthers() {
  const percent = parseFloat(document.getElementById('percentInput').value);
  const decimal = percent / 100;
  document.getElementById('percentOutput').innerText = `Decimal: ${decimal}, Fraction: ${decimal.toFixed(2)}`;
}
function convertRatio() {
  const input = document.getElementById('ratioInput').value.trim();
  const ratioType = document.querySelector('input[name="ratioType"]:checked').value;
  const outputDiv = document.getElementById('ratioOutput');

  if (!input.includes(':')) {
    outputDiv.innerText = "Please enter a ratio in the format a:b";
    return;
  }

  const parts = input.split(':').map(x => parseFloat(x));

  if (parts.length !== 2 || parts.some(isNaN)) {
    outputDiv.innerText = "Please enter a valid numeric ratio like 2:3";
    return;
  }

  const [a, b] = parts;

  if (ratioType === "partToPart") {
    // Show ratio as fraction and decimal
    outputDiv.innerHTML = `
      Part-to-Part Ratio:<br>
      ${a} : ${b} <br>
      Fraction: ${a}/${b} ≈ ${(a / b).toFixed(6)} <br>
      Decimal: ${(a / b).toFixed(6)}
    `;
  } else if (ratioType === "partToWhole") {
    const total = a + b;
    outputDiv.innerHTML = `
      Part-to-Whole Ratio:<br>
      Total: ${total} <br>
      Part 1: ${a} (${((a / total) * 100).toFixed(2)}%) <br>
      Part 2: ${b} (${((b / total) * 100).toFixed(2)}%)
    `;
  }
}
function polarToCartesian() {
  const r = parseFloat(document.getElementById('polarR').value);
  const thetaDeg = parseFloat(document.getElementById('polarTheta').value);
  const thetaRad = thetaDeg * (Math.PI / 180);

  const x = r * Math.cos(thetaRad);
  const y = r * Math.sin(thetaRad);

  document.getElementById('cartesianResult2D').innerText = `x = ${x.toFixed(6)}, y = ${y.toFixed(6)}`;
}
function cartesianToPolar() {
  const x = parseFloat(document.getElementById('cartesianX').value);
  const y = parseFloat(document.getElementById('cartesianY').value);

  const r = Math.sqrt(x ** 2 + y ** 2);
  const thetaDeg = Math.atan2(y, x) * (180 / Math.PI);

  document.getElementById('polarResult2D').innerText = `r = ${r.toFixed(6)}, θ = ${thetaDeg.toFixed(6)}°`;
}
function sphericalToCartesian() {
  const rho = parseFloat(document.getElementById('sphericalRho').value);
  const thetaDeg = parseFloat(document.getElementById('sphericalTheta').value);
  const phiDeg = parseFloat(document.getElementById('sphericalPhi').value);

  const thetaRad = thetaDeg * (Math.PI / 180);
  const phiRad = phiDeg * (Math.PI / 180);

  const x = rho * Math.sin(phiRad) * Math.cos(thetaRad);
  const y = rho * Math.sin(phiRad) * Math.sin(thetaRad);
  const z = rho * Math.cos(phiRad);

  document.getElementById('cartesianResult3D').innerText =
    `x = ${x.toFixed(6)}, y = ${y.toFixed(6)}, z = ${z.toFixed(6)}`;
}
function cartesianToSpherical() {
  const x = parseFloat(document.getElementById('rectX').value);
  const y = parseFloat(document.getElementById('rectY').value);
  const z = parseFloat(document.getElementById('rectZ').value);

  const rho = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const thetaDeg = Math.atan2(y, x) * (180 / Math.PI);
  const phiDeg = Math.acos(z / rho) * (180 / Math.PI);

  document.getElementById('sphericalResult3D').innerText =
    `ρ = ${rho.toFixed(6)}, θ = ${thetaDeg.toFixed(6)}°, φ = ${phiDeg.toFixed(6)}°`;
}
function convertMass() {
  const value = parseFloat(document.getElementById('massValue').value);
  const from = document.getElementById('massFrom').value;
  const to = document.getElementById('massTo').value;
  const factors = { mg: 0.001, g: 1, kg: 1000, lb: 453.592 };
  const result = (value * factors[from]) / factors[to];
  document.getElementById('massResult').innerText = `Result: ${result}`;
}
function convertForce() {
  const value = parseFloat(document.getElementById('forceValue').value);
  const from = document.getElementById('forceFrom').value;
  const to = document.getElementById('forceTo').value;
  const factors = { N: 1, dyne: 0.00001 };
  const result = (value * factors[from]) / factors[to];
  document.getElementById('forceResult').innerText = `Result: ${result}`;
}
function convertPressure() {
  const value = parseFloat(document.getElementById('pressureValue').value);
  const from = document.getElementById('pressureFrom').value;
  const to = document.getElementById('pressureTo').value;

  if (isNaN(value)) {
    document.getElementById('pressureResult').innerText = "Please enter a valid number.";
    return;
  }
 const toPascal = {
    Pa: 1,
    bar: 100000,
    atm: 101325,
    mmHg: 133.322,
    torr: 133.322
  };
 if (!(from in toPascal) || !(to in toPascal)) {
    document.getElementById('pressureResult').innerText = "Invalid unit selection.";
    return;
  }

  const result = (value * toPascal[from]) / toPascal[to];
  document.getElementById('pressureResult').innerText = `Result: ${result.toFixed(6)} ${to}`;
}
function convertEnergy() {
  const value = parseFloat(document.getElementById('energyValue').value);
  const from = document.getElementById('energyFrom').value;
  const to = document.getElementById('energyTo').value;

  if (isNaN(value)) {
    document.getElementById('energyResult').innerText = "Please enter a valid number.";
    return;
  }
const toJoule = {
    J: 1,
    kJ: 1000,
    cal: 4.184,
    kcal: 4184,
    eV: 1.60218e-19
  };
if (!(from in toJoule) || !(to in toJoule)) {
    document.getElementById('energyResult').innerText = "Invalid unit selection.";
    return;
  }
  const result = (value * toJoule[from]) / toJoule[to];
  document.getElementById('energyResult').innerText = `Result: ${result.toExponential(6)} ${to}`;
}
function convertPower() {
  const value = parseFloat(document.getElementById('powerValue').value);
  const from = document.getElementById('powerFrom').value;
  const to = document.getElementById('powerTo').value;
  const factors = { W: 1, hp: 745.7 };
  const result = (value * factors[from]) / factors[to];
  document.getElementById('powerResult').innerText = `Result: ${result}`;
}
function convertMagnetism() {
  const value = parseFloat(document.getElementById('magnetismValue').value);
  const from = document.getElementById('magnetismFrom').value;
  const to = document.getElementById('magnetismTo').value;
  const factors = { tesla: 1, gauss: 1e-4 };
  const result = (value * factors[from]) / factors[to];
  document.getElementById('magnetismResult').innerText = `Result: ${result}`;
}
function convertTorque() {
  const value = parseFloat(document.getElementById('torqueValue').value);
  const from = document.getElementById('torqueFrom').value;
  const to = document.getElementById('torqueTo').value;
  if (isNaN(value)) {
    document.getElementById('torqueResult').innerText = "Please enter a valid number.";
    return;
  }
const toNm = {
    Nm: 1,
    Ncm: 0.01,
    lbft: 1.35582,
    dyne: 1e-7,
    dynecm: 1e-9
  };
  if (!(from in toNm) || !(to in toNm)) {
    document.getElementById('torqueResult').innerText = "Invalid unit selection.";
    return;
  }

  const result = (value * toNm[from]) / toNm[to];
  document.getElementById('torqueResult').innerText = `Result: ${result.toExponential(6)} ${to}`;
}

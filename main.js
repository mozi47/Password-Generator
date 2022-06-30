"use strict";

const funcObj = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const passlength = document.getElementById("passlen");
const result = document.querySelector(".result");
const passvalue = document.querySelector("label");

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");

const clipboardEl = document.getElementById("clipboard");
const generatePassEl = document.getElementById("genpass");

clipboardEl.addEventListener("click", () => {
  if (result.innerText == "") return;

  const textarea = document.createElement("textarea");
  textarea.value = result.innerText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  //notification popup
  const notify = document.createElement("div");
  notify.innerHTML = `
  <span>Password Copied</span>
  <i class="fa-solid fa-circle-check"></i>
  `;
  notify.classList.add("notify");
  document.body.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 2500);
});

passlength.addEventListener(
  "click",
  () => (passvalue.innerText = passlength.value)
);

generatePassEl.addEventListener("click", () => {
  result.innerText = generatePassword(
    lowercaseEl.checked,
    uppercaseEl.checked,
    numberEl.checked,
    symbolEl.checked,
    passlength.value
  );
});

function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

function getRandomSymbol() {
  const symbols = "!@#$%&*";
  return symbols[Math.floor(Math.random() * 7)];
}

function generatePassword(lower, upper, number, symbol, passlen) {
  const checkcount = lower + upper + number + symbol;
  const objArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (passlen < 5) return "";

  let genPass = "";

  for (let i = 0; i < passlen; i += checkcount) {
    objArr.forEach((val) => {
      let fun_name = Object.keys(val)[0];
      genPass += funcObj[fun_name]();
    });
  }

  let finalPass = genPass.slice(0, passlen);
  return finalPass;
}

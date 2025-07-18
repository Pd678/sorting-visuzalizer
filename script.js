let array = [];
let speed = 150;

const barsContainer = document.getElementById("bars-container");
const arraySize = document.getElementById("arraySize");
const speedInput = document.getElementById("speed");

speedInput.addEventListener("input", () => {
  speed = parseInt(speedInput.value);
});

function generateArray() {
  array = [];
  barsContainer.innerHTML = "";
  let size = arraySize.value;

  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 150) + 20; // Smaller numbers
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 2 + "px"; // Scaled for visibility
    bar.style.width = `${600 / size}px`;

    const barValue = document.createElement("span");
    barValue.innerText = value;
    barValue.classList.add("bar-text");

    bar.appendChild(barValue);
    barsContainer.appendChild(bar);
  }
}

async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";
      if (array[j] > array[j + 1]) {
        await swap(bars[j], bars[j + 1]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      bars[j].style.background = "#007bff";
      bars[j + 1].style.background = "#007bff";
    }
  }
}

async function selectionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[minIndex].style.background = "green";
      bars[j].style.background = "red";
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.background = "#007bff";
        minIndex = j;
      }
      await delay();
      bars[j].style.background = "#007bff";
    }
    if (minIndex !== i) {
      await swap(bars[i], bars[minIndex]);
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    bars[minIndex].style.background = "#007bff";
  }
}

async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.background = "green";
    while (j >= 0 && array[j] > key) {
      bars[j].style.background = "red";
      await swap(bars[j + 1], bars[j]);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    bars[i].style.background = "#007bff";
  }
}

async function swap(bar1, bar2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tempHeight = bar1.style.height;
      bar1.style.height = bar2.style.height;
      bar2.style.height = tempHeight;

      let tempText = bar1.querySelector(".bar-text").innerText;
      bar1.querySelector(".bar-text").innerText = bar2.querySelector(".bar-text").innerText;
      bar2.querySelector(".bar-text").innerText = tempText;

      resolve();
    }, speed);
  });
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, speed));
}

function showComplexity(algorithm) {
  document.getElementById("algo-name").innerText = "Algorithm: " + algorithm;

  if (algorithm === "Bubble Sort" || algorithm === "Insertion Sort" || algorithm === "Selection Sort") {
    document.getElementById("best").innerText = "Best Case: O(n)";
    document.getElementById("average").innerText = "Average Case: O(n²)";
    document.getElementById("worst").innerText = "Worst Case: O(n²)";
  }
}

// Generate initial array
generateArray();

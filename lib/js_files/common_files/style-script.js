// Для Loader

const loader = document.querySelector("div.loader");
loader.style.position = "absolute";
loader.style.display = "none";

function loaderEnable() {
  const followElement = loader;

  followElement.style.display = "block";

  followElement.style.left = String(Number(window.event.pageX) + 10) + "px";
  followElement.style.top = String(Number(window.event.pageY) + 10) + "px";
}

function loaderDisable() {
  const followElement = loader;

  followElement.style.display = "none";

  followElement.style.left = String(-100) + "px";
  followElement.style.top = String(-100) + "px";
}

// Для Tooltip

const tooltip = document.querySelector("div.tooltip");
tooltip.style.display = "none";

function tooltipEnable(text) {
  const followElement = tooltip;

  followElement.style.display = "block";

  followElement.style.left = String(Number(window.event.pageX) + 20) + "px";
  followElement.style.top = String(Number(window.event.pageY) + 10) + "px";

  followElement.querySelector("p").textContent = text;

  setTimeout(tooltipDisable, 3000);
}

function tooltipDisable() {
  const followElement = tooltip;

  followElement.style.display = "none";

  followElement.style.left = String(-100) + "px";
  followElement.style.top = String(-100) + "px";

  followElement.querySelector("p").textContent = "";
}

// Общие функции и события

document.body.addEventListener("mousemove", (event) => {
  if (loader.style.display !== "none") {
    loader.style.left = String(Number(event.pageX) + 10) + "px";
    loader.style.top = String(Number(event.pageY) + 10) + "px";
  }

  if (tooltip.style.display !== "none") {
    tooltip.style.left = String(Number(event.pageX) + 20) + "px";
    tooltip.style.top = String(Number(event.pageY) + 10) + "px";
  }
});

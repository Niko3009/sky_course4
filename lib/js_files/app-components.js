// --------------------- МОДУЛЬНЫЕ ОКНА ---------------------
function appWindowsLoad() {
  loadingBlocksForWindows();

  // Вспомогательные переменные
  let windows = {};
  const box = application.window.box;
  const renderBlock = application.window.blocks.render;

  // Окно выбора сложности (стартовое окно)
  windows["select"] = function () {
    const title = "Выбери сложность";
    console.log(title.toUpperCase());

    renderBlock("title", box, { title: title });

    // Блок - выбор сложности
    let selectedDifficulty = 0; // выбранный уровень сложности (по умолчанию 0)

    const optionBlock = document.createElement("div");
    optionBlock.classList.add("selectionBlock");
    box.appendChild(optionBlock);

    const optionBlockBtns = optionBlock.children;
    for (let i = 1; i <= 3; i++) {
      const optionValue = i; // уровень сложности, соответствующий кнопке
      const option = renderBlock("button", optionBlock, {
        name: String(optionValue),
      });
      option.addEventListener("click", () => {
        selectedDifficulty = optionValue;
        for (const button of optionBlockBtns)
          button.classList.remove("selectedOption");
        option.classList.add("selectedOption");
      });
    }

    // Блок - кнопка старт
    button_start = renderBlock("button", box, { name: "Старт" });
    button_start.addEventListener("click", () => {
      if (selectedDifficulty === 0) {
        // если сложность не выбрана, окно даст "сигнал"
        const errorTime = 0.5;
        for (const button of optionBlockBtns)
          button.classList.add("errorOption");
        setTimeout(() => {
          for (const button of optionBlockBtns)
            button.classList.remove("errorOption");
        }, errorTime * 1000);
        return;
      }

      console.log(`Выбрана сложность ${selectedDifficulty}`);
      application.game.difficulty = selectedDifficulty;

      const selectedOptionBtn = optionBlockBtns[selectedDifficulty - 1];
      for (const button of optionBlockBtns)
        button.classList.remove("resultOption");
      selectedOptionBtn.classList.add("resultOption");
    });
  };

  // БЛОКИ ДЛЯ ОКОН
  function loadingBlocksForWindows() {
    // вспомогательная переменная
    let blocksForWindow = {};

    blocksForWindow["title"] = function (container, params) {
      const titleLine = document.createElement("h1");
      titleLine.classList.add("windowTitle");
      container.appendChild(titleLine);

      titleLine.innerHTML = "Заголовок окна"; // default title
      const title = params.title;
      if (typeof title === "string") titleLine.innerHTML = params.title;
      else console.log("Заголовок не передан!");
    };

    blocksForWindow["button"] = function (container, params) {
      const button = document.createElement("button");
      button.classList.add("button");
      container.appendChild(button);

      button.innerHTML = "Кнопка"; // default name
      const name = params.name;
      if (typeof name === "string") button.innerHTML = params.name;
      else console.log("не передан!");

      return button;
    };

    // Перенос списка блоков для окон в приложение
    for (const block of Object.keys(blocksForWindow))
      application.window.blocks.list[block] = blocksForWindow[block];
  }

  // Перенос списка окон в приложение
  for (const window of Object.keys(windows))
    application.window.list[window] = windows[window];
}

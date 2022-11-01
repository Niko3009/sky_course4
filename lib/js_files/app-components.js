// ------------------------- ЭКРАНЫ -------------------------
application.screens.listFilling = function () {
  let screens = {};
  const screenBox = application.screens.box;
  const renderBlock = application.screens.blocks.render;
  const listLoad = {
    // Перенос списка отрисовки в приложение
    screens: function () {
      const localList = screens;
      for (const item of Object.keys(localList))
        application.screens.list[item] = localList[item];
    },
  };

  // Экран игры
  screens["game"] = function () {
    const title = "Игра";
    console.log(title.toUpperCase());

    console.log(``);
    console.log(`Глобальное состояние:`);
    GameInfo = application.functions.getGameInfo();
    
    const difficulty = GameInfo.difficulty; // Сложность
    const involvedCards = GameInfo.cards.involved; // Задействованные карты
    const selectedCards = GameInfo.cards.selected; // Выбранные карты

    // Блок - игральные карты
    const gameBox = document.createElement("div");
    gameBox.classList.add("gameBox");
    screenBox.appendChild(gameBox);

    const deckOfCardsBox = document.createElement("div");
    deckOfCardsBox.classList.add("deckOfCardsBox");
    gameBox.appendChild(deckOfCardsBox);

    for (let cardNumber = 1; cardNumber <= 36; cardNumber++) {
      const cardBox = document.createElement("div");
      cardBox.classList.add("cardBox");
      deckOfCardsBox.appendChild(cardBox);

      const cardImg = document.createElement("img");
      cardImg.classList.add("cardImg");
      cardImg.src = "./lib/img/cards/back.png";
      cardBox.appendChild(cardImg);
    }

    // Блок сообщения
    const message =
      `Сложность: ${difficulty}, <br />` +
      `Задействованные карты: ${involvedCards}, <br />` +
      `Выбранные карты: ${selectedCards}, <br />` +
      `<br />` +
      `(подробности в консоли)`;
    const messageBox = renderBlock("message", screenBox, { message: message });
  };

  listLoad.screens();
};
application.screens.blocks.listFilling = function () {
  let screenBlocks = {};
  const listLoad = {
    // Перенос списка отрисовки в приложение
    screenBlocks: function () {
      const localList = screenBlocks;
      for (const item of Object.keys(localList))
        application.screens.blocks.list[item] = localList[item];
    },
  };

  // Блок сообщения
  screenBlocks["message"] = function (
    container,
    params = { message: `Сообщение` }
  ) {
    const messageDisplay = document.createElement("div");
    messageDisplay.classList.add("SB_message");
    container.appendChild(messageDisplay);

    const messageBox = document.createElement("div");
    messageBox.classList.add("messageBox");
    messageDisplay.appendChild(messageBox);

    const messageLine = document.createElement("p");
    messageBox.appendChild(messageLine);

    const message = params.message;
    if (typeof message === "string") messageLine.innerHTML = message;
    else console.log("Сообщение не передано!");

    return messageDisplay;
  };

  listLoad.screenBlocks();
};

// --------------------- МОДУЛЬНЫЕ ОКНА ---------------------
application.windows.listFilling = function () {
  let windows = {};
  const windowBox = application.windows.box;
  const renderBlock = application.windows.blocks.render;
  const listLoad = {
    // Перенос списка отрисовки в приложение
    windows: function () {
      const localList = windows;
      for (const item of Object.keys(localList))
        application.windows.list[item] = localList[item];
    },
  };

  // Окно выбора сложности
  windows["select"] = function () {
    const title = "Выбери сложность";
    console.log(title.toUpperCase());

    renderBlock("title", windowBox, { title: title });

    // Блок - выбор сложности
    let selectedDifficulty = 0; // выбранный уровень сложности (по умолчанию 0)

    const optionBlock = document.createElement("div");
    optionBlock.classList.add("selectionBlock");
    windowBox.appendChild(optionBlock);

    const optionBlockBtns = optionBlock.children;
    for (let i = 1; i <= 3; i++) {
      const optionValue = i; // уровень сложности
      const option = renderBlock("button", optionBlock, {
        buttonName: String(optionValue),
      });
      option.addEventListener("click", () => {
        selectedDifficulty = optionValue;
        for (const button of optionBlockBtns)
          button.classList.remove("selectedOption");
        option.classList.add("selectedOption");
      });
    }

    // Блок - кнопка старт
    button_start = renderBlock("button", windowBox, { buttonName: "Старт" });
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

      console.log(`Выбрана сложность:`, selectedDifficulty);
      application.state.difficulty = selectedDifficulty;

      const selectedOptionBtn = optionBlockBtns[selectedDifficulty - 1];
      for (const button of optionBlockBtns)
        button.classList.remove("resultOption");
      selectedOptionBtn.classList.add("resultOption");

      application.screens.open("game");
    });
  };

  listLoad.windows();
};
application.windows.blocks.listFilling = function () {
  let windowBlocks = {};
  // const windowBox = application.windows.box;
  const listLoad = {
    // Перенос списка отрисовки в приложение
    windowBlocks: function () {
      const localList = windowBlocks;
      for (const item of Object.keys(localList))
        application.windows.blocks.list[item] = localList[item];
    },
  };

  // Заголовок окна
  windowBlocks["title"] = function (
    container,
    params = { title: "Заголовок окна" }
  ) {
    const titleLine = document.createElement("h1");
    titleLine.classList.add("windowTitle");
    container.appendChild(titleLine);

    const title = params.title;
    if (typeof title === "string") titleLine.innerHTML = title;
    else console.log("Заголовок окна не передан!");
  };

  // Кнопка
  windowBlocks["button"] = function (
    container,
    params = { buttonName: "Кнопка" }
  ) {
    const button = document.createElement("button");
    button.classList.add("windowButton");
    container.appendChild(button);

    const buttonName = params.buttonName;
    if (typeof buttonName === "string") button.innerHTML = buttonName;
    else console.log("Название кнопки не передано!");

    return button;
  };

  listLoad.windowBlocks();
};

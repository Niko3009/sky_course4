//------------------- ДВИЖОК ОТРИСОВКИ -------------------

application = { 
  // ОБЩЕЕ
  selectors: {
    container: document.body.querySelector("#app"), // основной блок приложения
    tabtitle: document.head.querySelector("title"), // тег названия вкладки
  }, 
  launch: function () {
    // Отметка в консоли
    console.log(`\n`, `ЗАПУСК ПРИЛОЖЕНИЯ\n`, `\n`);
    console.log(
      `\n`,
      `Для получения текущей информации об игре, нажмите «z» \n`,
      `\n`
    );

    // Предварительная... 
    application.pre.render(); // отрисовка
    application.pre.loading(); // загрузка данных
    application.pre.setting(); // настройка приложения

    // Запуск
    const startScreenName = "start screen";
    console.log(
      `\n`,
      `―――――――――――――――――― ЭКРАН «${startScreenName.toUpperCase()}» ――――――――――――――――――\n`,
      `\n`
    );
    application.state.screen = startScreenName;

    application.windows.open("select"); // запуск стартового окна
    // application.screens.open("game");
  },
  pre: {
    render: function () {
      application.screens.preRender();
      application.windows.preRender();
    },
    loading: function () {
      // Подгрузка экранов
      application.screens.blocks.listFilling();
      application.screens.listFilling();

      // Подгрузка окон
      application.windows.blocks.listFilling();
      application.windows.listFilling();
    },
    setting: function () {
      // Горячая клавиша для вывода информации
      document.addEventListener("keydown", function (event) {
        if (event.key === "z" || event.key === "я")
          application.functions.getGameInfo();
      });
    },
  },

  state: {
    global: null, //select, game, result
    screen: null,
    window: null,

    difficulty: 0,
    gameTime: 0,
    cards: { involved: null, selected: null },
  },

  // ЭКРАНЫ
  screens: {
    list: [],
    listFilling: function () {},

    // Открытие и закрытие экрана
    open: function (screenName) {
      // Проверка на наличие запрашиваемого экрана
      if (application.screens.list[screenName] === undefined) {
        console.log(
          `❗`,
          `Экрана «${screenName}» в application.screens.list нет`
        );
        return;
      }

      const box = application.screens.box;
      const display = application.screens.display;
      const screenAnimationTime = application.screens.animation.time; // время анимации экрана
      const windowAnimationTime = application.windows.animation.time; // время анимации окна

      // Закрытие текущего экрана и открытие нового (с учетом задержки на анимацию)
      let delay = 0;
      if (application.state.window !== null) {
        application.windows.close();
        delay += windowAnimationTime;
      }
      if (application.state.screen !== null) {
        application.screens.close();
        delay += screenAnimationTime;
      }

      setTimeout(openNewScreen, delay * 1000);

      function openNewScreen() {
        // Отметка в консоли
        console.log(
          `\n`,
          `―――――――――――――――――― ЭКРАН «${screenName.toUpperCase()}» ――――――――――――――――――\n`,
          `\n`
        );

        // Отметка в статусе приложения
        application.state.global = screenName + ` (screen)`;
        application.state.screen = screenName;

        // Отрисовка (рендеринг)
        application.screens.list[screenName](box); // заполнение контентом
        application.functions.hiding.Off(display, screenAnimationTime); // анимация появления
      }
    },
    close: function () {
      const box = application.screens.box;
      const display = application.screens.display;
      const screenAnimationTime = application.screens.animation.time; // время анимации экрана
      const currentScreen = application.state.screen;

      if (currentScreen !== null) {
        // Очистка
        application.functions.hiding.On(display, screenAnimationTime); // анимация скрытия
        setTimeout(() => (box.innerHTML = ""), screenAnimationTime * 1000); // очистка контента

        // Отметка в консоли
        console.log(
          `\n`,
          `Экран «${currentScreen}» закрыт ✅\n`,
          `――――――――――――――――――――――――――――――――――――――――――――――\n`,
          `\n`
        );
        console.log(`\n`, `\n`, `\n`);

        // Отметка в статусе приложения
        application.state.global = null;
        application.state.screen = null;
      }
    },

    // Шаблон для экрана
    box: null, // сам экран (область с контентом)
    display: null, // задний фон (поверх него располагается экран)
    preRender: function () {
      const app = application.selectors.container;

      const display = document.createElement("div");
      display.classList.add("screen_display");
      app.appendChild(display);

      const box = document.createElement("div");
      box.classList.add("screen_box");
      display.appendChild(box);

      application.screens.display = display;
      application.screens.box = box;
    },

    // Блоки для верстки экрана
    blocks: {
      list: [],
      listFilling: function () {},

      render: function (
        blockName,
        container = application.screens.box,
        params = {}
      ) {
        if (application.screens.blocks.list[blockName] === undefined) {
          console.log(
            `❗`,
            `Блока ${blockName} в application.screens.blocks.list нет`
          );
          return;
        }
        if (container === null) {
          console.log(
            `❗`,
            `В body нет поля (контейнера), введенного для ${blockName}`
          );
          return;
        }

        // запускаем функцию верстки блока и сохраняем результат (если он был передан)
        const result = application.screens.blocks.list[blockName](
          container,
          params
        );

        if (result !== undefined) return result;
      },
    },

    //Анимация экрана
    animation: {
      time: 0.5, // время анимации
    },
  },

  // МОДАЛЬНЫЕ ОКНА
  windows: {
    list: [],
    listFilling: function () {},

    // Открытие и закрытие окна
    open: function (windowName) {
      // Проверка на наличие запрашиваемого окна
      if (application.windows.list[windowName] === undefined) {
        console.log(
          `❗`,
          `Окна «${windowName}» в application.windows.list нет !`
        );
        return;
      }

      const box = application.windows.box;
      const display = application.windows.display;
      const windowAnimationTime = application.windows.animation.time; // время анимации окна

      // Закрытие текущего окна и открытие нового (с учетом задержки на анимацию)
      let delay = 0;
      if (application.state.window !== null) {
        application.windows.close();
        delay += windowAnimationTime;
      }

      setTimeout(openNewWindow, delay * 1000);

      function openNewWindow() {
        // Отметка в консоли
        console.log(
          `\n`,
          `··············· МОДАЛЬНОЕ ОКНО «${windowName.toUpperCase()}» ···············\n`,
          `\n`
        );

        // Отрисовка (рендеринг)
        application.windows.list[windowName](box); // заполнение окна контентом
        application.functions.hiding.Off(display, windowAnimationTime); // анимация появления

        // Отметка в статусе приложения
        application.state.global = windowName + ` (window)`;
        application.state.window = windowName;
      }
    },
    close: function () {
      const box = application.windows.box;
      const display = application.windows.display;
      const windowAnimationTime = application.windows.animation.time; // время анимации окна
      const currentWindow = application.state.window;

      if (currentWindow !== null) {
        // Очистка
        application.functions.hiding.On(display, windowAnimationTime); // анимация скрытия
        setTimeout(() => (box.innerHTML = ""), windowAnimationTime * 1000); // очистка контента

        // Отметка в консоли
        console.log(
          `\n`,
          `Модальное окно «${currentWindow}» закрыто \n`,
          `···········································\n`,
          `\n`
        );

        // Отметка в статусе приложения
        application.state.global = application.state.screen + ` (screen)`;
        application.state.window = null;
      }
    },

    // Шаблон для окна
    box: null, // само окно (область с контентом)
    display: null, // задний фон (поверх него располагается окно)
    preRender: function () {
      const app = application.selectors.container;

      const display = document.createElement("div");
      display.classList.add("window_display");
      display.style.display = "none";
      display.style.opacity = "0";
      app.appendChild(display);

      const box = document.createElement("div");
      box.classList.add("window_box");
      display.appendChild(box);

      application.windows.display = display;
      application.windows.box = box;
    },

    // Блоки для верстки окна
    blocks: {
      list: [],
      listFilling: function () {},

      render: function (
        blockName,
        container = application.windows.box,
        params = {}
      ) {
        if (application.windows.blocks.list[blockName] === undefined) {
          console.log(
            `❗`,
            `Блока ${blockName} в application.windows.blocks.list нет`
          );
          return;
        }
        if (container === null) {
          console.log(
            `❗`,
            `В body нет поля (контейнера), введенного для ${blockName}`
          );
          return;
        }

        // запускаем функцию верстки блока и сохраняем результат (если он был передан)
        const result = application.windows.blocks.list[blockName](
          container,
          params
        );

        if (result !== undefined) return result;
      },
    },

    //Анимация окна
    animation: {
      time: 0.5, // время анимации
    },
  },

  // ТАЙМЕРЫ
  timers: {
    list: [],
    start: function (interval_in_seconds, func) {
      application.timers.push(setInterval(func, interval_in_seconds * 1000));
    },
    clearAll: function () {
      application.timers.list.forEach((timer) => clearInterval(timer));
      application.timers.list = [];
    },
  },

  // ДОП. ФУНКЦИИ
  functions: {
    // Скрытие и раскрытие блока
    hiding: {
      // Скрытие блока
      On: function (block, duration) {
        block.style.transition = `all ${duration}s`;
        block.style.opacity = "0";

        setTimeout(() => {
          block.style.removeProperty("transition");

          block.style.display = "none";
        }, duration * 1000);
      },

      // Раскрытие блока
      Off: function (block, duration) {
        block.style.removeProperty("display");

        setTimeout(() => {
          block.style.transition = `all ${duration}s`;
          block.style.removeProperty("opacity");

          setTimeout(() => {
            block.style.removeProperty("transition");
          }, duration * 1000);
        }, 10);
      },
    },
    // Получение информации о глобальном состоянии игры
    getGameInfo: function () {
      console.log(application.state);
      return application.state;
    },
  },
};

//---------------------- СОБЫТИЯ -------------------------

document.addEventListener("DOMContentLoaded", application.launch);

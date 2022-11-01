//------------------- ДВИЖОК ОТРИСОВКИ -------------------

application = {
  // ОБЩЕЕ
  container: document.body.querySelector("#app"), // основной блок приложения
  tabtitle: document.head.querySelector("title"), // тег названия вкладки
  launch: function () {
    // Отметка в консоли
    console.log(
      `\n` +
        `---------------------- ЗАПУСК ПРИЛОЖЕНИЯ ----------------------` +
        `\n\n`
    );

    // Предварительные настройки
    application.window.preparation();

    // Подгрузка данных
    appWindowsLoad();
    // appScreensLoad();

    // Запуск стартового окна
    application.window.open("select");
  },
  game: { difficulty: 0 },

  // МОДАЛЬНОЕ ОКНО
  window: {
    list: [],

    // Открытие модального окна
    open: function (windowName) {
      // Проверка на наличие запрашиваемого окна
      if (application.window.list[windowName] === undefined) {
        console.log(
          `❗`,
          `Окна «${windowName}» в application.window.list нет !`
        );
        return;
      }

      const box = application.window.box;
      const display = application.window.display;
      const transitionTime = application.window.animation.duration; // время анимации окна

      // Отметка в консоли
      console.log(
        `\n` +
          `-------------- МОДАЛЬНОЕ ОКНО «${windowName.toUpperCase()}» ----------------------` +
          `\n\n`
      );

      application.window.list[windowName](box);

      application.functions.hiding.Off(display, transitionTime);
    },

    // Закрытие модального окна
    close: function () {
      const box = application.window.box;
      const display = application.window.display;
      const transitionTime = application.window.animation.duration; // время анимации окна

      application.functions.hiding.On(display, transitionTime);

      setTimeout((box.innerHTML = ""), transitionTime * 1000);
    },

    // Шаблон для окна
    box: null, // само окно (область с контентом)
    display: null, // задний фон (поверх него располагается окно)
    preparation: function () {
      const display = document.createElement("div");
      display.classList.add("window_display");
      display.style.display = "none";
      display.style.opacity = "0";
      application.container.appendChild(display);

      const box = document.createElement("div");
      box.classList.add("window_box");
      display.appendChild(box);

      application.window.display = display;
      application.window.box = box;
    },

    // Блоки для верстки окна
    blocks: {
      list: [],
      render: function (
        blockName,
        container = application.window.box,
        params = {}
      ) {
        if (application.window.blocks.list[blockName] === undefined) {
          console.log(
            `❗`,
            `Блока ${blockName} в application.window.blocks.list нет`
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
        const result = application.window.blocks.list[blockName](
          container,
          params
        );

        if (result !== undefined) return result;
      },
    },

    //Анимация
    animation: { duration: 1.0 },
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

  // ДОП.ФУНКЦИИ
  functions: {
    // Скрытие и раскрытие блока
    hiding: {
      // Скрытие блока
      On: function (block, duration) {
        block.style.transition = `all ${duration}s`;
        block.style.opacity = "0";

        setTimeout(() => {
          block.style.removeProperty("transition");
          block.style.removeProperty("display");
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
  },
};

//---------------------- СОБЫТИЯ -------------------------

document.addEventListener("DOMContentLoaded", application.launch);

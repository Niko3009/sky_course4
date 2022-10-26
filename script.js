//------------------- ДВИЖОК ОТРИСОВКИ -------------------

application = { 
  // ОБЩЕЕ
  container: document.body.querySelector("#app"), // основной блок приложения
  tabtitle: document.head.querySelector("title"), // тег названия вкладки
  launch: function () {
    // appScreensLoad();
    appWindowsLoad();

    application.window.preparation();
    application.window.open("start");
  },

  // МОДАЛЬНОЕ ОКНО
  window: {
    list: [],

    // Открытие модального окна
    open: function (windowName) {
      // Проверка на наличие запрашиваемого окна
      if (application.window.list[windowName] === undefined) {
        console.log(
          `\n\n\n` + `Окна «${windowName}» в application нет !` + `\n\n\n`
        );
        return;
      }

      const box = application.window.box;
      const display = application.window.display;
      const transitionTime = application.window.animation.duration; // время анимации окна

      application.window.list[windowName](box);

      application.functions.hiding.Off(display, transitionTime);
    },

    // Закрытие модального окна
    close: function () {
      const box = application.window.box;
      const display = application.window.display;
      const transitionTime = application.window.animation.duration; // время анимации окна

      application.functions.hiding.On(display, transitionTime);

      setTimeout((box.innerHTML = ""), duration * 1000);
    },

    //Анимация
    animation: { duration: 1.0 },

    // Шаблон под окно
    box: null,
    display: null,
    preparation: function () {
      const display = document.createElement("div");
      display.classList.add("modalWindow_display");
      display.style.display = "none";
      display.style.opacity = "0";

      application.container.appendChild(display);

      const box = document.createElement("div");
      box.classList.add("modalWindow_box");

      display.appendChild(box);

      application.window.display = display;
      application.window.box = box;
    },

    blocks: {
      list: [],
      render: function (blockName, container) {
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

        application.window.blocks.list[blockName](container);
      },
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

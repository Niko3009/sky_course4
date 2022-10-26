//-----------------------ОСНОВНЫЕ ФУНКЦИИ ДЛЯ ШАБЛОНИЗАЦИИ--------------------------------

//ШАБЛОНИЗАТОР (функция для верстки по МАКЕТУ)
function templateEngine(block) {
  //если отправлен пустой шаблон, то шаблонизатор вернет пустой текст
  if (block === undefined || block === null || block === false) {
    return document.createTextNode("");
  }

  //если отправлена строка, цифра или true, то шаблонизатор вернет этот блок в строковой форме
  if (
    typeof block === "string" ||
    typeof block === "number" ||
    block === true
  ) { 
    return document.createTextNode(String(block));
  }

  // если отправлен массив, то шаблонизатор пройдется по всем элементам и
  // во-первых, вызовет шаблонизатор для каждого элемента массива,
  // а во-вторых, добавит элементы в отправленный блок, как узлы, и вернет сформированный фрагмент кода (т.е. список узлов)
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach((contentItem) => {
      const el = templateEngine(contentItem);

      fragment.appendChild(el);
    });

    return fragment;
  }

  // если отправлен просто объект-узел, то создаем его...
  const element = document.createElement(block.block);

  //...добавляем классы...
  []
    .concat(block.cls)
    .filter(Boolean)
    .forEach((className) => element.classList.add(className));

  //...добавляем аттрибуты...
  if (block.attrs) {
    Object.keys(block.attrs).forEach((key) => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  //...вызовем шаблонизатор (чтобы так же обработать контент)...
  element.appendChild(templateEngine(block.content));

  //...и возвращаем готовый узел
  return element;
}

//-----------------------------------------------------------------------------------

function dataDOM_SPA_request({
  container = document.body,
  link = null,
  script_link = null,
}) {
  const file = link.substring(link.lastIndexOf("/") + 1);
  const file_name = file.substring(0, file.lastIndexOf("."));
  console.log(""); //line break
  console.log(`Загрузка контента c файла ${file}...`);

  request({
    url: link,
    onSuccess: requestOnLoad,
    onError: requestOnError,
  });

  loaderEnable();

  // Вспомогательные функции
  //
  function requestOnLoad(data) {
    loaderDisable();

    console.log(""); //line break
    console.log(`Рендеринг данных с файла:`);
    console.log(link);

    pageConstructor(data);

    if (script_link !== null) {
      script_request(script_link);
      // console.log(null);
    }
  }

  function requestOnError(data) {
    loaderDisable();

    console.log(""); //line break
    console.log(`Ошибка загрузки данных!`);

    error = {
      block: "p",
      attrs: {},
      content: `Ошибка загрузки данных!`,
    };

    container.innerHTML = null;
    container.appendChild(templateEngine(error));
  }

  function pageConstructor(data) {
    document.head.querySelector("title").innerHTML = data.title;

    container.innerHTML = null;
    container.appendChild(templateEngine(data.body));

    console.log("Рендеринг завершен успешно");
    console.log(""); //line break
  }

  function script_request(script_link) {
    const script_tag = document.querySelector(`script[src="${script_link}"]`);
    if (script_tag !== null) {
      console.log("Этот скрипт уже есть:");
      console.log(script_tag);
      return;
    }

    const script = {
      block: "script",
      attrs: { src: script_link },
    };

    document.body.appendChild(templateEngine(script));
  }
}

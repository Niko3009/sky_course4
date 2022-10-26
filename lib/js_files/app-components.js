// --------------------- МОДУЛЬНЫЕ ОКНА ---------------------
function appWindowsLoad() {
  blocksLoading();

  // Выбор сложности
  application.window.list["start"] = function () {
    console.log("Выбор сложности");
  };

  // БЛОКИ ДЛЯ ОКОН
  function blocksLoading() {}
}

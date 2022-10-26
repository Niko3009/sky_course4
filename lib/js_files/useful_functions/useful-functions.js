// Функция сбора данных с контролов в блоке parentElement
function controlDataPicking(parentElement) {
  let data = {};

  if (parentElement.tagName === undefined) {
    console.log("");
    console.log(
      "Функция сбора данных с контролов: в функцию отправлен не HTML элемент"
    );
    return data;
  }

  const controls = parentElement.querySelectorAll("input");

  let i = 1;
  controls.forEach((control) => {
    if (control.name !== "") {
      key = control.name;
    } else {
      key = `input_N${i}(${control.type})`;
    }

    const value = control.type === "checkbox" ? control.checked : control.value;

    // console.log(`${key} : ${value}`);

    data[key] = value;
    i++;
  });

  return data;
}

// Конвертация времени
// Отправляешь общее число секунд, возвращает массив минут, часов и дней, а также их остатки.
function conversionSecondsIntoTimeUnits(secondsOverall) {
  const seconds = secondsOverall % 60;

  const minutesOverall = (secondsOverall - seconds) / 60;
  const minutes = minutesOverall % 60;

  const hoursOverall = (minutesOverall - minutes) / 60;
  const hours = hoursOverall % 24;

  const days = (hoursOverall - hours) / 24;

  const array = {
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    overall: {
      seconds: secondsOverall,
      minutes: minutesOverall,
      hours: hoursOverall,
      days: days,
    },
  };

  return array;
}

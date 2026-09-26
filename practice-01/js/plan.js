"use strict";

const totalTasks = 20;
const completedTasks = 11;
const dailyLimit = 6;

let valid = true;

// Проверка totalTasks и completedTasks
if (typeof totalTasks !== "number" || typeof completedTasks !== "number") {
  console.log("Ошибка: количество задач должно быть числом.");
  valid = false;
} else if (!Number.isFinite(totalTasks) || !Number.isFinite(completedTasks)) {
  console.log("Ошибка: недопустимое числовое значение.");
  valid = false;
} else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
  console.log("Ошибка: количество задач должно быть целым числом.");
  valid = false;
} else if (totalTasks < 0 || completedTasks < 0) {
  console.log("Ошибка: количество задач не может быть отрицательным.");
  valid = false;
} else if (totalTasks > 1000) {
  console.log("Ошибка: превышена верхняя граница количества задач.");
  valid = false;
} else if (completedTasks > totalTasks) {
  console.log("Ошибка: некорректное число выполненных задач.");
  valid = false;
}

// Проверка dailyLimit
if (typeof dailyLimit !== "number") {
  console.log("Ошибка: дневная норма задана строкой.");
  valid = false;
} else if (!Number.isFinite(dailyLimit)) {
  console.log("Ошибка: недопустимое значение дневной нормы.");
  valid = false;
} else if (!Number.isInteger(dailyLimit)) {
  console.log("Ошибка: дробной дневной нормы быть не должно.");
  valid = false;
} else if (dailyLimit < 1) {
  console.log("Ошибка: дневная норма должна быть не меньше 1.");
  valid = false;
} else if (dailyLimit > 1000) {
  console.log("Ошибка: превышена верхняя граница нормы.");
  valid = false;
}

// Цикл запускается только при корректных данных
if (valid) {
  let remainingTasks = totalTasks - completedTasks;
  let day = 0;

  if (remainingTasks === 0) {
    console.log("Все задачи уже выполнены.");
    console.log("Потребуется дней: 0");
  } else {
    console.log(`Осталось задач: ${remainingTasks}`);

    while (remainingTasks > 0) {
      day++;

      const tasksToday = Math.min(dailyLimit, remainingTasks);
      remainingTasks -= tasksToday;

      console.log(
        `День ${day}: выполнено ${tasksToday}, осталось ${remainingTasks}`
      );
    }

    console.log(`Потребуется дней: ${day}`);
  }
}
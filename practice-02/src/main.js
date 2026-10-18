
import { demoTasks, variantNumber, variantTasks } from "./data.js";

import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

function printStats(label, tasks) {
  const stats = getTaskStats(tasks);

  console.log(`\n${label}`);
  console.log(
    `Всего: ${stats.total}, выполнено: ${stats.completed}, ` +
    `осталось: ${stats.pending}, прогресс: ${stats.progress.toFixed(1)}%`
  );
}

function printTasks(label, tasks) {
  console.log(`\n${label}`);
  console.table(tasks);
}

function runOperation(label, currentTasks, operation) {
  const result = operation(currentTasks);

  if (!result.ok) {
    console.log(`Ошибка (${label}): ${result.error}`);
    return currentTasks;
  }

  printTasks(label, result.tasks);
  printStats(`Статистика: ${label}`, result.tasks);

  return result.tasks;
}

console.log("ПР2. Демонстрационный сценарий");
console.log("Номер варианта:", variantNumber);

const originalDemoTasks = demoTasks.map((task) => ({ ...task }));
let currentTasks = demoTasks;

printTasks("Исходный общий набор", currentTasks);
printStats("Исходная статистика", currentTasks);
console.log("Невыполненные задачи:", getPendingTasks(currentTasks));
console.log("Названия задач:", getTaskTitles(currentTasks));
console.log("Поиск задачи id=4:", findTaskById(currentTasks, 4));

// 1. Добавление задачи id=20
currentTasks = runOperation(
  "Добавление задачи id=20",
  currentTasks,
  (tasks) => addTask(tasks, 20, "Сдать практическую работу", "high")
);

// 2. Отметить задачу id=4 выполненной
currentTasks = runOperation(
  "Выполнение задачи id=4",
  currentTasks,
  (tasks) => setTaskCompleted(tasks, 4, true)
);

// 3. Переименование задачи id=10
currentTasks = runOperation(
  "Переименование задачи id=10",
  currentTasks,
  (tasks) => renameTask(tasks, 10, "Оформить итоговый README")
);

// 4. Удаление задачи id=7
currentTasks = runOperation(
  "Удаление задачи id=7",
  currentTasks,
  (tasks) => removeTask(tasks, 7)
);

// 5. Обработанная ошибка: повторное добавление id=20
currentTasks = runOperation(
  "Повторное добавление id=20",
  currentTasks,
  (tasks) => addTask(tasks, 20, "Дубликат", "low")
);

console.log(
  "\nИсходный demoTasks не изменился:",
  JSON.stringify(demoTasks) === JSON.stringify(originalDemoTasks)
);

console.log("\nИтоговые id общего набора:", currentTasks.map((task) => task.id));

// Индивидуальный сценарий
console.log(`\n===== Индивидуальный вариант ${variantNumber} =====`);

let variantCurrentTasks = variantTasks;
const originalVariantTasks = variantTasks.map((task) => ({ ...task }));

printTasks("Исходный индивидуальный набор", variantCurrentTasks);
printStats("Исходная статистика варианта", variantCurrentTasks);

// Добавить id=80
variantCurrentTasks = runOperation(
  "Добавление задачи id=80",
  variantCurrentTasks,
  (tasks) => addTask(tasks, 80, "Провести семинар", "high")
);

// Выполнить задачу id=11
variantCurrentTasks = runOperation(
  "Выполнение задачи id=11",
  variantCurrentTasks,
  (tasks) => setTaskCompleted(tasks, 11, true)
);

// Переименовать задачу id=23
variantCurrentTasks = runOperation(
  "Переименование задачи id=23",
  variantCurrentTasks,
  (tasks) => renameTask(tasks, 23, "Подготовить программу и расписание семинара")
);

// Удалить задачу id=37
variantCurrentTasks = runOperation(
  "Удаление задачи id=37",
  variantCurrentTasks,
  (tasks) => removeTask(tasks, 37)
);

// Повторно добавить id=80 — ожидаемая ошибка
variantCurrentTasks = runOperation(
  "Повторное добавление id=80",
  variantCurrentTasks,
  (tasks) => addTask(tasks, 80, "Повторная задача", "medium")
);

console.log(
  "\nИсходный variantTasks не изменился:",
  JSON.stringify(variantTasks) === JSON.stringify(originalVariantTasks)
);

console.log(
  "\nИтоговые id индивидуального набора:",
  variantCurrentTasks.map((task) => task.id)
);

// Дополнительная демонстрация createTask
console.log("\nСоздание отдельной задачи:", createTask(99, "Проверить результат"));


function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;
}

function isValidTitle(title) {
  if (typeof title !== "string") {
    return false;
  }

  const trimmed = title.trim();
  return trimmed.length >= 1 && trimmed.length <= 100;
}

function isValidPriority(priority) {
  return ["low", "medium", "high"].includes(priority);
}

function failure(error) {
  return { ok: false, error };
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return failure("Некорректный идентификатор");
  }

  if (!isValidTitle(title)) {
    return failure("Некорректное название");
  }

  if (!isValidPriority(priority)) {
    return failure("Некорректный приоритет");
  }

  return {
    ok: true,
    task: {
      id,
      title: title.trim(),
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return {
    total,
    completed,
    pending,
    progress: total === 0 ? 0 : (completed / total) * 100,
  };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return failure("Некорректный идентификатор");
  }

  if (tasks.some((task) => task.id === id)) {
    return failure("Задача с таким id уже существует");
  }

  const result = createTask(id, title, priority);

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    tasks: [...tasks, result.task],
  };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return failure("Некорректный идентификатор");
  }

  if (typeof completed !== "boolean") {
    return failure("Статус должен быть boolean");
  }

  if (!tasks.some((task) => task.id === id)) {
    return failure("Задача не найдена");
  }

  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    ),
  };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return failure("Некорректный идентификатор");
  }

  if (!isValidTitle(title)) {
    return failure("Некорректное название");
  }

  if (!tasks.some((task) => task.id === id)) {
    return failure("Задача не найдена");
  }

  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, title: title.trim() } : task
    ),
  };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return failure("Некорректный идентификатор");
  }

  if (!tasks.some((task) => task.id === id)) {
    return failure("Задача не найдена");
  }

  return {
    ok: true,
    tasks: tasks.filter((task) => task.id !== id),
  };
}

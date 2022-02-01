import React, { FormEvent, useEffect, useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    console.log("TASKS", tasks);
  }, [tasks]);

  function handleCreateNewTask(event: FormEvent) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // console.log(newTaskTitle);
    event.preventDefault();

    if (!newTaskTitle.trim()) {
      return;
    }

    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: newTaskTitle, isComplete: false },
    ]);

    setNewTaskTitle(``);
  }

  function handleToggleTaskCompletion(_id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // console.log('ID', _id);
    tasks.map((task) => {
      if (task.id === _id) {
        task.isComplete = !task.isComplete;
      }
    });
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    console.log("ID", id);
    var deleteTask = tasks.filter((task) => task.id === id) as Task[];
    console.log("EXCLUIR", tasks.indexOf(deleteTask[0]));

    tasks.splice(tasks.indexOf(deleteTask[0]), 1);
    setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" /> Salvar
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                    placeholder="Digite aqui:"
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} /> Remover
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

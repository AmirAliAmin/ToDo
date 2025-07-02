import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { TbUserEdit } from "react-icons/tb";

function App() {
  const [isCompleteScreen, setIsComplete] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState({});

  const handleTodo = () => {
    if (!title || !description) return;

    let newTodo = {
      title: title,
      description: description,
    };

    let updatedTodoArr = [...allTodo];
    updatedTodoArr.push(newTodo);
    setAllTodo(updatedTodoArr);
    localStorage.setItem("todolsit", JSON.stringify(updatedTodoArr));
    setTitle("");
    setDescription("");
  };

  const handleDelete = (index) => {
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolsit", JSON.stringify(reducedTodo));
    setAllTodo(reducedTodo);
  };

  const handleComplteted = (index) => {
    let now = new Date();
    let completedOn = now.toLocaleString();

    let filterItem = {
      ...allTodo[index],
      completedOn: completedOn,
    };

    let updatedCompleteTodoArr = [...completedTodo];
    updatedCompleteTodoArr.push(filterItem);
    setCompletedTodo(updatedCompleteTodoArr);
    handleDelete(index);
    localStorage.setItem("completedTodo", JSON.stringify(updatedCompleteTodoArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index, 1);

    localStorage.setItem("completedTodo", JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  };

  const handleEditTodo = (index, item) => {
    setEditTodo(index);
    setCurrentEditedItem(item);
  };

  const handleSaveEdit = () => {
    let updatedTodos = [...allTodo];
    updatedTodos[editTodo] = currentEditedItem;

    setAllTodo(updatedTodos);
    localStorage.setItem("todolsit", JSON.stringify(updatedTodos));
    setEditTodo(null);
    setCurrentEditedItem({});
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolsit"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodo"));
    if (savedTodo) {
      setAllTodo(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodo(savedCompletedTodo);
    }
  }, []);

  return (
    <>
      <div className="todo" data-testid="todo-app">
        <h1 className="text-4xl text-white font-bold mx-[500px]" data-testid="title">
          My Todos
        </h1>
        <div className="todo-box rounded py-6 bg-zinc-900 dark w-[60%] mx-[230px] my-4">
          <div className="todo-input w-[90%] mx-8 border-b border-b-zinc-600 pb-2 flex justify-between text-white">
            <div className="input-item w-[35%]">
              <label className="font-semibold" htmlFor="" data-testid="title-label">
                Title:
              </label>
              <input
                className="w-[100%] text-black h-[30px] focus:outline-none px-2"
                title="Please enter your Title"
                required
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's the task title?"
                data-testid="title-input"
              />
            </div>
            <div className="input-item w-[35%]">
              <label className="font-semibold" htmlFor="" data-testid="description-label">
                Description:
              </label>
              <input
                className="w-[100%] h-[30px] focus:outline-none text-black px-2"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="What's the task description?"
                data-testid="description-input"
              />
            </div>
            <div className="input-item w-[20%] flex justify-center my-4">
              <button
                className="button font-semibold hover:bg-green-900 bg-green-700 cursor-pointer text-white h-10 px-7 mx-2"
                onClick={handleTodo}
                data-testid="add-button"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mx-8 my-5">
            <button
              className={`button font-semibold bg-gray-700 cursor-pointer text-white h-8 px-6 isCompleteScreen ${
                isCompleteScreen === false && "active"
              }`}
              onClick={() => setIsComplete(false)}
              data-testid="todo-button"
            >
              Todo
            </button>
            <button
              className={`button font-semibold bg-gray-700 cursor-pointer text-white h-8 px-6 isCompleteScreen ${
                isCompleteScreen === true && "active"
              }`}
              onClick={() => setIsComplete(true)}
              data-testid="completed-button"
            >
              Completed
            </button>
          </div>
          <div className="w-full overflow-y-scroll bg-zinc-900">
            {isCompleteScreen === false &&
              allTodo.map((curElem, index) => {
                if (editTodo === index) {
                  return (
                    <div
                      className="todo-input w-[90%] mx-8 border-b border-b-zinc-600 pb-2 flex justify-between text-white"
                      key={index}
                      data-testid={`todo-edit-${index}`}
                    >
                      <div className="input-item w-[35%]">
                        <label className="font-semibold" htmlFor="">
                          Title:
                        </label>
                        <input
                          className="w-[100%] text-black h-[30px] focus:outline-none px-2"
                          title="Please enter your Title"
                          required
                          value={currentEditedItem.title}
                          type="text"
                          onChange={(e) =>
                            setCurrentEditedItem({
                              ...currentEditedItem,
                              title: e.target.value,
                            })
                          }
                          data-testid={`edit-title-${index}`}
                        />
                      </div>
                      <div className="input-item w-[35%]">
                        <label className="font-semibold" htmlFor="">
                          Description:
                        </label>
                        <input
                          className="w-[100%] h-[30px] focus:outline-none text-black px-2"
                          required
                          value={currentEditedItem.description}
                          onChange={(e) =>
                            setCurrentEditedItem({
                              ...currentEditedItem,
                              description: e.target.value,
                            })
                          }
                          type="text"
                          data-testid={`edit-description-${index}`}
                        />
                      </div>
                      <div className="input-item w-[20%] flex justify-center my-4">
                        <button
                          className="button font-semibold hover:bg-green-900 bg-green-700 cursor-pointer text-white h-10 px-7 mx-2"
                          onClick={handleSaveEdit}
                          data-testid={`save-edit-${index}`}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="flex justify-between w-[90%] mx-8 my-6 shadow-lg rounded p-2 text-white bg-black h-100vh"
                      key={index}
                      data-testid={`todo-item-${index}`}
                    >
                      <div className="w-[60%]">
                        <h1 className="text-green-800 text-2xl font-bold">
                          {curElem.title}
                        </h1>
                        <p className="text-gray-500">{curElem.description}</p>
                      </div>
                      <div className="w-[35%] flex justify-end py-6">
                        <div
                          className="py-1 text-3xl w-8 h-8 hover:text-red-700 cursor-pointer"
                          onClick={() => handleDelete(index)}
                          data-testid={`delete-button-${index}`}
                        >
                          <AiOutlineDelete />
                        </div>
                        <div
                          className="text-green-700 text-3xl px-2 py-1 cursor-pointer"
                          onClick={() => handleComplteted(index)}
                          data-testid={`complete-button-${index}`}
                        >
                          <FaCheck />
                        </div>
                        <div
                          className="text-green-700 text-3xl px-2 py-1 cursor-pointer"
                          onClick={() => handleEditTodo(index, curElem)}
                          data-testid={`edit-button-${index}`}
                        >
                          <TbUserEdit />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            {isCompleteScreen === true &&
              completedTodo.map((curElem, index) => {
                return (
                  <div
                    className="flex justify-between w-[90%] mx-8 my-6 shadow-lg rounded p-2 text-white bg-black h-100vh"
                    key={index}
                    data-testid={`completed-todo-item-${index}`}
                  >
                    <div className="w-[60%]">
                      <h1 className="text-green-800 text-2xl font-bold">
                        {curElem.title}
                      </h1>
                      <p className="text-gray-500">{curElem.description}</p>
                      <p className="text-gray-500">
                        <small>Completed on: {curElem.completedOn}</small>
                      </p>
                    </div>
                    <div className="w-[35%] flex justify-end py-6">
                      <div
                        className="py-1 text-3xl w-8 h-8 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDeleteCompletedTodo(index)}
                        data-testid={`delete-completed-${index}`}
                      >
                        <AiOutlineDelete />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

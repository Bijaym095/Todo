import { useState } from "react";
import useTodo from "./hooks/useTodo";

const App = () => {
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    description: "",
    completed: "",
  });
  const [taskId, setTaskId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { todos, handleAdd, handleEdit, handleDelete } = useTodo();

  console.log("todoInfo",todoInfo)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateValue = (data) => {
    setIsEditing(true);
    setTaskId(data._id);
    setTodoInfo({
      title: data.title,
      description: data.description,
      completed: data.completed
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      try {
        await handleAdd(todoInfo);

        // Reset to default value on submit
        setTodoInfo({ title: "", description: "", completed: false });
        setIsEditing(false);
        setTaskId("");
      } catch (error) {
        console.error(`Error while adding todo task ${error.message}`);
      }
    } else {
      try {
        await handleEdit(taskId, todoInfo);

        // Reset to default value on submit
        setTodoInfo({ title: "", description: "", completed: false });
        setIsEditing(false);
        setTaskId("");
      } catch (error) {
        console.error(`Error while updating todo task ${error.message}`);
      }
    }
  };

  return (
    <div className="container py-12 lg:py-16 2xl:py-[6.25rem]">
      <div className="max-w-[798px] mx-auto mb-8 [&_form]:flex [&_form]:flex-col [&_form]:gap-y-4 [&_label]:block">
        <strong className="block mb-4 lg:text-[1.25rem] text-center">Todo Form</strong>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              value={todoInfo.title}
              placeholder="e.g. Task Title"
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              value={todoInfo.description}
              placeholder="e.g. Task Description" required></textarea>
          </div>

          <div>
            <label>Status</label>

            <div className="inline-flex gap-2 mr-2">
              <input id="statusCompleted" type="radio" name="completed" value={true} checked={todoInfo.completed} onChange={handleChange}/>
              <label htmlFor="statusCompleted">Completed</label>
            </div>
            <div className="inline-flex gap-2 mr-2">
              <input id="statusPending" type="radio" name="completed" value={false} checked={!todoInfo.completed} onChange={handleChange}/>
              <label htmlFor="statusPending">Pending</label>
            </div>
          </div>

          <div>
            <button className="btn">{isEditing ? "Update" : "Add"}</button>
          </div>
        </form>
      </div> {/* Form Wrapper */}

      <div className="min-w-[768px] overflow-auto">
        <table className="w-full border !border-black">
          <thead className="text-[1.125rem] [&_tr_th]:px-2 [&_tr_th]:py-4 [&_tr_th]:text-left [&_tr_th]:border-b [&_tr_th]:border-b-black [&_tr_th]:bg-[#F5F7F8]">
            <tr>
              <th>S.N</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-[0.9375rem] [&_tr_td]:p-2 [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-black/10">
            {todos.map(({_id , title, description, completed }, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{description}</td>
                  <td>{completed ? <span className="inline-block px-2 py-1 text-[0.875rem] text-green-500 bg-green-200 rounded-[5rem]">Completed</span> : <span className="inline-block px-2 py-1 text-[0.875rem] text-red-500 bg-red-200 rounded-[5rem]">Pending</span> }</td>
                  <td>
                    <div className="flex flex-wrap gap-2 max-w-[208px]">
                      <button className="btn min-w-[auto]" onClick={() => handleUpdateValue({_id,title,description,completed})}>Edit</button>
                      <button className="btn min-w-[auto] btn-danger" onClick={()=> handleDelete(_id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> {/* Table Wrapper */}
    </div>
  );
};

export default App;

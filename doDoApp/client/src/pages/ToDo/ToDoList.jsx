import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../commponents/Navbar";
import styles from "./ToDo.module.css";
import {
  Button,
  Input,
  Modal,
  message,
  Checkbox,
  Empty,
  Spin,
  Select,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ToDoServices from "../../services/toDoServices";
import { getUserDetails } from "../../util/GetUser";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const user = getUserDetails();


  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ToDoServices.getAllToDo(user?._id);
      setTodos(response.data);
    } catch (err) {
      message.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) fetchTodos();
  }, [fetchTodos, user?._id]);


  const openCreateModal = () => {
    setEditingTodo(null);
    setTitle("");
    setDescription("");
    setModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      message.warning("Please fill in both title and description.");
      return;
    }

    try {
      setSubmitLoading(true);

      if (editingTodo) {
        await ToDoServices.updateToDo(editingTodo._id, { title, description });
        message.success("Task updated successfully!");
      } else {
        await ToDoServices.createToDo({
          title,
          description,
          isCompleted: false,
          createdBy: user?._id,
        });
        message.success("Task created successfully!");
      }

      setModalOpen(false);
      fetchTodos();
    } catch (err) {
      message.error("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ToDoServices.deleteToDo(id);
      message.success("Task deleted!");
      fetchTodos();
    } catch (err) {
      message.error("Failed to delete task.");
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await ToDoServices.updateToDo(todo._id, {
        isCompleted: !todo.isCompleted,
        Completedon: !todo.isCompleted
          ? new Date().toLocaleDateString()
          : "",
      });
      fetchTodos();
    } catch (err) {
      message.error("Failed to update task.");
    }
  };


  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((todo) => {
      if (filterStatus === "completed") return todo.isCompleted;
      if (filterStatus === "notCompleted") return !todo.isCompleted;
      return true;
    });

  return (
    <div>
      <Navbar active={"myTask"} />

      <div className={styles.toDoWrapper}>
        <div
          className={styles.toDoHeader}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2>My Tasks</h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Search Tasks Here..."
              style={{ width: 250 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Select
              value={filterStatus}
              style={{ width: 160 }}
              onChange={(value) => setFilterStatus(value)}
              options={[
                { value: "all", label: "All" },
                { value: "completed", label: "Completed" },
                { value: "notCompleted", label: "Not Completed" },
              ]}
            />

            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={openCreateModal}
            >
              Add New
            </Button>
          </div>
        </div>

        {loading ? (
          <div className={styles.noTaskWrapper}>
            <Spin size="large" />
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className={styles.noTaskWrapper}>
            <Empty description="No tasks found." />
          </div>
        ) : (
          <div className={styles.toDoListCardWrapper}>
            {filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className={styles.toDoCard}
                style={{ width: 300 }}
              >
                <div className={styles.toDoCardHeader}>
                  <strong
                    style={{
                      textDecoration: todo.isCompleted
                        ? "line-through"
                        : "none",
                      color: todo.isCompleted ? "gray" : "inherit",
                    }}
                  >
                    {todo.title}
                  </strong>

                  <div>
                    <EditOutlined
                      style={{
                        marginRight: 10,
                        cursor: "pointer",
                        color: "#1677ff",
                      }}
                      onClick={() => openEditModal(todo)}
                    />
                    <DeleteOutlined
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(todo._id)}
                    />
                  </div>
                </div>

                <p style={{ color: "gray", margin: "8px 0" }}>
                  {todo.description}
                </p>

                <div className={styles.toDoCardFooter}>
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={() => handleToggleComplete(todo)}
                  >
                    {todo.isCompleted ? "Completed" : "Mark complete"}
                  </Checkbox>

                  {todo.isCompleted && todo.Completedon && (
                    <small style={{ color: "green" }}>
                      ✓ {todo.Completedon}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        title={editingTodo ? "Edit Task" : "Add New Task"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: 16,
          }}
        >
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Task Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="primary"
            loading={submitLoading}
            onClick={handleSubmit}
            disabled={!title || !description}
          >
            {editingTodo ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
//completed
export default ToDoList;
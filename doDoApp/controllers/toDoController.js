const ToDo = require("../models/ToDoList");
exports.createToDo = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    const todo = new ToDo({
      title,
      description,
      isCompleted: isCompleted ?? false,
      createdBy: req.user._id, // ✅ use authenticated user from JWT
    });
    const result = await todo.save();
    console.log(result);
    res.status(201).send({ message: "Created New Task" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to create task", error: err.message }); // ✅ fixed error response
  }
};

exports.getAllToDo = async (req, res) => {
  try {
    const result = await ToDo.find({ createdBy: req.user._id });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to fetch tasks", error: err.message });
  }
};

exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body
    const result = await ToDo.findByIdAndUpdate(id, { $set: data }, { returnOriginal: false });
    console.log(result);
    res.send({ message: "ToDo Task Updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ToDo.findByIdAndDelete(id);
    console.log(result);
    res.send({ message: "ToDo Task Deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const Task = require("./task.model");

const repo = [
  new Task({boardId: 'Test1'}),
  new Task({boardId: 'Test1'}),
  new Task({boardId: 'Test1'}),
  new Task({boardId: 'Test2'}), 
  new Task({boardId: 'Test1'}),
  new Task({boardId: 'Test1'})
];

const getAll = async (boardId) => repo.filter(task => task.boardId === boardId);

const getById = async (id) => repo.filter(task => task.id === id)[0];

const createTask = async (reqBody) => repo[repo.push(new Task(reqBody)) - 1]

const updateById = async (reqBody) => {
  const updatedTask = repo[repo.indexOf(repo.filter(task => task.id === reqBody.id)[0])];
  if (updatedTask !== undefined) {
    updatedTask.title = reqBody.title;
  }
  return updatedTask;
};

const deleteById = async (id) => {
  const deletedTask = repo.filter(task => task.id === id)[0];
  if (deletedTask !== undefined) {repo.splice(repo.indexOf(deletedTask), 1);}
  return deletedTask;
};

const setUserIdToNull = async (deletedUserId) => {
    repo.forEach((elem, i) => {
        if (elem.userId === deletedUserId) {
            repo[i].userId = null;
        }
    }); 
}

const deleteBoardsTasks = async (deletedBoardId) => {

  const deletedTasks = repo.filter(task => task.boardId === deletedBoardId);
  deletedTasks.forEach(elem => {
    repo.splice(repo.indexOf(elem), 1);
  });
}

module.exports = { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };
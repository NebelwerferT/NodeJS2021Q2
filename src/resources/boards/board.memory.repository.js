const Board = require("./board.model");

const repo = [
  new Board({id: 'Test1', title: 'Test1', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []}),
  new Board({id: 'Test2', title: 'Test2', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []})
];

const getAll = async () => repo;

const getById = async (id) => repo.filter(board => board.id === id)[0]

const createBoard = async (reqBody) => repo[(repo.push(new Board(reqBody))) - 1];

const updateById = async (reqBody) => {
  const updatedBoard = repo[repo.indexOf(repo.filter(board => board.id === reqBody.id)[0])];
  if (updatedBoard !== undefined) {
    updatedBoard.title = reqBody.title;
    updatedBoard.columns = reqBody.columns;
  }
  return updatedBoard;
};

const deleteById =  async (id) => {
  const deletedBorder = repo.filter(board => board.id === id)[0];
  if(deletedBorder !== undefined) {repo.splice(repo.indexOf(deletedBorder), 1);}
  return deletedBorder;
};

module.exports = { getAll, getById, createBoard, updateById, deleteById };
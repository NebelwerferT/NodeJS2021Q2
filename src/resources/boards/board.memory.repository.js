const Board = require("./board.model");

const repo = [
  new Board({id: undefined, title: 'Test1', columns: []}),
  new Board({id: undefined, title: 'Test2', columns: []}),
  new Board({id: undefined, title: 'Test3', columns: []}),
  new Board({id: undefined, title: 'Test4', columns: []}),
  new Board({id: undefined, title: 'Test5', columns: []}),
  new Board({id: undefined, title: 'Test6', columns: []})
];

const getAll = async () => repo;

const getById = async (id) => repo.filter(board => board.id === id)[0]

const createBoard = async (reqBody) => repo[(repo.push(new Board(reqBody))) - 1]

const updateById = async (reqBody) => {
  const updatingBorderIdx = repo.indexOf(repo.filter(board => board.id === reqBody.id)[0]);
  repo[updatingBorderIdx].title = reqBody.title;
  repo[updatingBorderIdx].columns = reqBody.columns;
  return repo[updatingBorderIdx];
};

const deleteById =  async (id) => {
  const deletedBorder = repo.filter(board => board.id === id)[0];
  if(deletedBorder !== undefined) {repo.splice(repo.indexOf(deletedBorder), 1);}
  return deletedBorder;
};

module.exports = { getAll, getById, createBoard, updateById, deleteById };
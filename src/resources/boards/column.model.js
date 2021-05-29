const uuid = require('uuid');

/**
 * Class to create a Column object
 * @class Column
 */
 class Column {
   /**
    * Creates a column instance
    * @type {Column}
    * @param {Object} columnProps an object containing column properties
    * @param {String} columnProps.id column id by uuid
    * @param {String} columnProps.title column title
    * @param {Number} columnProps.order order of column on the board
    */
   constructor({
       id = uuid.v4(),
       title = 'Column Title',
       order = 0
    } = {}) {
     this.id = id;
     this.title = title;
     this.order = order;
   }
 }
 
 module.exports = Column;
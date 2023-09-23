import TaskModel from '../models/task.js';

const TaskHelper = {
  taskExists: async (id, user) => {
    
    const query = {
      _id: id,
      user_id: user
    }
    const task = await TaskModel.find(query)
    return task.length != 0 ? true : false;
  },

  taskData: async (id, user) => {
    
    const query = {
      _id: id,
      user_id: user
    }
    const task = await TaskModel.find(query)
    return task.length != 0 ? task : [];
  },

};

export default TaskHelper;
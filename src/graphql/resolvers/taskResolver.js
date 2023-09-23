
import TaskModel from '../../models/task.js';
import TaskHelper from '../../helpers/task.helper.js';
import throwCustomError, {
  ErrorTypes,
} from '../../helpers/error-handler.helper.js';

const taskResolver = {
  Query: {
    getUserTasks: async (parent, { id }, contextValue) => {
   
      const user = contextValue.user.userId
      const query = {
        user_id: id
      }
      const tasks = await TaskModel.find(query)
      
      if (!tasks || user != id) {
        throwCustomError(
          `There are no tasks for User ${id}.`,
          ErrorTypes.NOT_FOUND
        );
      }
      return tasks;
    },

  },

  Mutation: {
    // destructure the args object to get recipeInput object and then destructure
    // recipeInput to get the name and description properties
    createTask: async (parent, { input }, contextValue) => {
        
        const user = contextValue.user.userId

        // We are setting the default values for status and archived
        // status: TO DO, archived: false

        const { title, description } = input;
        const taskToCreate = new TaskModel({
        title: title,
        description: description,
        status: "TO DO",
        user_id: user,
        archived: false
      });

      const task = await taskToCreate.save();
      return task;
    },


    changeStatus: async (_, { input }, { user }) => {

      const {status, id} = input
      const isExists = await TaskHelper.taskExists(id, user.userId);

      if (!isExists) {
        throwCustomError(
          `Task with id ${id} does not exists.`,
          ErrorTypes.NOT_FOUND
        );
      }
      await TaskModel.findByIdAndUpdate(
        { _id: id },
        {
          status: status,
        },
        { new: true }
      );
      return {
        isSuccess: true,
        message: 'UPDATED!!',
      };
    },

    archiveTask: async (_, { id }, { user }) => {

        const isExists = await TaskHelper.taskExists(id, user.userId);
  
        if (!isExists) {
          throwCustomError(
            `Task with id ${id} does not exists.`,
            ErrorTypes.NOT_FOUND
          );
        }

        const taskData = await TaskHelper.taskData(id, user.userId);
        
        await TaskModel.findByIdAndUpdate(
          { _id: id },
          {
            archived: !taskData[0].archived,
          },
          { new: true }
        );
        return {
          isSuccess: true,
          message: 'UPDATED!!',
        };
      },


  },
};
export default taskResolver;
import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    user_id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    archived: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model('Task', taskSchema);
export default TaskModel;
const taskTypeDefs = `#graphql

  type Task {
    _id: String
    title: String
    description: String
    status: String
    archived: Boolean
    user_id: String
  }
`;

const taskSchema = `#graphql
  input TaskInput {
    title: String!
    description: String! 
  }


  type Query {
    getUserTasks(id: ID!): [Task]
  }

  type TaskOutput{
    _id: String
    title: String
    description: String
    status: String
    archived: Boolean
    user_id: String
  }
  type TaskEditSuccess {
    isSuccess: Boolean
    message: String!
  }

  input inputStatus {
    id: String
    status: String
  }

  type Mutation {
    createTask(input: TaskInput): TaskOutput
    changeStatus(input: inputStatus): TaskEditSuccess
    archiveTask(id: ID!): TaskEditSuccess
  }
`;



export default [taskSchema, taskTypeDefs];
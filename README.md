# How to run the project

# REQUIREMENTS
 - Docker installation
 - Nodejs
 - Code Editor

## Install dependencies
`yarn install`

## Create the .env file with the content you can find in .env.example

## Run the makefile to get the MongoDB started
<p>This will make the docker container to start that contains the MongoDB service</p>
`make up`


## Run the project
`yarn run dev`

## Go to the URL stated in the console

### Signup
```
mutation Signup($input: SignupInput) {
  signup(input: {
    email:"janilsons@hotmail.com"
    password: "teste"
  }) {
    _id
    email
    createdAt
    updatedAt
  }
}
```

### Sample mutation
```
mutation Login($input: LoginInput) {
  login(input: {
    email:"janilsons@gmail.com", 
    password:"teste"

  }) {
    _id
    email
    createdAt
    updatedAt
    userJwtToken {
      token
    }
  }
}
```

<p>For all other queries/mutation we will need to use this token in Header => Authentication: generated_token</p>

### Get user tasks
```
query GetUserTasks($getUserByIdId: ID!) {
  getUserTasks(id: "650e1f370bad616200cc4ca9") {
   _id
   title
   description
   status
   archived
   user_id
  }
}
```

### Create Task
<p>We don't need to set the user_id, we get it from context</p>
```
mutation CreateTask($input: TaskInput) {
  createTask(input: {
    title:"teste 6", description:"task description 6"
  }) {
    title, description, status, archived, user_id
  }
}
```

### Archive/Unarchive task
```
mutation ArchiveTAsk($input: inputStatus) {
  archiveTask(id:"650f003ba7ff05d68ba9dedb") {
    isSuccess
    message
  }
}
```

### Change Task Statis
```
mutation ChangeStatus($input: inputStatus) {
  changeStatus(input: {
    id:"650f003ba7ff05d68ba9dedb",
    status:"DOING"
  }) {
    isSuccess
    message
  }
}
```
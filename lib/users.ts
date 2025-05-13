// This is a mock implementation. In a real app, you would use a database.
const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "$2a$12$k8Y1Vn6.Vb5EFHm5XSY1Z.W0wUUCz0jW0l1RZN1CDWUCUQyX7U3Oe", // "password123"
      },
    ]
    
    export async function getUserByEmail(email: string) {
      return users.find((user) => user.email === email) || null
    }
    
    export async function getUserById(id: string) {
      return users.find((user) => user.id === id) || null
    }
    
    export async function createUser({ name, email, password }) {
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password,
      }
    
      users.push(newUser)
    
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }
    }
    
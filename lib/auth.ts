import { hash, compare } from "bcryptjs"
import { createUser, getUserByEmail } from "@/lib/users"

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

export async function registerUser({ name, email, password }) {
  // Check if user already exists
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    throw new Error("User already exists with this email")
  }

  // Hash the password
  const hashedPassword = await hashPassword(password)

  // Create the user
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  })

  return user
}

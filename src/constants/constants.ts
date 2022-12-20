import { User } from "../types"

export const dumpsterDB = "dumpsterDB"
export const usersDB = "usersDB"
export const charactersDB = "charactersDB"

export const defaultUser: User = {
  id: "sagivmis",
  password: "1234",
  name: "sagiv mishaan",
  isAdmin: true,
  withPermissions: true
}

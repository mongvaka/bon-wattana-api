import { Users } from "src/users/users.entity";

export interface CustomRequest extends Request{
    users:Users
}
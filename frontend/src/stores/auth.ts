import { me } from "../api/auth";
import type { User } from "../types";
export async function loadUser(): Promise<User> { return me(); }

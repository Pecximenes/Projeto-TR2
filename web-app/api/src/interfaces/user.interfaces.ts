type User = {
  id: string;
  name: string;
  email: string;
};

type UserCreate = {
  name: string;
  email: string;
};

type UserController = {
  create(data: UserCreate): Promise<User>;
};

export type { User, UserCreate, UserController };



export interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

export interface User {
  username: string;
  password: string;
  userId:number;
}

export interface LoginFormProps {
  onSubmit: (userData: {
    username: string;
    password: string;
    userId: number;
  }) => void;
}


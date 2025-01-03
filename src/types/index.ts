export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface Notification {
  id: number;
  text: string;
  time: string;
} 
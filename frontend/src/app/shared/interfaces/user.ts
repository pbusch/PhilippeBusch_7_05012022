export interface User {
  //token?: string;
  isSelected?: boolean;
  id?: number;
  name: string;
  email: string;
  //password?: string;
  level?: number;
  isEdit?: boolean;
}

export const UserSchema = {
  isSelected: 'isSelected',
  name: 'text',
  email: 'text',
  level: 'text',
  isEdit: 'isEdit',
};

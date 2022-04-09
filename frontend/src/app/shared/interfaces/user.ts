export interface User {
  isSelected?: boolean;
  id?: number;
  name: string;
  email: string;
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

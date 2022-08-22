import { UserDocument } from 'src/users/user.schema';

export type SanitizedUser = Pick<
  UserDocument,
  'username' | 'name' | 'role' | '_id' | 'id'
>;

export type JwtPayload = {
  username: string;
  id: string;
};

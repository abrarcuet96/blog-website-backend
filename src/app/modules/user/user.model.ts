import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
const UserSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  console.log(user);

  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const User = model<TUser, UserModel>('User', UserSchema);

export default User;

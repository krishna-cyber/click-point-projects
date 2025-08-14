import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/role/role.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: [true, 'User already exists'],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address',
    ],
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Role.name,
  })
  roles: Role[];
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', function (next) {
//   if (this.roles === 'admin') {
//     this.permission.push(
//       { name: 'edit', status: 'active', slug: '/edit' },
//       { name: 'view', status: 'active', slug: '/view' },
//       { name: 'delete', status: 'active', slug: '/delete' },
//       { name: 'share', status: 'active', slug: '/share' },
//     );
//   } else if (this.roles === 'manager') {
//     this.permission.push(
//       { name: 'view', status: 'active', slug: '/view' },
//       { name: 'edit', status: 'active', slug: '/edit' },
//       { name: 'share', status: 'active', slug: '/share' },
//     );
//   } else if (this.roles === 'user') {
//     this.permission.push({ name: 'view', status: 'active', slug: '/view' });
//   }

//   next();
// });

UserSchema.pre('save', async function (next) {
  try {
    // Check if the password has been modified
    if (!this.isModified('password')) return next();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next(); // Proceed to save
  } catch (error) {
    next(error as Error); // Pass any errors to the next middleware
  }
});

export { UserSchema };

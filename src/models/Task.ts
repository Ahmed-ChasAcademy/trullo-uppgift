import mongoose, { Document, Schema, Types } from 'mongoose';

export type TaskStatus = 'to-do' | 'in progress' | 'blocked' | 'done';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo: Types.ObjectId | null;
  createdAt: Date;
  finishedAt: Date | null;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['to-do', 'in progress', 'blocked', 'done'],
    default: 'to-do'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  finishedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Automatically set finishedAt when status changes to 'done'
taskSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'done' && !this.finishedAt) {
    this.finishedAt = new Date();
  }
  if (this.isModified('status') && this.status !== 'done' && this.finishedAt) {
    this.finishedAt = null;
  }
  next();
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
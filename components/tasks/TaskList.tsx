'use client';

import { TaskItem } from './TaskItem';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  userId: string;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export function TaskList({ tasks, userId, onTaskUpdated, onTaskDeleted }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          userId={userId}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
}
// API client for task operations
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';
  }

  async request(endpoint: string, userId: string, options: RequestInit = {}) {
    // For development, we'll use the provided user ID to simulate authentication
    // In a real app, you would get the actual token from your auth system
    const mockUserId = userId; // Use the provided user ID

    // For now, we'll pass the user ID in a custom header for development purposes
    // In a real app, you would include an actual JWT token in the Authorization header
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Mock-User-ID': mockUserId, // Passing user ID in a custom header for dev
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Task API methods
  getTasks(userId: string, params?: { completed?: boolean; limit?: number; offset?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.completed !== undefined) queryParams.append('completed', String(params.completed));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.offset) queryParams.append('offset', String(params.offset));

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/${userId}/tasks?${queryString}` : `/${userId}/tasks`;

    return this.request(endpoint, userId);
  }

  createTask(userId: string, taskData: { title: string; description?: string; completed?: boolean }) {
    return this.request(`/${userId}/tasks`, userId, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  getTask(userId: string, taskId: string) {
    return this.request(`/${userId}/tasks/${taskId}`, userId);
  }

  updateTask(userId: string, taskId: string, taskData: { title?: string; description?: string; completed?: boolean }) {
    return this.request(`/${userId}/tasks/${taskId}`, userId, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  deleteTask(userId: string, taskId: string) {
    return this.request(`/${userId}/tasks/${taskId}`, userId, {
      method: 'DELETE',
    });
  }

  updateTaskCompletion(userId: string, taskId: string, completed: boolean) {
    return this.request(`/${userId}/tasks/${taskId}/complete`, userId, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    });
  }
}

export const apiClient = new ApiClient();
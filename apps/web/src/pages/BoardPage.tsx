const columns = [
  {
    title: 'Todo',
    tasks: [
      {
        id: 1,
        title: 'Create login screen',
        priority: 'High',
      },
      {
        id: 2,
        title: 'Setup Redux store',
        priority: 'Medium',
      },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      {
        id: 3,
        title: 'Build Kanban layout',
        priority: 'High',
      },
    ],
  },
  {
    title: 'Review',
    tasks: [
      {
        id: 4,
        title: 'Optimize sidebar rendering',
        priority: 'Low',
      },
    ],
  },
  {
    title: 'Done',
    tasks: [
      {
        id: 5,
        title: 'Initialize monorepo',
        priority: 'Completed',
      },
    ],
  },
];

export default function BoardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sprint Board</h1>

          <p className="mt-2 text-gray-500">
            Manage tasks and track sprint progress.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          + Create Task
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title} className="rounded-3xl bg-gray-100 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {column.title}
              </h2>

              <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-4">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs font-semibold text-white">
                        V
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-xs font-semibold text-white">
                        J
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">2 days left</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

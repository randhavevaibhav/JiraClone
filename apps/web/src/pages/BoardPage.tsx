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
    <div className="lg:space-y-6 space-y-5">
      <div className="flex lg:flex-row flex-col items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-(--text-primary)">
            Sprint Board
          </h1>

          <p className="mt-2 text-(--text-secondary)">
            Manage tasks and track sprint progress.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          + Create Task
        </button>
      </div>

      <div className="grid lg:gap-6 gap-4 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title} className="rounded-3xl bg-(--card-bg) p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--text-primary)">
                {column.title}
              </h2>

              <span className="rounded-full bg-(--bg-secondary) px-3 py-1 text-sm font-medium text-(--text-secondary)">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-4">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="cursor-pointer rounded-2xl bg-(--bg-secondary) p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-(--text-primary)">
                      {task.title}
                    </h3>

                    <span className="rounded-full bg-(--card-bg) px-2 py-1 text-xs font-semibold text-(--text-action)">
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

                    <p className="text-xs text-(--text-secondary)">
                      2 days left
                    </p>
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

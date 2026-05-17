const stats = [
  {
    title: 'Total Tasks',
    value: '124',
  },
  {
    title: 'Completed',
    value: '87',
  },
  {
    title: 'In Progress',
    value: '24',
  },
  {
    title: 'Blocked',
    value: '13',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Overview of sprint activity and team performance.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Sprint Progress
            </h3>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              On Track
            </span>
          </div>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[72%] rounded-full bg-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

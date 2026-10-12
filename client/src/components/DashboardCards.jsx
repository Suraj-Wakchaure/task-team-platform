import React from 'react';
import { ListTodo, Clock, CheckCircle2, PlayCircle } from 'lucide-react';

const DashboardCards = React.memo(({ tasks = [] }) => {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  const cards = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ListTodo,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50 border-orange-200',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: PlayCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="p-4 rounded-lg border border-slate-200 bg-white flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{card.value}</h3>
            </div>
            <div className={`p-2.5 rounded-md border ${card.bg} ${card.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default DashboardCards;

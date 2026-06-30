'use client';

import {
	ResponsiveContainer,
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from 'recharts';

type ChartsData = {
	month: string;
	income: number;
	expense: number;
};

type IncomeExpenseChartProps = {
	data: ChartsData[];
};

export default function IncomeExpenseCharts({ data }: IncomeExpenseChartProps) {
	return (
		<div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
			<div className="mb-4">
				<h2 className="text-slate-900 dark:text-slate-200 font-semibold text-base p-2">
					Pajamos ir išlaidos
				</h2>
				<p className="text-slate-600 dark:text-slate-400 text-sm p-2">
					Palyginimas pagal mėnesius
				</p>
			</div>

			<div className="h-64 sm:h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						margin={{ left: -10, right: 10, top: 5, bottom: 5 }}
					>
						<XAxis
							dataKey="month"
							tick={{ fontSize: 11 }}
							interval={0}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis width={45} tick={{ fontSize: 11 }} />

						<Tooltip
							contentStyle={{
								backgroundColor: '#1e293b',
								border: '1px solid #334155',
								borderRadius: '12px',
								color: '#f1f5f9',
							}}
							cursor={{ fill: 'rgba(148,163,184,0.08)' }}
						/>
						<Legend />

						<Bar
							dataKey="income"
							name="pajamos"
							fill="#008000"
							radius={[10, 10, 0, 0]}
						/>
						<Bar
							dataKey="expense"
							name="išlaidos"
							fill="#dc2626"
							radius={[10, 10, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

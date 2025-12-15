import { ActivityData } from "@/lib/types";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";

export default function ActivityLineChart({ data }: { data: ActivityData }) {
  const { commitCount } = getTransformedData(data);

  return (
    <section className="flex grow flex-col items-center gap-2">
      <h3 className="text-lg font-semibold sm:text-xl">Commits over time</h3>
      <LineChart
        style={{
          width: "100%",
          maxWidth: "450px",
          minWidth: "200px",
          maxHeight: "50vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={commitCount}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="month"
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={12}
        />
        <YAxis width="auto" fontSize={12} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </section>
  );
}

function getTransformedData(data: ActivityData) {
  const commitCount = {} as Record<string, number>;
  for (const commit of data.activityTimeline) {
    if (!commit.date) continue;

    const periodKey = commit.date.slice(0, 7);
    if (!(periodKey in commitCount)) {
      commitCount[periodKey] = 0;
    }
    commitCount[periodKey]++;
  }
  let transformed = [] as Record<string, string | number>[];
  for (const [month, count] of Object.entries(commitCount)) {
    transformed.push({ month, count });
  }
  transformed = transformed.reverse();
  return {
    commitCount: transformed,
  };
}

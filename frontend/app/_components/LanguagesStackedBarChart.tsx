/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ActivityData } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const widthToNumber = (width: number) => {
  if (width > 1000) {
    return 48;
  }
  if (width > 800) {
    return 36;
  }
  if (width > 500) {
    return 24;
  }
  return 12;
};

export default function LanguagesStackedBarChart({
  data,
}: {
  data: ActivityData;
}) {
  const { chartData, languageAndCount, languages } = getTransformedData(data);

  return (
    <section className="flex flex-col items-center gap-2">
      <h3 className="text-lg font-semibold sm:text-xl">
        Language use over time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="period"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          {/* <YAxis tickFormatter={(value) => `${value}%`} fontSize={12} /> */}
          <Tooltip />
          {/* <Legend /> */}
          {languages.map((l) => {
            return (
              <Bar
                key={l}
                dataKey={l}
                stackId="a"
                fill={`${getColorString(l, languageAndCount)}`}
                isAnimationActive={false}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

const languageToColor: Record<string, string> = {
  TypeScript: "#3178c6",
  CSS: "#563d7c",
  Shell: "#4EAA25",
  JavaScript: "#c9b406",
  Python: "#2db378",
  Rust: "#CE422B",
  SQL: "#586570",
  HTML: "#e38e26",
  "C#": "#239120",
  Go: "#00ADD8",
};

function getColorString(
  language: string,
  languageAndCount: Record<string, number>,
) {
  return (
    languageToColor[language] ||
    `hsl(${Math.floor(
      (Object.keys(languageAndCount).indexOf(language) /
        Object.keys(languageAndCount).length) *
        360,
    )}deg 70% 50%)`
  );
}

function getTransformedData(data: ActivityData) {
  let languageAndCount = {} as Record<string, number>;

  Object.values(data.languageTimeline).forEach((languageData) => {
    for (const [language, count] of Object.entries(languageData)) {
      if (!(language in languageAndCount)) {
        languageAndCount[language] = 0;
      }
      languageAndCount[language] += count;
    }
  });
  languageAndCount = Object.fromEntries(
    Object.entries(languageAndCount).sort(
      ([aLang, aCount], [bLang, bCount]) => bCount - aCount,
    ),
  );

  const languageTimeline = Object.fromEntries(
    Object.entries(data.languageTimeline).sort(
      ([aPeriod, aLanguageData], [bPeriod, bLanguageData]) =>
        bPeriod.localeCompare(aPeriod),
    ),
  );
  const languageTimelineByYear = {} as Record<string, Record<string, number>>;
  for (const [period, count] of Object.entries(languageTimeline)) {
    const year = period.slice(0, 4);
    console.log(year);
    if (!(year in languageTimelineByYear)) {
      languageTimelineByYear[year] = {};
    }
    for (const [language, langCount] of Object.entries(count)) {
      if (!(language in languageTimelineByYear[year])) {
        languageTimelineByYear[year][language] = 0;
      }
      languageTimelineByYear[year][language] += langCount;
    }
  }

  const chartData = [] as Record<string, string | number>[];
  const languages = new Set<string>();

  for (const [period, languageData] of Object.entries(languageTimelineByYear)) {
    const totalCount = Object.values(languageData).reduce(
      (acc, num) => acc + num,
      0,
    );
    if (totalCount === 0) {
      chartData.push({ period });
      continue;
    }

    const normalizedEntries = Object.entries(languageData).map(
      ([language, count]) => {
        const rawPercent = (count / totalCount) * 100;
        return {
          language,
          rawPercent,
          value: Math.round(rawPercent),
        };
      },
    );

    let diff =
      100 - normalizedEntries.reduce((acc, entry) => acc + entry.value, 0);
    if (diff !== 0) {
      normalizedEntries.sort((a, b) => {
        const aResidue = a.rawPercent - a.value;
        const bResidue = b.rawPercent - b.value;
        return diff > 0 ? bResidue - aResidue : aResidue - bResidue;
      });
      for (const entry of normalizedEntries) {
        if (diff === 0) {
          break;
        }
        if (diff > 0) {
          entry.value += 1;
          diff -= 1;
        } else if (entry.value > 0) {
          entry.value -= 1;
          diff += 1;
        }
      }
    }

    const normalizedLanguageData = Object.fromEntries(
      normalizedEntries
        .filter(({ language, value }) => value > 0)
        .map(({ language, value }) => [language, value]),
    );
    Object.keys(normalizedLanguageData).forEach((language) =>
      languages.add(language),
    );

    chartData.push({
      period,
      ...normalizedLanguageData,
    });
  }

  return {
    languageAndCount,
    chartData,
    languages: [...languages],
  };
}

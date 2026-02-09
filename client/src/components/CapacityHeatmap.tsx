import { useRef, useEffect } from "react";
import gsap from "gsap";

const CapacityHeatmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Mock data for the heatmap
  const employees = [
    "John Doe",
    "Jane Smith",
    "Alex Johnson",
    "Sarah Williams",
    "Mike Brown",
    "Emily Davis",
  ];
  const weeks = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
    "Week 8",
  ];

  // Random capacity data (0-100)
  const data = employees.map(() =>
    weeks.map(() => Math.floor(Math.random() * 101)),
  );

  useEffect(() => {
    if (svgRef.current) {
      gsap.from(svgRef.current.querySelectorAll("rect"), {
        scale: 0,
        opacity: 0,
        stagger: {
          grid: [employees.length, weeks.length],
          from: "start",
          amount: 1,
        },
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  const getColor = (value: number) => {
    if (value > 90) return "#f43f5e"; // Red (Overallocated)
    if (value > 70) return "#fbbf24"; // Yellow (Partial)
    return "#10b981"; // Green (Available)
  };

  const cellWidth = 80;
  const cellHeight = 40;
  const labelWidth = 120;
  const labelHeight = 30;

  return (
    <div
      ref={containerRef}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Resource Capacity Heatmap
        </h2>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500"></div>
            <span className="text-slate-400">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-400"></div>
            <span className="text-slate-400">Partial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-rose-500"></div>
            <span className="text-slate-400">Overallocated</span>
          </div>
        </div>
      </div>

      <svg
        ref={svgRef}
        width={labelWidth + weeks.length * cellWidth}
        height={labelHeight + employees.length * cellHeight}
        className="mx-auto"
      >
        {/* Week Labels */}
        {weeks.map((week, i) => (
          <text
            key={i}
            x={labelWidth + i * cellWidth + cellWidth / 2}
            y={20}
            textAnchor="middle"
            className="text-[10px] fill-slate-500 font-medium uppercase tracking-wider"
          >
            {week}
          </text>
        ))}

        {/* Employee Rows */}
        {employees.map((employee, i) => (
          <g key={i}>
            <text
              x={10}
              y={labelHeight + i * cellHeight + cellHeight / 2 + 4}
              className="text-xs fill-slate-300 font-medium"
            >
              {employee}
            </text>

            {weeks.map((week, j) => (
              <rect
                key={j}
                x={labelWidth + j * cellWidth + 4}
                y={labelHeight + i * cellHeight + 4}
                width={cellWidth - 8}
                height={cellHeight - 8}
                rx={6}
                fill={getColor(data[i][j])}
                fillOpacity={0.8}
                className="cursor-pointer transition-all hover:fill-opacity-100"
              >
                <title>{`${employee} - ${week}: ${data[i][j]}%`}</title>
              </rect>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CapacityHeatmap;

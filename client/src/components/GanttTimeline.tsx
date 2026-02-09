import { useEffect, useRef, useState, memo, useMemo } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useResourceStore } from "../store/useResourceStore";

gsap.registerPlugin(Draggable);

const DAY_WIDTH = 60;
const ROW_HEIGHT = 80;

const AllocationBar = memo(
  ({ alloc, left, width }: { alloc: any; left: number; width: number }) => (
    <div
      key={alloc._id}
      className="allocation-bar absolute top-4 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-3 flex items-center border border-blue-400/30 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-blue-500/20 transition-shadow z-0"
      style={{ left, width }}
    >
      <div className="text-[10px] font-bold text-white uppercase tracking-widest truncate">
        {alloc.role} • {alloc.hoursPerWeek}h
      </div>
    </div>
  ),
);

const ResourceRow = memo(
  ({
    emp,
    days,
    allocations,
  }: {
    emp: any;
    days: Date[];
    allocations: any[];
  }) => (
    <div
      className="flex border-b border-slate-800 group hover:bg-slate-800/20 transition-colors"
      style={{ height: ROW_HEIGHT }}
    >
      <div className="w-[250px] flex-shrink-0 p-4 border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky left-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shadow-inner group-hover:from-blue-600 group-hover:to-indigo-700 transition-all group-hover:scale-105">
          {emp.firstName[0]}
          {emp.lastName[0]}
        </div>
        <div className="overflow-hidden">
          <div className="font-bold text-slate-200 text-sm truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {emp.firstName} {emp.lastName}
          </div>
          <div className="text-[10px] text-slate-500 font-bold uppercase truncate tracking-tighter">
            {emp.jobTitle}
          </div>
        </div>
      </div>

      <div className="flex relative">
        {days.map((day: Date) => (
          <div
            key={day.toString()}
            className="flex-shrink-0 border-r border-slate-800/30 h-full w-[60px]"
            style={{ width: DAY_WIDTH }}
          />
        ))}

        {allocations.map((alloc) => {
          const startDay = new Date(alloc.startDate);
          const endDay = new Date(alloc.endDate);
          const left = Math.max(0, (startDay.getDate() - 1) * DAY_WIDTH);
          const width = (endDay.getDate() - startDay.getDate() + 1) * DAY_WIDTH;

          return (
            <AllocationBar
              key={alloc._id}
              alloc={alloc}
              left={left}
              width={width}
            />
          );
        })}
      </div>
    </div>
  ),
);

const GanttTimeline = () => {
  const { employees, allocations, isLoading, fetchDashboardData } =
    useResourceStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const timelineRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentDate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (!isLoading && allocations.length > 0) {
      const bars = document.querySelectorAll(".allocation-bar");
      Draggable.create(bars, {
        type: "x",
        bounds: timelineRef.current || undefined,
        grid: [DAY_WIDTH, 0],
      });
    }
  }, [isLoading, allocations, days.length]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                Timeline Engine
              </h2>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mt-1">
                Resource Orchestration
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setCurrentDate(addDays(currentDate, -30))}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 font-bold text-slate-200 text-xs min-w-[120px] text-center uppercase tracking-widest">
              {format(currentDate, "MMMM yyyy")}
            </div>
            <button
              onClick={() => setCurrentDate(addDays(currentDate, 30))}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto scrollbar-hide">
        <div
          className="relative min-w-full"
          style={{
            width: days.length * DAY_WIDTH + 250,
            height: (employees.length + 1) * ROW_HEIGHT,
          }}
          ref={timelineRef}
        >
          <div className="flex sticky top-0 z-10 bg-slate-900 border-b border-slate-800">
            <div className="w-[250px] flex-shrink-0 bg-slate-900 p-4 font-bold text-[10px] text-slate-500 uppercase flex items-center border-r border-slate-800 tracking-widest">
              Resources
            </div>
            {days.map((day: Date) => (
              <div
                key={day.toString()}
                className="flex-shrink-0 border-r border-slate-800/50 p-2 text-center"
                style={{ width: DAY_WIDTH }}
              >
                <div className="text-[9px] font-bold text-slate-500 uppercase">
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-sm font-bold mt-0.5 ${format(day, "d") === format(new Date(), "d") ? "text-blue-400" : "text-slate-300"}`}
                >
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>

          {employees.map((emp) => (
            <ResourceRow
              key={emp._id}
              emp={emp}
              days={days}
              allocations={allocations.filter((a) => a.employeeId === emp._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttTimeline;

import GanttTimeline from "../components/GanttTimeline";

const Timeline = () => {
  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Resource Timeline</h1>
        <p className="text-slate-400 mt-1">
          AI-optimized allocation engine with real-time sync
        </p>
      </div>

      <GanttTimeline />
    </div>
  );
};

export default Timeline;

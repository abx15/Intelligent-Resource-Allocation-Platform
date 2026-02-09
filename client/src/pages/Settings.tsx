import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  User,
  Globe,
  Database,
  Webhook,
  Key,
  ChevronRight,
  Save,
} from "lucide-react";

const SettingItem = ({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: any;
  title: string;
  description: string;
  badge?: string;
}) => (
  <div className="group flex items-center justify-between p-6 hover:bg-slate-800/30 transition-all cursor-pointer rounded-2xl">
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:bg-indigo-600/10 group-hover:border-indigo-600/30 transition-all">
        <Icon className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">
            {title}
          </h3>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
              {badge}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm group-hover:text-slate-400 transition-colors">
          {description}
        </p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
  </div>
);

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-xl">
              <SettingsIcon className="w-6 h-6 text-slate-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white leading-none italic">
              System Config
            </h1>
          </div>
          <p className="text-slate-500 font-medium">
            Orchestration control and application preferences.
          </p>
        </div>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95">
          <Save className="w-4 h-4" />
          Apply Changes
        </button>
      </div>

      <div className="space-y-12">
        {/* Account Settings */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6 pl-2">
            Security & Access
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden">
            <SettingItem
              icon={User}
              title="Profile Orchestration"
              description="Update your personal identification and resource manager role."
            />
            <div className="h-px bg-slate-800 mx-6" />
            <SettingItem
              icon={Key}
              title="Encryption Keys"
              description="Manage your automated system access tokens and API keys."
              badge="Secure"
            />
            <div className="h-px bg-slate-800 mx-6" />
            <SettingItem
              icon={Shield}
              title="Privacy Shield"
              description="Configure resource data visibility and system-wide permissions."
            />
          </div>
        </section>

        {/* Application Settings */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6 pl-2">
            System Infrastructure
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden">
            <SettingItem
              icon={Bell}
              title="Neural Notifications"
              description="Set priority levels for conflict alerts and burnout notifications."
            />
            <div className="h-px bg-slate-800 mx-6" />
            <SettingItem
              icon={Webhook}
              title="External Integrations"
              description="Connect your orchestration data to Slack, Trello, or Jira via Webhooks."
              badge="Beta"
            />
            <div className="h-px bg-slate-800 mx-6" />
            <SettingItem
              icon={Database}
              title="Data Management"
              description="Export your resource distribution logs or reset system telemetry."
            />
          </div>
        </section>

        {/* Global Prefs */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6 pl-2">
            Localization
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden">
            <SettingItem
              icon={Globe}
              title="System Region"
              description="Adjust your timezone for accurate cron-job scheduling and analysis."
            />
          </div>
        </section>
      </div>

      <div className="mt-20 p-8 rounded-[40px] bg-slate-900/40 border border-slate-800 text-center">
        <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
          AllocAI Engine v1.0.4 • Running on Enterprise Node Integration
        </p>
      </div>
    </div>
  );
};

export default Settings;

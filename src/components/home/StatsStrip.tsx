import { HOME_STATS } from "@/lib/homeContent";
import { cn } from "@/helpers/cn";

export const StatsStrip = () => (
  <section aria-label="Company milestones" className="border-b border-line bg-surface">
    <div className="page-pad page-shell grid grid-cols-2 lg:grid-cols-5">
      {HOME_STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col items-center border-b border-line px-4 py-10 text-center lg:border-b-0 lg:py-12",
            index < HOME_STATS.length - 1 && "lg:border-r",
            index === HOME_STATS.length - 1 && "col-span-2 lg:col-span-1"
          )}
        >
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-accent/40 bg-surface-elevated">
            <span className="text-[28px] font-medium tracking-[-0.04em] text-brand sm:text-[32px]">
              {stat.value}
            </span>
          </div>
          <p className="mt-4 max-w-[140px] text-[12px] font-medium uppercase leading-[1.4] tracking-[0.06em] text-ink-faint">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </section>
);

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  items?: string[];
  href?: string;
  icon?: React.ReactNode;
  logo?: string;
  logoClassName?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  initialCount?: number;
  sortOrder?: "asc" | "desc";
  className?: string;
  showMoreText?: string;
  showLessText?: string;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg";
  animationDuration?: number;
  animationDelay?: number;
  showAnimation?: boolean;
}

function DesktopTimelineEntry({
  item,
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "group hidden grid-cols-9 items-start md:grid",
        !item.href && "pointer-events-none"
      )}
    >
      <dl className="col-span-2 pt-1 text-right pr-4">
        <dt className="sr-only">Date</dt>
        <dd
          className={cn(
            "text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground",
            dateClassName
          )}
        >
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </time>
        </dd>
      </dl>
      <div className="col-span-7 flex items-start">
        <div className="relative flex-shrink-0">
          <div
            className={cn("h-full min-h-[4rem] border-l border-border pr-8", lineClassName)}
          />
          <div
            className={cn(
              "absolute -left-1 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/60 transition-colors group-hover:bg-primary",
              !item.icon && "h-2.5 w-2.5",
              dotClassName
            )}
          >
            {item.icon && (
              <div className="h-3 w-3 text-primary-foreground">{item.icon}</div>
            )}
          </div>
        </div>
        <div className="flex items-start gap-4 pb-8">
          {item.logo && (
            <div className="flex-shrink-0 w-10 h-10 mt-0.5 flex items-center justify-center">
              <img src={item.logo} alt="" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3
              className={cn(
                "text-xl font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground",
                titleClassName
              )}
            >
              {item.title}
            </h3>
            {item.description && (
              <p
                className={cn(
                  "text-sm text-muted-foreground group-hover:text-muted-foreground/80",
                  descriptionClassName
                )}
              >
                {item.description}
              </p>
            )}
            {item.items && item.items.map((bullet, i) => (
              <p key={i} className={cn("text-sm text-muted-foreground", descriptionClassName)}>
                · {bullet}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function MobileTimelineEntry({
  item,
  isFirst,
  isLast,
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  isFirst?: boolean;
  isLast?: boolean;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <div className="flex items-stretch md:hidden">
      {/* Year — vertically aligned with dot */}
      <div
        className="w-14 flex-shrink-0 text-right pr-3"
        style={{ paddingTop: isFirst ? 16 : 30 }}
      >
        <span className={cn("text-xs font-medium text-muted-foreground tabular-nums", dateClassName)}>
          {new Date(item.date).toLocaleDateString("en-US", { year: "numeric" })}
        </span>
      </div>

      {/* Line + dot */}
      <div
        className={cn(
          "relative border-l-[1.5px] border-zinc-900 dark:border-zinc-100 flex-shrink-0 w-0",
          isFirst ? "mt-[16px]" : "",
          isLast ? "pb-2" : "pb-10",
          lineClassName
        )}
      >
        <div
          className={cn(
            "absolute -left-[5px] h-2.5 w-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100",
            dotClassName
          )}
          style={{ top: isFirst ? 16 : 30 }}
        />
      </div>

      {/* Content */}
      <div className={cn("flex-1 pl-5", isLast ? "pb-2" : "pb-10")} style={{ paddingTop: isFirst ? 10 : 24 }}>
        {item.logo && (
          <div className="mb-2 h-7 flex items-center">
            <img
              src={item.logo}
              alt=""
              className={cn("h-7 w-auto max-w-[2.5rem] object-contain object-left", item.logoClassName)}
            />
          </div>
        )}
        <h3 className={cn("text-base font-semibold tracking-tight text-foreground leading-snug", titleClassName)}>
          {item.title}
        </h3>
        {item.description && (
          <p className={cn("mt-1 text-sm text-muted-foreground", descriptionClassName)}>
            {item.description}
          </p>
        )}
        {item.items && (
          <ul className="mt-1 space-y-0.5">
            {item.items.map((bullet, i) => (
              <li key={i} className={cn("text-sm text-muted-foreground", descriptionClassName)}>
                · {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Timeline({
  items,
  initialCount = 5,
  sortOrder = "desc",
  className,
  showMoreText = "Show More",
  showLessText = "Show Less",
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
  buttonVariant = "ghost",
  buttonSize = "sm",
  animationDuration = 0.3,
  animationDelay = 0.1,
  showAnimation = true,
}: TimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const sortedItems = [...items].sort((a, b) => {
    const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return sortOrder === "asc" ? -diff : diff;
  });
  const initialItems = sortedItems.slice(0, initialCount);
  const remainingItems = sortedItems.slice(initialCount);

  return (
    <div className={cn("ml-6 mr-4 max-w-2xl md:mx-auto", className)}>
      <div className="md:translate-x-28">
        <ul className="space-y-0">
          {initialItems.map((item, index) => {
            const globalIndex = index;
            const totalCount = sortedItems.length <= initialCount
              ? initialItems.length
              : (showAll ? sortedItems.length : initialItems.length);
            const isFirst = globalIndex === 0;
            const isLast = !showAll && globalIndex === initialItems.length - 1;
            return (
              <motion.li
                key={index}
                initial={showAnimation ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: animationDuration,
                  delay: index * animationDelay,
                }}
              >
                <DesktopTimelineEntry
                  item={item}
                  dotClassName={dotClassName}
                  lineClassName={lineClassName}
                  titleClassName={titleClassName}
                  descriptionClassName={descriptionClassName}
                  dateClassName={dateClassName}
                />
                <MobileTimelineEntry
                  item={item}
                  isFirst={isFirst}
                  isLast={isLast}
                  dotClassName={dotClassName}
                  lineClassName={lineClassName}
                  titleClassName={titleClassName}
                  descriptionClassName={descriptionClassName}
                  dateClassName={dateClassName}
                />
              </motion.li>
            );
          })}
          <AnimatePresence>
            {showAll &&
              remainingItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: animationDuration,
                    delay: index * animationDelay,
                  }}
                >
                  <DesktopTimelineEntry
                    item={item}
                    dotClassName={dotClassName}
                    lineClassName={lineClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    dateClassName={dateClassName}
                  />
                  <MobileTimelineEntry
                    item={item}
                    dotClassName={dotClassName}
                    lineClassName={lineClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    dateClassName={dateClassName}
                  />
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      </div>
      {remainingItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className="gap-2"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? showLessText : showMoreText}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

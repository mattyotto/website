import React from 'react';
import { cn } from '@/lib/utils';

export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  cardClassName?: string;
}

const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  cardClassName,
}) => {
  return (
    <div
      role="list"
      className={cn(
        'group grid w-full grid-cols-2 gap-3',
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          aria-label={`${item.title}, ${item.subtitle}`}
          tabIndex={0}
          className={cn(
            'relative h-[250px] cursor-pointer overflow-hidden rounded-xl bg-cover bg-center shadow-lg transition-all duration-500 ease-in-out',
            'group-hover:scale-[0.97] group-hover:opacity-60 group-hover:blur-[2px]',
            'hover:!scale-105 hover:!opacity-100 hover:!blur-none focus-visible:!scale-105 focus-visible:!opacity-100 focus-visible:!blur-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            cardClassName
          )}
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <p className="text-[9px] font-light uppercase tracking-widest opacity-80">
              {item.subtitle}
            </p>
            <h3 className="mt-0.5 text-sm font-semibold leading-tight">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverRevealCards;

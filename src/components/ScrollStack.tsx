import React, { Children, isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemId?: string;
  itemClassName?: string;
  children: ReactNode;
}

const hasHeightClass = (className: string) =>
  /\bh-(?:\[|full\b|screen\b|svh\b|dvh\b)|\bmin-h-/.test(className);

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemId, itemClassName = '' }) => {
  const defaultHeightClass = hasHeightClass(itemClassName)
    ? ''
    : 'h-[72dvh] min-h-[350px] lg:h-[min(72vh,760px)] lg:min-h-[500px] xl:h-[min(72vh,820px)]';

  return (
    <div
      id={itemId}
      className={`scroll-stack-card relative w-full ${defaultHeightClass} p-8 md:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onActiveIndexChange?: (index: number) => void;
  onStackComplete?: () => void;
}

type CardTransform = {
  scale: number;
  rotation: number;
  blur: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const parseOffset = (value: string | number, viewportHeight: number) => {
  if (typeof value === 'number') return value;

  const numericValue = Number.parseFloat(value);
  if (Number.isNaN(numericValue)) return 0;
  if (value.includes('%') || value.includes('vh') || value.includes('dvh') || value.includes('svh')) {
    return (numericValue / 100) * viewportHeight;
  }

  return numericValue;
};

const getWindowScrollTop = () => window.scrollY || document.documentElement.scrollTop || 0;

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onActiveIndexChange,
  onStackComplete
}) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const naturalTopsRef = useRef<number[]>([]);
  const frameRef = useRef<number | null>(null);
  const stackCompletedRef = useRef(false);
  const activeIndexRef = useRef(-1);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());
  const [stickyTop, setStickyTop] = useState(0);
  const [scaleEndTop, setScaleEndTop] = useState(0);

  const updateOffsets = useCallback(() => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    setStickyTop(parseOffset(stackPosition, viewportHeight));
    setScaleEndTop(parseOffset(scaleEndPosition, viewportHeight));
  }, [scaleEndPosition, stackPosition]);

  const getScrollTop = useCallback(() => {
    if (useWindowScroll) {
      return getWindowScrollTop();
    }

    return stackRef.current?.scrollTop ?? 0;
  }, [useWindowScroll]);

  const getContainerHeight = useCallback(() => {
    if (useWindowScroll) {
      return window.innerHeight || document.documentElement.clientHeight;
    }

    return stackRef.current?.clientHeight ?? 0;
  }, [useWindowScroll]);

  const getDocumentTop = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.top + getWindowScrollTop();
  };

  const measureNaturalTops = useCallback(() => {
    const wrappers = wrappersRef.current;
    if (!wrappers.length) return;

    const previousStyles = wrappers.map(wrapper => ({
      position: wrapper.style.position,
      top: wrapper.style.top,
      zIndex: wrapper.style.zIndex
    }));

    wrappers.forEach(wrapper => {
      wrapper.style.position = 'relative';
      wrapper.style.top = 'auto';
      wrapper.style.zIndex = '';
    });

    naturalTopsRef.current = wrappers.map(wrapper =>
      useWindowScroll ? getDocumentTop(wrapper) : wrapper.offsetTop
    );

    wrappers.forEach((wrapper, index) => {
      wrapper.style.position = previousStyles[index].position;
      wrapper.style.top = previousStyles[index].top;
      wrapper.style.zIndex = previousStyles[index].zIndex;
    });
  }, [useWindowScroll]);

  const getWrapperTop = useCallback(
    (wrapper: HTMLElement, index: number) => {
      return naturalTopsRef.current[index] ?? (useWindowScroll ? getDocumentTop(wrapper) : wrapper.offsetTop);
    },
    [useWindowScroll]
  );

  const applyCardTransforms = useCallback(() => {
    if (!wrappersRef.current.length || !cardsRef.current.length) return;

    const scrollTop = getScrollTop();
    const containerHeight = getContainerHeight();
    if (!containerHeight) return;

    const topCardIndex = wrappersRef.current.reduce((activeIndex, wrapper, index) => {
      const triggerStart = getWrapperTop(wrapper, index) - stickyTop - itemStackDistance * index;
      return scrollTop >= triggerStart ? index : activeIndex;
    }, 0);

    if (activeIndexRef.current !== topCardIndex) {
      activeIndexRef.current = topCardIndex;
      onActiveIndexChange?.(topCardIndex);
    }

    wrappersRef.current.forEach((wrapper, index) => {
      const card = cardsRef.current[index];
      if (!card) return;

      const wrapperTop = getWrapperTop(wrapper, index);
      const nextWrapper = wrappersRef.current[index + 1];
      const triggerStart = wrapperTop - stickyTop - itemStackDistance * index;
      const fallbackDistance = Math.max(containerHeight * Math.max(scaleDuration, 0.2), itemDistance);
      const triggerEnd = nextWrapper
        ? getWrapperTop(nextWrapper, index + 1) - scaleEndTop - itemStackDistance * (index + 1)
        : triggerStart + fallbackDistance;
      const progress = clamp((scrollTop - triggerStart) / Math.max(triggerEnd - triggerStart, 1));
      const targetScale = Math.min(1, baseScale + itemScale * index);
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount ? rotationAmount * index * progress : 0;
      const depthInStack = Math.max(0, topCardIndex - index);
      const blur = blurAmount ? depthInStack * blurAmount : 0;
      const nextTransform = {
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };
      const lastTransform = lastTransformsRef.current.get(index);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translateZ(0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : '';
        lastTransformsRef.current.set(index, nextTransform);
      }
    });

    const lastWrapper = wrappersRef.current[wrappersRef.current.length - 1];
    if (!lastWrapper) return;

    const lastIndex = wrappersRef.current.length - 1;
    const lastStart = getWrapperTop(lastWrapper, lastIndex) - stickyTop - itemStackDistance * lastIndex;
    const stackEnd = getWrapperTop(lastWrapper, lastIndex) + lastWrapper.offsetHeight - containerHeight * 0.5;
    const isComplete = scrollTop >= lastStart && scrollTop <= stackEnd;
    if (isComplete && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (!isComplete && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [
    baseScale,
    getContainerHeight,
    getScrollTop,
    getWrapperTop,
    itemDistance,
    itemScale,
    itemStackDistance,
    onActiveIndexChange,
    onStackComplete,
    rotationAmount,
    scaleDuration,
    scaleEndTop,
    stickyTop,
    blurAmount
  ]);

  const requestUpdate = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      applyCardTransforms();
      frameRef.current = null;
    });
  }, [applyCardTransforms]);

  useLayoutEffect(() => {
    updateOffsets();
  }, [updateOffsets]);

  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;

    wrappersRef.current = Array.from(root.querySelectorAll<HTMLElement>('.scroll-stack-card-shell'));
    cardsRef.current = Array.from(root.querySelectorAll<HTMLElement>('.scroll-stack-card'));
    cardsRef.current.forEach(card => {
      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform, filter';
    });

    measureNaturalTops();
    requestUpdate();

    const scrollTarget: Window | HTMLElement = useWindowScroll ? window : root;
    const handleResize = () => {
      updateOffsets();
      measureNaturalTops();
      requestUpdate();
    };

    scrollTarget.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      stackCompletedRef.current = false;
      activeIndexRef.current = -1;
      lastTransformsRef.current.clear();
      naturalTopsRef.current = [];
      wrappersRef.current = [];
      cardsRef.current = [];
    };
  }, [measureNaturalTops, requestUpdate, updateOffsets, useWindowScroll]);

  useEffect(() => {
    measureNaturalTops();
    requestUpdate();
  }, [measureNaturalTops, requestUpdate, stickyTop, scaleEndTop]);

  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const bottomPadding = `max(${Math.round(stickyTop + itemStackDistance * items.length + 160)}px, 28vh)`;

  return (
    <div
      className={`scroll-stack relative w-full ${useWindowScroll ? 'overflow-visible' : 'h-full overflow-y-auto overflow-x-visible'} ${className}`.trim()}
      ref={stackRef}
      style={
        useWindowScroll
          ? undefined
          : {
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch'
            }
      }
    >
      <div className="scroll-stack-inner relative w-full px-0 md:px-2 pt-4" style={{ paddingBottom: bottomPadding }}>
        {items.map((child, index) => {
          const shellStyle: CSSProperties = {
            marginBottom: index === items.length - 1 ? 0 : itemDistance,
            position: 'sticky',
            top: stickyTop + itemStackDistance * index,
            zIndex: index + 1
          };

          return (
            <div className="scroll-stack-card-shell" key={child.key ?? index} style={shellStyle}>
              {child}
            </div>
          );
        })}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
};

export default ScrollStack;

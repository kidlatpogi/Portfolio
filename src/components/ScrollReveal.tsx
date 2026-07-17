import React, { useRef, useMemo } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: 'div' | 'p' | 'h2' | 'span' | 'section';
  simpleReveal?: boolean;
}

const motionCache = new Map<any, any>();

function getMotionComponent(Component: any) {
  if (!motionCache.has(Component)) {
    motionCache.set(Component, motion.create(Component));
  }
  return motionCache.get(Component);
}

const ScrollReveal: React.FC<ScrollRevealProps> = (props) => {
  if (props.simpleReveal) {
    return <SimpleScrollReveal {...props} />;
  }
  return <WordScrollReveal {...props} />;
};

const SimpleScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = false,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  wordAnimationEnd,
  rotationEnd,
  scrollContainerRef,
  as,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const endOffset = useMemo(() => {
    if (!wordAnimationEnd) return "start 50%";
    const parts = wordAnimationEnd.split(/\s+/);
    if (parts.length === 2) {
      const target = parts[0] === 'top' ? 'start' : parts[0] === 'bottom' ? 'end' : parts[0];
      const container = parts[1];
      return `${target} ${container}`;
    }
    return wordAnimationEnd;
  }, [wordAnimationEnd]);

  const { scrollYProgress } = useScroll({
    target: containerRef as any,
    container: scrollContainerRef || undefined,
    offset: ["start 90%", endOffset as any]
  });

  const rotationEndVal = useMemo(() => {
    if (!rotationEnd) return 0.45;
    const parsed = parseFloat(rotationEnd);
    return isNaN(parsed) ? 0.45 : parsed;
  }, [rotationEnd]);

  const rotate = useTransform(scrollYProgress, [0, rotationEndVal], [baseRotation, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0.05, 0.3], [baseOpacity, 1], { clamp: true });
  const blurVal = useTransform(scrollYProgress, [0.05, 0.3], [blurStrength, 0], { clamp: true });
  const filter = useTransform(blurVal, (v) => enableBlur ? `blur(${v}px)` : 'none');
  const y = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const Component = as || 'div';
  const MotionComponent = getMotionComponent(Component as any);

  const hasParallax = containerClassName.includes('parallax-y') || containerClassName.includes('reveal-item');
  const style = {
    rotate,
    transformOrigin: '0% 50%',
    opacity,
    filter: enableBlur ? filter : undefined,
    y: hasParallax ? y : undefined,
  };

  if (!as) {
    return (
      <h2 
        ref={containerRef as any} 
        className={`my-5 ${containerClassName}`}
      >
        <motion.p 
          style={style}
          className={`text-[clamp(1.4rem,2.8vw,2.5rem)] leading-[1.5] font-semibold ${textClassName}`}
        >
          {children}
        </motion.p>
      </h2>
    );
  }

  return (
    <MotionComponent 
      ref={containerRef as any} 
      style={style}
      className={`${containerClassName} ${textClassName}`}
    >
      {children}
    </MotionComponent>
  );
};

const WordScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = false,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  wordAnimationEnd,
  rotationEnd,
  scrollContainerRef,
  as,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const endOffset = useMemo(() => {
    if (!wordAnimationEnd) return "start 50%";
    const parts = wordAnimationEnd.split(/\s+/);
    if (parts.length === 2) {
      const target = parts[0] === 'top' ? 'start' : parts[0] === 'bottom' ? 'end' : parts[0];
      const container = parts[1];
      return `${target} ${container}`;
    }
    return wordAnimationEnd;
  }, [wordAnimationEnd]);

  const { scrollYProgress } = useScroll({
    target: containerRef as any,
    container: scrollContainerRef || undefined,
    offset: ["start 90%", endOffset as any]
  });

  const rotationEndVal = useMemo(() => {
    if (!rotationEnd) return 0.45;
    const parsed = parseFloat(rotationEnd);
    return isNaN(parsed) ? 0.45 : parsed;
  }, [rotationEnd]);

  const rotate = useTransform(scrollYProgress, [0, rotationEndVal], [baseRotation, 0], { clamp: true });

  const splitText = useMemo(() => {
    let wordCount = 0;
    
    const countWords = (node: ReactNode): number => {
      if (node === null || node === undefined) return 0;
      if (typeof node === 'string' || typeof node === 'number') {
        return String(node).split(/\s+/).filter(word => word !== '').length;
      }
      if (Array.isArray(node)) {
        return node.reduce((acc, child) => acc + countWords(child), 0);
      }
      if (React.isValidElement(node)) {
        return countWords((node as React.ReactElement<any>).props.children);
      }
      return 0;
    };

    const totalWords = countWords(children) || 1;

    const renderNode = (node: ReactNode): ReactNode => {
      if (node === null || node === undefined) return node;

      if (typeof node === 'string' || typeof node === 'number') {
        return String(node).split(/(\s+)/).filter(word => word !== '').map((word, idx) => {
          if (word.match(/^\s+$/)) return word;
          
          const currentWordIndex = wordCount;
          wordCount += 1;

          const startProgress = 0.05 + (currentWordIndex / totalWords) * 0.65;
          const endProgress = Math.min(0.95, startProgress + 0.25);

          return (
            <Word
              key={`word-${currentWordIndex}-${idx}`}
              scrollYProgress={scrollYProgress}
              start={startProgress}
              end={endProgress}
              baseOpacity={baseOpacity}
              blurStrength={blurStrength}
              enableBlur={enableBlur}
            >
              {word}
            </Word>
          );
        });
      }

      if (Array.isArray(node)) {
        return node.map((child, idx) => (
          <React.Fragment key={`frag-${idx}`}>{renderNode(child)}</React.Fragment>
        ));
      }

      if (React.isValidElement(node)) {
        const props = node.props as { className?: string; children?: ReactNode };
        const children = props.children;
        
        const isLeaf = !children || (typeof children === 'string' && children.trim() === '');
        const hasSingleTextChild = typeof children === 'string' || typeof children === 'number';
        const isInlineFlex = props.className?.includes('inline-flex');
        const isRevealLeaf = props.className?.split(/\s+/).some(cls => cls === 'reveal-item' || cls === 'scroll-reveal-leaf');

        if (isLeaf || hasSingleTextChild || isInlineFlex || isRevealLeaf) {
          const needsInlineBlock = !props.className?.split(/\s+/).some(cls =>
             cls === 'inline-block' || cls === 'inline-flex' || cls === 'flex' || cls === 'block'
          );
          const className = [props.className, 'word', needsInlineBlock ? 'inline-block' : ''].filter(Boolean).join(' ');
          
          const currentWordIndex = wordCount;
          wordCount += 1;
          const startProgress = 0.05 + (currentWordIndex / totalWords) * 0.65;
          const endProgress = Math.min(0.95, startProgress + 0.25);

          return (
            <Word
              key={`el-${currentWordIndex}`}
              scrollYProgress={scrollYProgress}
              start={startProgress}
              end={endProgress}
              baseOpacity={baseOpacity}
              blurStrength={blurStrength}
              enableBlur={enableBlur}
              as={node.type as any}
              props={props}
              className={className}
            />
          );
        }

        const processedChildren = React.Children.map(children, child => renderNode(child));
        return React.cloneElement(node as React.ReactElement<any>, { ...props, key: `container-${wordCount}` }, processedChildren);
      }

      return node;
    };

    return renderNode(children);
  }, [children, scrollYProgress, baseOpacity, blurStrength, enableBlur]);

  const Component = as || 'div';
  const MotionComponent = getMotionComponent(Component as any);

  if (!as) {
    return (
      <h2 
        ref={containerRef as any} 
        className={`my-5 ${containerClassName}`}
      >
        <motion.p 
          style={{ rotate, transformOrigin: '0% 50%' }}
          className={`text-[clamp(1.4rem,2.8vw,2.5rem)] leading-[1.5] font-semibold ${textClassName}`}
        >
          {splitText}
        </motion.p>
      </h2>
    );
  }

  return (
    <MotionComponent 
      ref={containerRef as any} 
      style={{ rotate, transformOrigin: '0% 50%' }}
      className={`${containerClassName} ${textClassName}`}
    >
      {splitText}
    </MotionComponent>
  );
};

interface WordProps {
  children?: ReactNode;
  scrollYProgress: any;
  start: number;
  end: number;
  baseOpacity: number;
  blurStrength: number;
  enableBlur: boolean;
  as?: any;
  props?: any;
  className?: string;
}

const Word: React.FC<WordProps> = (props) => {
  if (props.enableBlur) {
    return <BlurWord {...props} />;
  }
  return <OpacityWord {...props} />;
};

const OpacityWord: React.FC<WordProps> = ({
  children,
  scrollYProgress,
  start,
  end,
  baseOpacity,
  as: Component = 'span',
  props = {},
  className = ''
}) => {
  const opacity = useTransform(scrollYProgress, [start, end], [baseOpacity, 1], { clamp: true });

  const hasDisplayClass = className.split(/\s+/).some(cls => {
    const baseClass = cls.split(':').pop() || '';
    return ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid'].includes(baseClass);
  });

  const hasParallax = className.includes('parallax-y');
  const y = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const MotionComp = getMotionComponent(Component);

  return (
    <MotionComp
      {...props}
      style={{
        ...props.style,
        opacity,
        y: hasParallax ? y : undefined,
        display: hasDisplayClass ? undefined : 'inline-block',
        willChange: hasParallax ? 'opacity, transform' : 'opacity'
      }}
      className={`${className} word`}
    >
      {children || props.children}
    </MotionComp>
  );
};

const BlurWord: React.FC<WordProps> = ({
  children,
  scrollYProgress,
  start,
  end,
  baseOpacity,
  blurStrength,
  as: Component = 'span',
  props = {},
  className = ''
}) => {
  const opacity = useTransform(scrollYProgress, [start, end], [baseOpacity, 1], { clamp: true });
  const blurVal = useTransform(scrollYProgress, [start, end], [blurStrength, 0], { clamp: true });
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  const hasDisplayClass = className.split(/\s+/).some(cls => {
    const baseClass = cls.split(':').pop() || '';
    return ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid'].includes(baseClass);
  });

  const hasParallax = className.includes('parallax-y');
  const y = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const MotionComp = getMotionComponent(Component);

  return (
    <MotionComp
      {...props}
      style={{
        ...props.style,
        opacity,
        filter,
        y: hasParallax ? y : undefined,
        display: hasDisplayClass ? undefined : 'inline-block',
        willChange: hasParallax ? 'opacity, filter, transform' : 'opacity, filter'
      }}
      className={`${className} word`}
    >
      {children || props.children}
    </MotionComp>
  );
};

export default ScrollReveal;

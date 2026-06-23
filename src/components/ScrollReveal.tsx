import React, { useEffect, useRef, useMemo } from 'react';
import type { ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: 'div' | 'p' | 'h2' | 'span' | 'section';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const indexRef = { current: 0 };
    const processNode = (node: ReactNode): ReactNode => {
      if (node === null || node === undefined) return node;

      if (typeof node === 'string' || typeof node === 'number') {
        return String(node).split(/(\s+)/).filter(word => word !== '').map((word, idx) => {
          if (word.match(/^\s+$/)) return word;
          indexRef.current += 1;
          return (
            <span className="inline-block word" key={`word-${indexRef.current}-${idx}`}>
              {word}
            </span>
          );
        });
      }

      if (Array.isArray(node)) {
        return node.map((child, idx) => (
          <React.Fragment key={`frag-${idx}`}>{processNode(child)}</React.Fragment>
        ));
      }

      if (React.isValidElement(node)) {
        const props = node.props as { className?: string; children?: ReactNode };
        const children = props.children;

        // If it's a leaf node element (like img, svg, or small icon) or a simple text container
        const isLeaf = !children || (typeof children === 'string' && children.trim() === '');
        const hasSingleTextChild = typeof children === 'string' || typeof children === 'number';
        const isInlineFlex = props.className?.includes('inline-flex');
        const isRevealLeaf = props.className?.split(/\s+/).some(cls => cls === 'reveal-item' || cls === 'scroll-reveal-leaf');

        if (isLeaf || hasSingleTextChild || isInlineFlex || isRevealLeaf) {
          const needsInlineBlock = !props.className?.split(/\s+/).some(cls =>
            cls === 'inline-block' || cls === 'inline-flex' || cls === 'flex' || cls === 'block'
          );
          const className = [props.className, 'word', needsInlineBlock ? 'inline-block' : ''].filter(Boolean).join(' ');
          indexRef.current += 1;
          return React.cloneElement(node as React.ReactElement<any>, {
            ...props,
            className,
            key: `el-${indexRef.current}`
          });
        }

        // Otherwise, process container children recursively
        const processedChildren = React.Children.map(children, child => processNode(child));
        return React.cloneElement(node as React.ReactElement<any>, { ...props, key: `container-${indexRef.current}` }, processedChildren);
      }

      return node;
    };

    return React.Children.map(children, child => processNode(child));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      // Rotation effect
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true
          }
        }
      );

      const wordElements = el.querySelectorAll<HTMLElement>('.word');

      // Opacity reveal effect
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );

      // Blur reveal effect
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true
            }
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  const Component = as || 'div';

  if (!as) {
    return (
      <h2 ref={containerRef as React.RefObject<HTMLHeadingElement | null>} className={`my-5 ${containerClassName}`}>
        <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>{splitText}</p>
      </h2>
    );
  }

  return (
    <Component ref={containerRef as React.RefObject<any>} className={`${containerClassName} ${textClassName}`}>
      {splitText}
    </Component>
  );
};

export default ScrollReveal;

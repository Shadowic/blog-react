import React, { useEffect, useRef, useState, ReactNode } from 'react';
import styles from "./Heading.module.scss";

interface HeadingProps {
    icon?: ReactNode;
    heading?: ReactNode;
    caption?: ReactNode;
    children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
         icon,
         heading,
         caption,
         children
     }) => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [headingStyle, setHeadingStyle] = useState<React.CSSProperties>({});

    const updateHeadingStyle = () => {
        if (headingRef.current) {
            const bElement = headingRef.current.querySelector('b');
            if (bElement) {
                const text = bElement.textContent?.trim() || '';
                setHeadingStyle({
                    '--heading-text': `"${text}"`
                } as React.CSSProperties);
            }
        }
    };

    useEffect(() => {
        updateHeadingStyle();
    }, [heading]);

    useEffect(() => {
        const observer = new MutationObserver(updateHeadingStyle);

        if (headingRef.current) {
            observer.observe(headingRef.current, {
                characterData: true,
                subtree: true,
                childList: true
            });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.heading}>
            <div>
                {heading && (
                    <h1
                        className={styles.titleWithGlitch}
                        style={headingStyle}
                        ref={headingRef}
                    >
                        {icon && (
                            <i>
                                {icon}
                            </i>
                        )}
                        {heading}
                    </h1>
                )}
            </div>
            {caption && (
                <p className={styles.heading__caption}>
                    {caption}
                </p>
            )}
            {children}
        </div>
    );
};

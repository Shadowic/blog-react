import type { FC, ReactNode } from "react";
import * as React from "react";
import styles from "./ItemList.module.scss";

interface Identifiable {
    id: string | number;
}

export interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor?: (item: T, index: number) => string | number;
    loading?: boolean;
    emptyMessage?: string | React.ReactNode;
    className?: string;
    listClassName?: string;
    itemClassName?: string;
    grid?: boolean;
    columns?: number;
    gap?: string;
    as?: keyof JSX.IntrinsicElements;
}

function hasId<T>(item: T): item is T & Identifiable {
    return item != null && typeof item === "object" && "id" in item;
}

export const ItemList = <T,>({
                                 items,
                                 renderItem,
                                 keyExtractor,
                                 loading = false,
                                 emptyMessage = "No items found",
                                 className = "",
                                 listClassName = "",
                                 itemClassName = "",
                                 grid = true,
                                 columns = 3,
                                 gap = "20px",
                                 as: Container = "div",
                             }: ItemListProps<T>) => {
    const getKey = (item: T, index: number): string | number => {
        if (keyExtractor) {
            return keyExtractor(item, index);
        }

        if (hasId(item)) {
            return item.id;
        }

        return index;
    };

    const gridStyle = grid
        ? {
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${Math.floor(100 / columns)}%, 1fr))`,
            gap,
        }
        : {};

    if (loading) {
        return (
            <Container className={`${styles.container} ${className}`}>
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner} />
                    <span className={styles.loadingText}>Loading...</span>
                </div>
            </Container>
        );
    }

    if (!items || items.length === 0) {
        return (
            <Container className={`${styles.container} ${className}`}>
                <div className={styles.empty}>
                    {typeof emptyMessage === "string" ? (
                        <p className={styles.emptyText}>{emptyMessage}</p>
                    ) : (
                        emptyMessage
                    )}
                </div>
            </Container>
        );
    }

    return (
        <Container className={`${styles.container} ${className}`}>
            <div
                className={`${styles.list} ${listClassName}`}
                style={gridStyle}
            >
                {items.map((item, index) => (
                    <div
                        key={getKey(item, index)}
                        className={`${styles.item} ${itemClassName}`}
                    >
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>
        </Container>
    );
};

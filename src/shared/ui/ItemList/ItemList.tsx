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
    gridVariant?: 'grid-2' | 'grid-3' | 'grid-4' | 'no-grid';
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
         gridVariant = 'grid-4',
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

    if (loading) {
        return (
            <div className={`${styles.loading} ${className}`}>
                <div className={styles.loadingSpinner} />
                <span className={styles.loadingText}>Loading...</span>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className={`${styles.empty} ${className}`}>
                {typeof emptyMessage === "string" ? (
                    <p className={styles.emptyText}>{emptyMessage}</p>
                ) : (
                    emptyMessage
                )}
            </div>
        );
    }

    return (
        <div className={`${styles.list} ${styles[`list--${gridVariant}`]} ${listClassName} ${className}`}>
            {items.map((item, index) => (
                <React.Fragment key={getKey(item, index)}>
                    {renderItem(item, index)}
                </React.Fragment>
            ))}
        </div>
    );
};

export interface TUseSet<T> {
    current: Set<T>;
    add: (item: T) => void;
    remove: (item: T) => void;
    has: (item: T) => boolean | undefined;
    toArray: (item: T) => T[];
}
export class ArrayUtils {
    public static flatMap<T, R>(arr: T[], func: (x: T) => R): R {
        const res = arr.reduce((ys: any[], x: any) => {
            return ys.concat(func.call(this, x))
        }, []) as any;
        return res as R;
    }

    public static diff<T>(arr1: T[], arr2: T[]): T[] {
        return arr1.filter(i => arr2.indexOf(i) < 0);
    }
}

interface Sorter {
    sort: <T>(els: T[], comparator: Comparator) => T[];
}

enum SortType {
    INSERTION = "INSERTION",
    SELECTION = "SELECTION",
    MERGE = "MERGE",
    QUICK = "QUICK"
}

type SortFunction = <T>(els: T[]) => T[];

type Sorters = { [key in SortType]: SortFunction }


export const NUMBER_COMPARATOR = (a: number, b: number) => a - b > 0;
export const sorters: Sorters = {
    [SortType.INSERTION]: <T>(els: T[]): T[] => {

        // first el is considered sorted

        // insert each el relative

        // eg [3,4,1,2]
        for (let i = 0; i < els.length; i++) {
            // the current idx we're sorting
            let currentIdx = i;

            // while we're not at start of array and cur val is < val to the left
            // swap them and decrement pointer
            while (currentIdx > 0 && els[currentIdx] < els[currentIdx - 1]) {
                const temp = els[currentIdx];
                els[currentIdx] = els[currentIdx - 1];
                els[currentIdx - 1] = temp;
                currentIdx--
            }
        }

        return els;
    },
    [SortType.SELECTION]: () => [],
    [SortType.MERGE]: <T>(els: T[]): T[] => {
        // console.log('els ', els)
        // base case
        if (els.length <= 1) {
            return els;
        }

        // find mid, left, & right
        const mid = Math.floor(els.length / 2);
        const left = sorters.MERGE(els.slice(0, mid));
        const right = sorters.MERGE(els.slice(mid));

        // get pointers, merge lists
        let lP = 0;
        let rP = 0;
        const merged = [];

        while (lP < mid || rP < els.length - mid) {
            const leftVal = left[lP];
            const rightVal = right[rP];
            // if nothing on left take right
            if (lP === mid) {
                merged.push(rightVal);
                rP++;
            }
            // if nothing on right take left
            else if (rP === els.length - mid) {
                merged.push(leftVal);
                lP++;
            }
            // if left < right take left
            else if (leftVal <= rightVal) {
                merged.push(leftVal);
                lP++;
            }
            // otherwise take right
            else {
                merged.push(rightVal);
                rP++
            }
        }

        // console.log('merged ', merged)
        return merged;
    },
    [SortType.QUICK]: () => [],
}
import {NUMBER_COMPARATOR, sorters} from "./sorter";


const getUnsortedList = () => [5, 7, 8, 9, 3, 5, 47, 1, 2, 3, 5, 8];
console.log('unsorted ', getUnsortedList());

// const insertionSorted = sorters.INSERTION(getUnsortedList());
const mergedSorted = sorters.MERGE(getUnsortedList())

// console.log('insertion ', insertionSorted);
console.log('merged ', mergedSorted);
export function getPageCount(total: number, limit: number): number {
    return Math.ceil(total / limit);
}

// export function getPagesArray(pagesNum: number): number[] {
//     const result: number[] = [];

//     for (let index = 0; index < pagesNum; index += 1) {
//         result.push(index + 1);
//     }

//     return result;
// }

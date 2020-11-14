export class NumberComposer {
    public getNumberCompositions(n: number, length: number): number[][] {
        const result: number[][] = [];

        this._separate(n + length - 1, (array: number[]) => {
            console.log(array);
            if (array.length === length) { result.push(array); }
        });

        return result;
    }


    private _separate(n: number, callback) {
        for (let i = 0; i < n; i++) {
            this._separate(n - i - 1, ret => {
                ret.push(i);
                callback(ret);
            });
        }
        callback([n]);
    }
}

import { Value } from 'interfaces/Cell'
import { expectError, expectNotType, expectType, expectAssignable } from 'tsd'
import { FormulaCell, Cell, SourceCell, cell, map } from '../index'

// formula with one input
{
    const numberCell = cell(1)
    const formulaCell = map((x) => x + 1, numberCell)
    const justNumber = map((x) => x + 1, 1)

    expectType<SourceCell<number>>(numberCell)

    expectType<FormulaCell<number>>(formulaCell)
    expectNotType<number>(formulaCell)

    expectType<number>(justNumber)
    expectNotType<FormulaCell<number>>(justNumber)

    expectError(map((x: string) => x.toUpperCase(), numberCell))
    expectError(map((x) => x.toUpperCase(), numberCell))
}

{
    function callIf<T, U>(
        cellOrValue: Cell<T> | T,
        cb: (arg: T) => U
    ): U | null {
        const res = map((value) => {
            if (value) {
                return cb(value)
            }
            return null
        }, cellOrValue)

        return res
    }
}

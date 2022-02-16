import { Cell, Value } from '../interfaces/Cell'
import { FormulaCell, formula, UnwrapCell } from './FormulaCell'

/**
 * Accepts a cell and creates a cell of tuple [newValue, oldValue]
 * initially oldValue is undefined
 */
export function history<T extends Value<unknown>, U = UnwrapCell<T>>(
    cell: T
): T extends Cell<any> ? FormulaCell<[U, U | undefined]> : [U, U | undefined] {
    let oldVal: U | undefined = undefined
    return formula((newVal: U) => {
        const result: [U, U | undefined] = [newVal, oldVal]
        oldVal = newVal
        return result
    }, cell)
}

/**
 * Accepts a field name and a cell a record and creates a new cell
 * that represents a single field of the source cell
 */
export function field<F, K extends keyof F>(
    fieldName: K,
    fromCell: Cell<F>
): FormulaCell<F[K]> {
    return new FormulaCell((fromVal: F) => fromVal[fieldName], fromCell)
}

export function byIndex<T>(
    index: number,
    source: Cell<T[]>
): FormulaCell<T | undefined> {
    return new FormulaCell((fromVal: T[]) => fromVal[index], source)
}

export function toBool(source: Cell<unknown>): Value<boolean> {
    return new FormulaCell((fromVal: unknown) => Boolean(fromVal), source)
}

export function not(source: Cell<unknown>): Value<boolean> {
    return new FormulaCell((fromVal: unknown) => !Boolean(fromVal), source)
}

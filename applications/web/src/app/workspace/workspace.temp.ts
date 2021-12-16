import { Income, Source } from "./model/income.model";
import { Outcome, Category } from "./model/outcome.model";

/*////////////////// TEMP CODE!!! //////////////////*/
export const tempIncomes = [
    new Income(
        new Date(2020, 1, 14),
        new Date(2021, 5, 23),
        Source.Salary,
        12.12,
    ),
    new Income(
        new Date(1920, 5, 14),
        new Date(2000, 6, 18),
        Source.Deposit,
        56.1,
    ),
    new Income(
        new Date(1944, 1, 19),
        new Date(2010, 3, 23),
        Source.Salary,
        114.99,
    ),
    new Income(
        new Date(1947, 2, 29),
        new Date(2003, 11, 13),
        Source.Salary,
        2214.42,
    ),
    new Income(
        new Date(2000, 1, 1),
        new Date(2006, 10, 1),
        Source.Deposit,
        638452,
    ),
];

export const tempOutcomes = [
    new Outcome(new Date(2017, 4, 23),  Category.Sport, 12.12),
    new Outcome(new Date(1959, 8, 20),  Category.Food,  356.12, "potatoes"),
    new Outcome(new Date(1968, 7, 29),  Category.Food,  789,    "potatoes, tomatoes, fruits"),
    new Outcome(new Date(2000, 1, 1),   Category.Sport, 126978, "chess"),
    new Outcome(new Date(2004, 10, 25), Category.Sport, 10.1),
];
/*//////////////////////////////////////////////////*/

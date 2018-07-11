import uuid from 'uuid/v4'
import moment from 'moment'

let budget;

const loadBudget = () => {
    const budgetJSON = localStorage.getItem('budget');

    try {
        budget = budgetJSON ? JSON.parse(budgetJSON) : { income: [], expense: [], balanceSum: 0 }
    } catch(e) {
        budget = { income: [], expense: [], balanceSum: 0 }
    }
}

const saveBudget = () => {
    const budget = JSON.stringify(getBudget())
    localStorage.setItem('budget', budget)
}

const getBudget = () => budget;

const getIncomeList = () => budget.income

const getExpenseList = () => budget.expense

const getIncSum = () => budget.totalIncome

const getExpSum = () => budget.totalExpense

const getBalance = () => budget.balanceSum

const getListItem = (id, keyName) => budget[keyName].find( (item) => item.id === id)

const addBudget = (title, value, keyName) => {
    const timeStamp = moment().valueOf();

    budget[keyName].push({
        id: uuid(),
        title: title,
        value: value,
        created: timeStamp,
        lastEdited: timeStamp
    })
    calcBudget()
}

const calcBudget = () => {
    const sum = (a, b) =>  a + b.value
    const totalInc = (budget.income.reduce(sum, 0))
    const totalExp = (budget.expense.reduce(sum, 0))
    budget.totalIncome = totalInc
    budget.totalExpense = totalExp
    budget.balanceSum = totalInc - totalExp
    saveBudget()
}

const removeFromBudget = (id, keyName) => {
    const itemIndex = budget[keyName].indexOf( (item) => item.id === id)
    budget[keyName].splice(itemIndex, 1)

    calcBudget()
}

const updateBudget = (id, updates, keyName) => {
    const item = budget[keyName].find((item) => item.id === id)

    if (!item) {
        return
    }

    const timeStamp = moment().valueOf();

    if (typeof updates.value === 'number') {
        item.value = updates.value
        item.lastEdited = timeStamp
    }

    if (typeof updates.title === 'string') {
        item.title = updates.title
        item.lastEdited = timeStamp
    }

    calcBudget()
}

loadBudget()

export { loadBudget, getBudget, saveBudget, addBudget, removeFromBudget, updateBudget, getIncomeList, getExpenseList, getListItem, getBalance, getExpSum, getIncSum }
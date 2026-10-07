import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import '../../styles/budget.css'

function Budget() {

    const { expenses } = useGlobalContext()

    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem('monthlyBudget')
        return savedBudget ? Number(savedBudget) : 30000
    })

    const [budgetInput, setBudgetInput] = useState(budget)

    useEffect(() => {
        localStorage.setItem('monthlyBudget', budget)
    }, [budget])

    const currentDate = new Date()

    const currentMonthExpenses = expenses.filter((expense) => {

        const expenseDate = new Date(expense.date)

        return (
            expenseDate.getMonth() === currentDate.getMonth() &&
            expenseDate.getFullYear() === currentDate.getFullYear()
        )

    })

    const monthlySpent = currentMonthExpenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    )

    const remaining = budget - monthlySpent

    const percentage = budget > 0
        ? Math.min((monthlySpent / budget) * 100, 100)
        : 0

    const handleBudgetSubmit = (e) => {

        e.preventDefault()

        const newBudget = Number(budgetInput)

        if (newBudget > 0) {
            setBudget(newBudget)
        }

    }

    return (
        <div className="budget-card">

            <div className="budget-header">

                <div>
                    <h2>
                        Monthly Budget
                    </h2>

                    <p>
                        Track your spending for this month
                    </p>
                </div>

                <div className="budget-icon">
                    ₹
                </div>

            </div>

            <form
                className="budget-form"
                onSubmit={handleBudgetSubmit}
            >

                <input
                    type="number"
                    min="1"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    placeholder="Enter monthly budget"
                />

                <button type="submit">
                    Set Budget
                </button>

            </form>

            <div className="budget-summary">

                <div>
                    <span>
                        Budget
                    </span>

                    <strong>
                        ₹{budget.toLocaleString('en-IN')}
                    </strong>
                </div>

                <div>
                    <span>
                        Spent
                    </span>

                    <strong className="spent-amount">
                        ₹{monthlySpent.toLocaleString('en-IN')}
                    </strong>
                </div>

                <div>
                    <span>
                        Remaining
                    </span>

                    <strong className={
                        remaining < 0
                            ? 'remaining danger'
                            : 'remaining'
                    }>
                        ₹{remaining.toLocaleString('en-IN')}
                    </strong>
                </div>

            </div>

            <div className="budget-progress">

                <div className="progress-track">

                    <div
                        className={
                            percentage >= 100
                                ? 'progress-fill danger'
                                : percentage >= 80
                                    ? 'progress-fill warning'
                                    : 'progress-fill'
                        }
                        style={{
                            width: `${percentage}%`
                        }}
                    ></div>

                </div>

                <div className="progress-info">

                    <span>
                        {Math.round(percentage)}% used
                    </span>

                    <span>
                        {currentMonthExpenses.length} transactions
                    </span>

                </div>

            </div>

            {monthlySpent >= budget && (

                <div className="budget-alert danger-alert">
                    You have exceeded your monthly budget.
                </div>

            )}

            {monthlySpent >= budget * 0.8 &&
                monthlySpent < budget && (

                    <div className="budget-alert warning-alert">
                        You have used more than 80% of your monthly budget.
                    </div>

                )}

        </div>
    )
}

export default Budget
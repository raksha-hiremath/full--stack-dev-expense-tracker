import React from 'react'
import { useGlobalContext } from '../../context/globalContext'
import '../../styles/insights.css'

function Insights() {

    const { expenses } = useGlobalContext()

    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    )

    const averageExpense =
        expenses.length > 0
            ? totalExpense / expenses.length
            : 0

    const largestExpense =
        expenses.length > 0
            ? expenses.reduce((largest, expense) =>
                Number(expense.amount) > Number(largest.amount)
                    ? expense
                    : largest
            )
            : null

    const categoryTotals = {}

    expenses.forEach((expense) => {

        const category = expense.category || 'other'

        categoryTotals[category] =
            (categoryTotals[category] || 0) +
            Number(expense.amount)

    })

    const highestCategory =
        Object.keys(categoryTotals).length > 0
            ? Object.keys(categoryTotals).reduce((highest, category) =>
                categoryTotals[category] > categoryTotals[highest]
                    ? category
                    : highest
            )
            : null

    return (
        <div className="insights-card">

            <div className="insights-header">

                <div>
                    <h2>Spending Insights</h2>

                    <p>
                        Understand your spending patterns
                    </p>
                </div>

                <div className="insights-icon">
                    %
                </div>

            </div>

            <div className="insights-grid">

                <div className="insight-item">

                    <span className="insight-label">
                        Highest Category
                    </span>

                    <strong>
                        {highestCategory
                            ? highestCategory.charAt(0).toUpperCase() +
                              highestCategory.slice(1)
                            : 'No data'
                        }
                    </strong>

                    <small>
                        {highestCategory
                            ? `₹${categoryTotals[highestCategory].toLocaleString('en-IN')}`
                            : 'Add expenses to see insights'
                        }
                    </small>

                </div>

                <div className="insight-item">

                    <span className="insight-label">
                        Largest Expense
                    </span>

                    <strong>
                        {largestExpense
                            ? largestExpense.title
                            : 'No data'
                        }
                    </strong>

                    <small>
                        {largestExpense
                            ? `₹${Number(largestExpense.amount).toLocaleString('en-IN')}`
                            : 'No expenses recorded'
                        }
                    </small>

                </div>

                <div className="insight-item">

                    <span className="insight-label">
                        Average Expense
                    </span>

                    <strong>
                        ₹{Math.round(averageExpense).toLocaleString('en-IN')}
                    </strong>

                    <small>
                        Per transaction
                    </small>

                </div>

                <div className="insight-item">

                    <span className="insight-label">
                        Total Transactions
                    </span>

                    <strong>
                        {expenses.length}
                    </strong>

                    <small>
                        Expense records
                    </small>

                </div>

            </div>

        </div>
    )
}

export default Insights
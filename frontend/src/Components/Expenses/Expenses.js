import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import ExpenseForm from './ExpenseForm'
import '../../styles/expenses.css'

function Expenses() {

    const {
        expenses,
        getExpenses,
        deleteExpense,
        totalExpenses
    } = useGlobalContext()

    useEffect(() => {
        getExpenses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const expenseTotal = totalExpenses()

    return (
        <div className="expense-container">

            <InnerLayout>

                {/* Page Header */}

                <div className="expense-header">

                    <div>
                        <h1 className="expense-title">
                            Expenses
                        </h1>

                        <p className="expense-subtitle">
                            Track and manage where your money is being spent
                        </p>
                    </div>

                </div>

                {/* Total Expense */}

                <div className="expense-total-card">

                    <div>
                        <p className="expense-total-label">
                            Total Expenses
                        </p>

                        <h2 className="expense-total-amount">
                            ₹{expenseTotal.toLocaleString('en-IN')}
                        </h2>

                        <p className="expense-total-description">
                            Total money spent from your recorded expenses
                        </p>
                    </div>

                    <div className="expense-total-icon">
                        ₹
                    </div>

                </div>

                {/* Main Content */}

                <div className="expense-content">

                    {/* Add Expense */}

                    <div className="expense-form-card">

                        <div className="expense-section-heading">

                            <h2>
                                Add Expense
                            </h2>

                            <p>
                                Record a new expense
                            </p>

                        </div>

                        <ExpenseForm />

                    </div>

                    {/* Expense History */}

                    <div className="expense-history-card">

                        <div className="expense-section-heading">

                            <h2>
                                Expense History
                            </h2>

                            <p>
                                Your recorded expenses
                            </p>

                        </div>

                        <div className="expenses">

                            {expenses.length === 0 ? (

                                <div className="expense-empty">

                                    <h3>
                                        No expenses recorded
                                    </h3>

                                    <p>
                                        Add your first expense using the form.
                                    </p>

                                </div>

                            ) : (

                                expenses.map((expense) => {

                                    const {
                                        _id,
                                        title,
                                        amount,
                                        date,
                                        category,
                                        description
                                    } = expense

                                    return (

                                        <div
                                            className="expense-card"
                                            key={_id}
                                        >

                                            <div className="expense-card-main">

                                                <div className="expense-card-title">
                                                    {title}
                                                </div>

                                                <div className="expense-card-category">
                                                    {category}
                                                </div>

                                                <div className="expense-card-description">
                                                    {description}
                                                </div>

                                                <div className="expense-card-date">
                                                    {new Date(date).toLocaleDateString('en-IN')}
                                                </div>

                                            </div>

                                            <div className="expense-card-right">

                                                <div className="expense-card-amount">
                                                    - ₹{Number(amount).toLocaleString('en-IN')}
                                                </div>

                                                <button
                                                    className="delete-expense-btn"
                                                    onClick={() => deleteExpense(_id)}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    )

                                })

                            )}

                        </div>

                    </div>

                </div>

            </InnerLayout>

        </div>
    )
}

export default Expenses
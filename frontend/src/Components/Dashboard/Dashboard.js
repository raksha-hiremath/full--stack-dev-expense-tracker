import React, { useEffect } from 'react'
import '../../styles/dashboard.css'
import { useGlobalContext } from '../../context/globalContext'
import History from '../../History/History'
import { InnerLayout } from '../../styles/Layouts'
import Budget from '../budget/Budget'
import Insights from '../insights/Insights'
import Chart from '../Chart/Chart'

function Dashboard() {
    const {
        incomes,
        expenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        getIncomes,
        getExpenses
    } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const incomeTotal = totalIncome()
    const expenseTotal = totalExpenses()
    const balanceTotal = totalBalance()

    return (
        <div className="dashboard-container">
            <InnerLayout>

                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">
                            Dashboard Overview
                        </h1>
                        <p className="dashboard-subtitle">
                            Here's your complete financial overview
                        </p>
                    </div>
                </div>

                <div className="amount-con">

                    <div className="money-card income">
                        <div className="card-header">
                            <span className="card-label">
                                Total Income
                            </span>

                            <span className="card-icon income-icon">
                                ₹
                            </span>
                        </div>
                        <Budget />
                        <Insights />

                        <p className="money-value">
                            ₹{incomeTotal.toLocaleString('en-IN')}
                        </p>

                        <span className="card-description">
                            Total money received
                        </span>
                    </div>

                    <div className="money-card expense">
                        <div className="card-header">
                            <span className="card-label">
                                Total Expense
                            </span>

                            <span className="card-icon expense-icon">
                                ₹
                            </span>
                        </div>

                        <p className="money-value">
                            ₹{expenseTotal.toLocaleString('en-IN')}
                        </p>

                        <span className="card-description">
                            Total money spent
                        </span>
                    </div>

                    <div className="money-card balance">
                        <div className="card-header">
                            <span className="card-label">
                                Available Balance
                            </span>

                            <span className="card-icon balance-icon">
                                ₹
                            </span>
                        </div>

                        <p className="money-value">
                            ₹{balanceTotal.toLocaleString('en-IN')}
                        </p>

                        <span className="card-description">
                            Income minus expenses
                        </span>
                    </div>

                </div>

                <div className="dashboard-grid">

                    <div className="chart-section">
                        <div className="section-heading">
                            <h2>Spending Overview</h2>
                            <p>Your income and expense breakdown</p>
                        </div>

                        <Chart />
                    </div>

                    <div className="history-section">
                        <History />

                        <h2 className="salary-title">
                            Min <span>Income</span> Max
                        </h2>

                        <div className="salary-item">
                            <p>
                                ₹{incomes.length > 0
                                    ? Math.min(...incomes.map(item => item.amount)).toLocaleString('en-IN')
                                    : 0}
                            </p>

                            <p>
                                ₹{incomes.length > 0
                                    ? Math.max(...incomes.map(item => item.amount)).toLocaleString('en-IN')
                                    : 0}
                            </p>
                        </div>

                        <h2 className="salary-title">
                            Min <span>Expense</span> Max
                        </h2>

                        <div className="salary-item">
                            <p>
                                ₹{expenses.length > 0
                                    ? Math.min(...expenses.map(item => item.amount)).toLocaleString('en-IN')
                                    : 0}
                            </p>

                            <p>
                                ₹{expenses.length > 0
                                    ? Math.max(...expenses.map(item => item.amount)).toLocaleString('en-IN')
                                    : 0}
                            </p>
                        </div>
                    </div>

                </div>

            </InnerLayout>
        </div>
    )
}

export default Dashboard
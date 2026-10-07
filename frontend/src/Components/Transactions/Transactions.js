import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import '../../styles/transactions.css'

function Transactions() {

    const {
        incomes,
        expenses,
        getIncomes,
        getExpenses
    } = useGlobalContext()

    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const transactions = [...incomes, ...expenses]

    const filteredTransactions = transactions.filter((transaction) => {

        const matchesSearch =
            transaction.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        const matchesType =
            filterType === 'all' ||
            transaction.type === filterType

        const matchesCategory =
            filterCategory === 'all' ||
            transaction.category === filterCategory

        return matchesSearch && matchesType && matchesCategory
    })

    return (
        <div className="transactions-container">

            <InnerLayout>

                <h1 className="transactions-title">
                    Transactions
                </h1>

                <p className="transactions-subtitle">
                    View and manage all your income and expenses
                </p>

                <div className="transaction-filters">

                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="salary">Salary</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="groceries">Groceries</option>
                        <option value="food">Food</option>
                        <option value="travelling">Travelling</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="other">Other</option>
                    </select>

                </div>

                <div className="transaction-list">

                    {filteredTransactions.length === 0 ? (

                        <div className="no-transactions">
                            <h2>No transactions found</h2>
                            <p>
                                Try changing your search or filters.
                            </p>
                        </div>

                    ) : (

                        filteredTransactions.map((transaction) => (

                            <div
                                className="transaction-card"
                                key={transaction._id}
                            >

                                <div className="transaction-info">

                                    <h3>
                                        {transaction.title}
                                    </h3>

                                    <p>
                                        {transaction.category}
                                    </p>

                                </div>

                                <div
                                    className={
                                        transaction.type === 'income'
                                            ? 'transaction-amount income-text'
                                            : 'transaction-amount expense-text'
                                    }
                                >
                                    {transaction.type === 'income'
                                        ? `+ ₹${transaction.amount}`
                                        : `- ₹${transaction.amount}`
                                    }
                                </div>

                            </div>

                        ))

                    )}

                </div>

            </InnerLayout>

        </div>
    )
}

export default Transactions
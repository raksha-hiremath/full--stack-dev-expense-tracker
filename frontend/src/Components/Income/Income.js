import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import Form from '../Form/Form'
import IncomeItem from '../IncomeItem/IncomeItem'
import '../../styles/income.css'

function Income() {

    const {
        incomes,
        getIncomes,
        deleteIncome,
        totalIncome
    } = useGlobalContext()

    useEffect(() => {
        getIncomes()
    }, [])

    const incomeTotal = totalIncome()

    return (
        <div className="income-container">

            <InnerLayout>

                {/* Page Header */}

                <div className="income-header">

                    <div>
                        <h1 className="income-title">
                            Income
                        </h1>

                        <p className="income-subtitle">
                            Track and manage the money you receive
                        </p>
                    </div>

                </div>

                {/* Total Income */}

                <div className="income-total-card">

                    <div>
                        <p className="income-total-label">
                            Total Income
                        </p>

                        <h2 className="income-total-amount">
                            ₹{incomeTotal.toLocaleString('en-IN')}
                        </h2>

                        <p className="income-total-description">
                            Total income recorded in your account
                        </p>
                    </div>

                    <div className="income-total-icon">
                        ₹
                    </div>

                </div>

                {/* Income Content */}

                <div className="income-content">

                    {/* Add Income */}

                    <div className="income-form-card">

                        <div className="income-section-heading">

                            <h2>
                                Add Income
                            </h2>

                            <p>
                                Record a new source of income
                            </p>

                        </div>

                        <Form />

                    </div>

                    {/* Income History */}

                    <div className="income-history-card">

                        <div className="income-section-heading">

                            <h2>
                                Income History
                            </h2>

                            <p>
                                Your recently recorded income
                            </p>

                        </div>

                        <div className="incomes">

                            {incomes.length === 0 ? (

                                <div className="income-empty">

                                    <h3>
                                        No income recorded
                                    </h3>

                                    <p>
                                        Add your first income using the form.
                                    </p>

                                </div>

                            ) : (

                                incomes.map((income) => {

                                    const {
                                        _id,
                                        title,
                                        amount,
                                        date,
                                        category,
                                        description,
                                        type
                                    } = income

                                    return (
                                        <IncomeItem
                                            key={_id}
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount}
                                            date={date}
                                            type={type}
                                            category={category}
                                            indicatorColor="var(--color-green)"
                                            deleteItem={deleteIncome}
                                        />
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

export default Income
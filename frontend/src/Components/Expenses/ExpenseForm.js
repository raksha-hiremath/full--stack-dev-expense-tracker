import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utils/Icons'
import '../../styles/form.css'

function ExpenseForm() {

    const {
        addExpense,
        error,
        setError
    } = useGlobalContext()

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const {
        title,
        amount,
        date,
        category,
        description
    } = inputState

    const handleInput = name => e => {

        setInputState({
            ...inputState,
            [name]: e.target.value
        })

        setError('')
    }

    const handleSubmit = e => {

        e.preventDefault()

        addExpense(inputState)

        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        <form
            className="finance-form expense-form"
            onSubmit={handleSubmit}
        >

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            <div className="form-group">

                <label htmlFor="expense-title">
                    Expense Title
                </label>

                <input
                    id="expense-title"
                    type="text"
                    value={title}
                    name="title"
                    placeholder="e.g. Groceries, Books"
                    required
                    onChange={handleInput('title')}
                />

            </div>

            <div className="form-group">

                <label htmlFor="expense-amount">
                    Amount
                </label>

                <div className="amount-input">

                    <span>
                        ₹
                    </span>

                    <input
                        id="expense-amount"
                        value={amount}
                        type="number"
                        min="0"
                        placeholder="Enter amount"
                        name="amount"
                        required
                        onChange={handleInput('amount')}
                    />

                </div>

            </div>

            <div className="form-group">

                <label>
                    Date
                </label>

                <DatePicker
                    id="expense-date"
                    placeholderText="Select expense date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    required
                    onChange={(date) => {
                        setInputState({
                            ...inputState,
                            date: date
                        })
                    }}
                />

            </div>

            <div className="form-group">

                <label htmlFor="expense-category">
                    Category
                </label>

                <select
                    required
                    value={category}
                    name="category"
                    id="expense-category"
                    onChange={handleInput('category')}
                >

                    <option value="" disabled>
                        Select category
                    </option>

                    <option value="education">
                        Education
                    </option>

                    <option value="groceries">
                        Groceries
                    </option>

                    <option value="health">
                        Health
                    </option>

                    <option value="subscriptions">
                        Subscriptions
                    </option>

                    <option value="takeaways">
                        Takeaways
                    </option>

                    <option value="clothing">
                        Clothing
                    </option>

                    <option value="travelling">
                        Travelling
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

            </div>

            <div className="form-group">

                <label htmlFor="expense-description">
                    Description
                </label>

                <textarea
                    name="description"
                    value={description}
                    placeholder="Add a note or reference"
                    id="expense-description"
                    rows="4"
                    required
                    onChange={handleInput('description')}
                />

            </div>

            <div className="form-submit">

                <Button
                    name="Add Expense"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="12px"
                    bg="var(--color-accent)"
                    color="#fff"
                />

            </div>

        </form>
    )
}

export default ExpenseForm
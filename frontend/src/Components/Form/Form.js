import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utils/Icons'
import '../../styles/form.css'

function Form() {

    const {
        addIncome,
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

        addIncome(inputState)

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
            className="finance-form"
            onSubmit={handleSubmit}
        >

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            {/* Income Title */}

            <div className="form-group">

                <label htmlFor="income-title">
                    Income Title
                </label>

                <input
                    id="income-title"
                    type="text"
                    value={title}
                    name="title"
                    placeholder="e.g. Salary, Freelance"
                    required
                    onChange={handleInput('title')}
                />

            </div>

            {/* Amount */}

            <div className="form-group">

                <label htmlFor="income-amount">
                    Amount
                </label>

                <div className="amount-input">

                    <span>₹</span>

                    <input
                        id="income-amount"
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

            {/* Date */}

            <div className="form-group">

                <label>
                    Date
                </label>

                <DatePicker
                    id="date"
                    placeholderText="Select income date"
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

            {/* Category */}

            <div className="form-group">

                <label htmlFor="income-category">
                    Category
                </label>

                <select
                    required
                    value={category}
                    name="category"
                    id="income-category"
                    onChange={handleInput('category')}
                >

                    <option value="" disabled>
                        Select category
                    </option>

                    <option value="salary">
                        Salary
                    </option>

                    <option value="freelancing">
                        Freelancing
                    </option>

                    <option value="investments">
                        Investments
                    </option>

                    <option value="stocks">
                        Stocks
                    </option>

                    <option value="bitcoin">
                        Bitcoin
                    </option>

                    <option value="bank">
                        Bank Transfer
                    </option>

                    <option value="youtube">
                        YouTube
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

            </div>

            {/* Description */}

            <div className="form-group">

                <label htmlFor="income-description">
                    Description
                </label>

                <textarea
                    name="description"
                    value={description}
                    placeholder="Add a note or reference"
                    id="income-description"
                    rows="4"
                    required
                    onChange={handleInput('description')}
                />

            </div>

            {/* Submit */}

            <div className="form-submit">

                <Button
                    name="Add Income"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="12px"
                    bg="var(--color-green)"
                    color="#fff"
                />

            </div>

        </form>
    )
}

export default Form
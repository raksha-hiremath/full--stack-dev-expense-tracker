import React, { useState } from "react";
import "../../styles/savings.css";

function Savings() {
    const [goals, setGoals] = useState([
        {
            id: 1,
            name: "Emergency Fund",
            target: 30000,
            saved: 18000
        },
        {
            id: 2,
            name: "New Laptop",
            target: 60000,
            saved: 25000
        }
    ]);

    const [name, setName] = useState("");
    const [target, setTarget] = useState("");
    const [saved, setSaved] = useState("");

    const [addingTo, setAddingTo] = useState(null);
    const [additionalAmount, setAdditionalAmount] = useState("");

    const addGoal = (e) => {
        e.preventDefault();

        if (!name || !target || !saved) return;

        const newGoal = {
            id: Date.now(),
            name,
            target: Number(target),
            saved: Number(saved)
        };

        setGoals([...goals, newGoal]);

        setName("");
        setTarget("");
        setSaved("");
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const addSavings = (id) => {
        const amount = Number(additionalAmount);

        if (!amount || amount <= 0) return;

        setGoals(
            goals.map(goal => {
                if (goal.id === id) {
                    return {
                        ...goal,
                        saved: Math.min(goal.saved + amount, goal.target)
                    };
                }

                return goal;
            })
        );

        setAdditionalAmount("");
        setAddingTo(null);
    };

    return (
        <div className="savings-page">

            <div className="savings-header">
                <div>
                    <h1>Savings Goals</h1>
                    <p>
                        Track your savings and achieve your financial goals.
                    </p>
                </div>
            </div>

            <div className="savings-grid">

                {/* ADD GOAL */}
                <div className="savings-form-card">
                    <h2>Add Savings Goal</h2>

                    <form onSubmit={addGoal}>

                        <input
                            type="text"
                            placeholder="Goal name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Target amount"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Amount already saved"
                            value={saved}
                            onChange={(e) => setSaved(e.target.value)}
                        />

                        <button type="submit">
                            Add Goal
                        </button>

                    </form>
                </div>

                {/* GOALS */}
                <div className="goals-container">

                    {goals.map((goal) => {

                        const percentage = Math.min(
                            (goal.saved / goal.target) * 100,
                            100
                        );

                        return (
                            <div className="goal-card" key={goal.id}>

                                <div className="goal-top">

                                    <div>
                                        <h3>{goal.name}</h3>

                                        <p>
                                            ₹{goal.saved.toLocaleString("en-IN")}
                                            {" "}of{" "}
                                            ₹{goal.target.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <button
                                        className="delete-goal"
                                        onClick={() => deleteGoal(goal.id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                                {/* PROGRESS BAR */}
                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${percentage}%`
                                        }}
                                    ></div>

                                </div>

                                <div className="goal-bottom">

                                    <span>
                                        {percentage.toFixed(0)}% completed
                                    </span>

                                    <span>
                                        ₹{Math.max(
                                            goal.target - goal.saved,
                                            0
                                        ).toLocaleString("en-IN")} remaining
                                    </span>

                                </div>

                                {/* ADD SAVINGS */}
                                {addingTo === goal.id ? (

                                    <div className="add-savings-box">

                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={additionalAmount}
                                            onChange={(e) =>
                                                setAdditionalAmount(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                addSavings(goal.id)
                                            }
                                        >
                                            Add
                                        </button>

                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => {
                                                setAddingTo(null);
                                                setAdditionalAmount("");
                                            }}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                ) : (

                                    <button
                                        type="button"
                                        className="add-money-btn"
                                        onClick={() =>
                                            setAddingTo(goal.id)
                                        }
                                    >
                                        + Add Savings
                                    </button>

                                )}

                            </div>
                        );
                    })}

                </div>

            </div>

        </div>
    );
}

export default Savings;
import React from 'react'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import '../../styles/navigation.css'

function Navigation({ active, setActive }) {

    return (
        <nav className="navigation">

            <div className="user-section">

                <img
                    src={avatar}
                    alt="Profile"
                    className="user-avatar"
                />

                <div className="user-info">
                    <h2>Mike</h2>
                    <p>Personal Finance</p>
                </div>

            </div>

            <div className="nav-divider"></div>

            <div className="menu-heading">
                MENU
            </div>

            <ul className="menu-items">

                {menuItems.map((item) => {

                    return (
                        <li
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={
                                active === item.id
                                    ? 'menu-item active'
                                    : 'menu-item'
                            }
                        >

                            <span className="menu-icon">
                                {item.icon}
                            </span>

                            <span className="menu-title">
                                {item.title}
                            </span>

                        </li>
                    )

                })}

            </ul>

            <div className="bottom-nav">

                <div className="signout-button">
                    <span className="menu-icon">
                        {signout}
                    </span>

                    <span>
                        Sign Out
                    </span>
                </div>

            </div>

        </nav>
    )
}

export default Navigation
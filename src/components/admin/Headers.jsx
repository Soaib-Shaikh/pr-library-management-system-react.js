import React from 'react'
import { NavLink} from 'react-router'

function Headers({handleLogout}) {
    

    return (
        
        <div >
            <header className="app-header">
                    <div className="app-header-inner">
                        <div className="container py-2">
                            <div className="app-header-content">
                                <div className="row align-items-center header-row">
                                    <div className="col-auto">
                                        <NavLink id="sidepanel-toggler" className="sidepanel-toggler d-inline-block d-xl-none" to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" role="img"><title>Menu</title><path stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={2} d="M4 7h22M4 15h22M4 23h22" /></svg>
                                        </NavLink>
                                    </div>{/*//col*/}
                                    <div className="search-mobile-trigger d-sm-none col">
                                        <i className="search-mobile-trigger-icon fa-solid fa-magnifying-glass" />
                                    </div>{/*//col*/}
                                    
                                    <div className="app-utilities col-auto ">
                                        
                                        <div className="app-utility-item app-user-dropdown dropdown">
                                            <NavLink className="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false"><img src="assets/images/user.png" alt="user profile" /></NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                                                <li><NavLink className="dropdown-item" to="account.html">Account</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="settings.html">Settings</NavLink></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    {/* Updated Log Out with handler */}
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={handleLogout}
                                                    >
                                                        Log Out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>{/*//app-user-dropdown*/}
                                    </div>{/*//app-utilities*/}
                                </div>{/*//row*/}
                            </div>
                        </div>
                    </div>
                    <div id="app-sidepanel" className="app-sidepanel">
                        <div id="sidepanel-drop" className="sidepanel-drop" />
                        <div className="sidepanel-inner d-flex flex-column">
                            <NavLink to="#" id="sidepanel-close" className="sidepanel-close d-xl-none">×</NavLink>
                            <div className="app-branding">
                                <NavLink className="app-logo" to="/admin"><img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" /><span className="logo-text">Library</span></NavLink>
                            </div>{/*//app-branding*/}
                            <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
                                <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                                    <li className="nav-item">
                                        {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                                        <NavLink className="nav-link active" to="/admin">
                                            <span className="nav-icon">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" />
                                                    <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                                </svg>
                                            </span>
                                            <span className="nav-link-text">Dashboard</span>
                                        </NavLink>{/*//nav-link*/}
                                    </li>{/*//nav-item*/}
                                    <li className="nav-item has-submenu">
                                        {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                                        <NavLink className="nav-link submenu-toggle" to="/admin/add-book" aria-expanded="false" aria-controls="submenu-1">
                                            <span className="nav-icon">

                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z" />
                                                    <path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z" />
                                                </svg>
                                            </span>
                                            <span className="nav-link-text">Add Book</span>

                                        </NavLink>{/*//nav-link*/}
                                    </li>
                                    <li className="nav-item">
                                        {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                                        <NavLink className="nav-link" to="/admin/view-books">
                                            <span className="nav-icon">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bar-chart-line" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                                                </svg>
                                            </span>
                                            <span className="nav-link-text">View Books</span>
                                        </NavLink>{/*//nav-link*/}
                                    </li>{/*//nav-item*/}
                                </ul>{/*//app-menu*/}
                            </nav>{/*//app-nav*/}
                        </div>{/*//sidepanel-inner*/}
                    </div>{/*//app-sidepanel*/}
                    </header>
    
                </div>
            )
    }
    
    export default Headers

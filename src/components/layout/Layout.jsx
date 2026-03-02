import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Routers from '../routers/Routers'
import { BrowserRouter as Router } from 'react-router-dom'
function Layout() {
    return (
        <Router>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <Routers />
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default Layout

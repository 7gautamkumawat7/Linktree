import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

                    {/* Left Section */}
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-lg font-semibold">MyWebsite</h1>
                        <p className="text-sm text-gray-400">© 2026 All rights reserved.</p>
                    </div>


                </div>
            </footer>

        </div>
    )
}

export default Footer
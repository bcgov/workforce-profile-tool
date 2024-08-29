import type { Metadata } from 'next'
import client from './client'

export const metadata: Metadata = {
    title: 'Workforce Profiles',
    description: 'A tool to help you find the right job for you.',
}

export const viewport = 'theme-color=#000000'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/solid.css"
                    integrity="sha384-v2Tw72dyUXeU3y4aM2Y0tBJQkGfplr39mxZqlTBDUZAb9BGoC40+rdFCG0m10lXk" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/fontawesome.css"
                    integrity="sha384-q3jl8XQu1OpdLgGFvNRnPdj5VIlCvgsDQTQB6owSOHWlAurxul7f+JpUOVdAiJ5P" crossOrigin="anonymous" />

                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossOrigin="anonymous"></script>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>
            </head>

            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <div id="root" className="h-100">
                    {children}
                </div>
            </body>

        </html >
    )
}
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/lib/providers'
import { ThemeProvider } from '@/components/theme-provider'
import { GeistSans, GeistMono } from 'geist/font'

export const metadata: Metadata = {
	title: 'Trade Journal',
	description: 'A simple trade journal for traders.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={GeistSans.className}>
				<Providers>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<main className="h-screen">
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	)
}

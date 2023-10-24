import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/lib/providers'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>
				<Providers>
					<main className="bg-primary text-primary-foreground h-screen p-4">
						{children}
					</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}

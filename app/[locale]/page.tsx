import { Button } from "@/components/ui/button";
import {
    Card,
    CardFooter,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import Link from "next/link";
import Icon from "@/components/icon";

export default function RootPage() {
    return (
        <>
            <div className="flex flex-col gap-12 pb-8 px-4 lg:px-8 py-4">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                        Welcome to Wedevs!
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Your all-in-one solution for your business. Let&apos;s get started
                        with setting up your workspace.
                    </p>
                </section>

                {/* Getting Started Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter text-center">Getting Started</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/filters" className="w-full">
                            <Card className="transition-all hover:shadow-lg">
                                <CardHeader>
                                    <Icon name="filter" className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Create Filters</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Set up custom filters to organize and sort your products efficiently.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group" type="button">
                                        Get Started
                                        <Icon name="arrow-right" className="ml-2 transition-transform group-hover:translate-x-1 h-6 w-6" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>

                        <Link href="/categories" className="w-full">
                            <Card className="transition-all hover:shadow-lg">
                                <CardHeader>
                                    <Icon name="tag" className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Manage Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Create and organize categories to better structure your product catalog.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group" type="button">
                                        Get Started
                                        <Icon name="arrow-right" className="ml-2 transition-transform group-hover:translate-x-1 h-6 w-6" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>

                        <Link href="/products" className="w-full">
                            <Card className="transition-all hover:shadow-lg sm:col-span-2 lg:col-span-1">
                                <CardHeader>
                                    <Icon name="package" className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Add Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Start adding your products with detailed information and categorization.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group" type="button">
                                        Get Started
                                        <Icon name="arrow-right" className="ml-2 transition-transform group-hover:translate-x-1 h-6 w-6" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="rounded-lg bg-muted p-8 text-center">
                    <div className="mx-auto max-w-[600px] space-y-4">
                        <h2 className="text-2xl font-bold">Need Help Getting Started?</h2>
                        <p className="text-muted-foreground">
                            Our comprehensive documentation and support team are here to help you make the most of
                            Wedevs.
                        </p>
                        <Button variant="secondary" size="lg" type="button" asChild>
                            <Link href="/docs">View Documentation</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}
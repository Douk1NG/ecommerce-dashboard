import { useFormatter } from 'next-intl';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { Actions } from './actions'

interface PropTypes {
    item: any
}

export default function Index({ item }: PropTypes) {
    const format = useFormatter();

    return (
        <Card className='grid card max-h-[600px]'>
            <CardHeader className='flex-row justify-between items-center'>
                <CardTitle>{item.title}</CardTitle>
                <Actions />
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <div className='relative h-60 w-full'>
                    <Image
                        alt={item.title}
                        src={item.image}
                        loading='lazy'
                        fill
                        style={{
                            objectFit: 'cover',
                            borderRadius: '0.5rem'
                        }}
                    />
                </div>
                <div>
                    {
                        format.number(item.price, {
                            style: 'currency',
                            currency: 'USD'
                        })
                    }
                </div>
                <CardDescription className='overflow-auto h-[100px]'>
                    {item.description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    {item.categories.map((category: string, index: number) =>
                        <Badge key={index}>{category}</Badge>)
                    }
                </div>
            </CardFooter>
        </Card>
    )
}
'use client';
import React from 'react';
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Icons } from '@/lib/types';

import Item from './item';

export interface NavItem {
    title: string;
    label?: string;
    icon: Icons;
    href: string;
    children?: NavItem[];
    index: number;
}

interface NavProps {
    translations: string;
    links: NavItem[];
    visible: boolean;
}

export function Nav({ links, translations, visible }: NavProps) {
    const t = useTranslations(translations);
    const pathname = usePathname();
    const locale = useLocale();

    const isActive = (link: NavItem, children?: NavItem[]) => {
        if (pathname.includes(link.href)) {
            console.log(link.href)
            return true;
        }

        if (children) {
            return children.some(child => pathname.includes(child.href));
        }
        return false;
    }

    return (
        <nav
            aria-label='navigation'
            className={`fixed md:relative top-20 md:top-0 h-full w-60 bg-gray-100 border-r space-y-1 px-3 py-2 z-10 ${visible ? 'block' : 'hidden'} md:block`}
        >
            <ol className='flex flex-col gap-1'>
                {links.map((link, index) => {
                    const active = isActive(link, link.children);
                    return (
                        <li key={index} className='flex flex-col gap-1'>
                            <Item
                                title={t(link.title)}
                                label={link.label}
                                href={link.href}
                                icon={link.icon}
                                locale={locale}
                                isActive={active}
                            />
                            {active && link.children && (
                                <ul className="pl-4">
                                    <li>
                                        {link.children.map(child => (
                                            <Item
                                                key={child.index}
                                                title={t(child.title)}
                                                href={child.href}
                                                icon={child.icon}
                                                label={child.label}
                                                locale={locale}
                                                isActive={isActive(child)}
                                                isChild={true}
                                            />
                                        ))}
                                    </li>
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    )
}
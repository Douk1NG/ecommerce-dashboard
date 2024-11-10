'use client';
import React, { useImperativeHandle } from 'react';
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from "next-intl";
import { useToggle } from '@/hooks';

import Item from './item';

import { getExpandedIcon, isActive } from '@/templates/home/lib/utils';

import type { NavProps } from '@/types/home/nav';

export default function Nav({ links, translations, navRef }: NavProps) {
    const t = useTranslations(translations);
    const pathname = usePathname();
    const locale = useLocale();

    const {
        isVisible,
        toggle
    } = useToggle();

    const visible = isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0';

    useImperativeHandle(navRef, () => {
        return {
            toggleVisibility: toggle
        };
    }, [toggle]);

    return (
        <nav
            aria-label='navigation'
            className={`
                fixed md:relative top-20 md:top-0 h-full w-full md:w-60
                bg-gray-100 border-r space-y-1 px-3 py-2 z-10
                transition-all duration-300 ease-in-out
                transform md:transform-none
                ${visible} md:translate-x-0 md:opacity-100
            `}
        >
            <ol className='flex flex-col gap-1'>
                {links.map((link, index) => {
                    const active = isActive(pathname, link, link.children);
                    const expansibleIcon = getExpandedIcon(active, link.children);

                    return (
                        <li key={index} className='flex flex-col gap-1'>
                            <Item
                                title={t(link.title)}
                                href={link.href}
                                icon={link.icon}
                                locale={locale}
                                isActive={active}
                                onClick={toggle}
                                expansible={expansibleIcon}
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
                                                locale={locale}
                                                isActive={isActive(pathname, child)}
                                                isChild={true}
                                                onClick={toggle}
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
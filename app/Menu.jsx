'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";


const Menu = () => {

    const menu = [
        {title: 'Dnd Kit', path: '/dnd-kit'},
        {title: 'Dnd container', path: '/dnd-container'},
        {title: 'Dnd My List Fields', path: '/dnd-fields'},
    ]

    const pathname = usePathname()

    return (
        <div className='max-w-3xl mx-auto flex gap-2'>
            {menu.map((item, index) => {
                return (
                    <Link key={index} href={item.path} className={`cursor-pointer uppercase p-1 ${
                        pathname === item.path
                            ? 'text-blue-900 font-bold underline'
                            : 'hover:text-blue-500'}`}>
                        {item.title}
                    </Link>
                )
            })}
        </div>
    );
};

export default Menu;

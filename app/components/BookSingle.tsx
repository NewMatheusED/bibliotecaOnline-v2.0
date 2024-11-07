'use client';

import Image from "next/image";
import Link from "next/link";

export default function BookSingle(props: {
    title: string;
    image: string;
}) {
    return (
        <Link href='/book' className="bg-white dark:bg-boxdark drop-shadow dark:drop-shadow-none p-5 hover:scale-105 transition-all cursor-pointer w-[calc(100%_-_15px)] sm:w-[calc(50%_-_15px)] md:w-[calc(33.3333%_-_15px)] lg:w-[calc(25%_-_15px)] xl:w-[calc(20%_-_15px)]">
            <Image className="m-auto text-center" src={props.image} alt={props.title} width={200} height={200} />
            <h2 className="text-black dark:text-white text-lg font-semibold mt-2">{props.title}</h2>
        </Link>
    );
}
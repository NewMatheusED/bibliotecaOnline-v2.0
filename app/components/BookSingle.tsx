'use client';

import Image from "next/image";
import Link from "next/link";

export default function BookSingle(props: {
    title: string;
    image: string;
    id: string;
}) {
    return (
        <Link href={`/book?bookId=${props.id}`} className="bg-white dark:bg-boxdark drop-shadow dark:drop-shadow-none p-5 hover:scale-105 transition-all cursor-pointer w-[calc(100%)] sm:w-[calc(50%_-_8px)] md:w-[calc(33.3333%_-_11px)] lg:w-[calc(25%_-_12px)] xl:w-[calc(20%_-_13px)]">
            <Image className="m-auto text-center" src={props.image} alt={props.title} width={200} height={200} />
            <h2 className="text-black dark:text-white text-lg font-semibold mt-2">{props.title}</h2>
        </Link>
    );
}
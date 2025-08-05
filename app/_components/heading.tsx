import { inter } from "../fonts";
import { PageHeadingProps } from "../types";

export default function PageHeading({ text }: PageHeadingProps) {
    return (
        <h1 className={`${inter.className} py-2 rounded-full w-full mx-auto block text-xl`}>{text}</h1>
    )
}
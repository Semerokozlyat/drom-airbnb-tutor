import Container from "@/app/components/Container";
import {TbBeach} from "react-icons/tb";
import {GiWindmill} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach.'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills.'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern.'
    },
]

export default function Categories() {
    const params = useSearchParams();
    const selectedCategory = params?.get('category');  // get currently selected category
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;   // Explanation: show categories menu only on the main page
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                { categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={selectedCategory === item.label}  // mark currently selected Category
                        icon={item.icon}
                    />
                )) }
            </div>
        </Container>
    );
}
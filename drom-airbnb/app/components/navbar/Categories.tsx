'use client';

import {BsSnow} from "react-icons/bs";
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill
} from "react-icons/gi";
import {IoDiamond} from "react-icons/io5";
import {MdOutlineVilla} from "react-icons/md";
import {FaSkiing} from "react-icons/fa";
import Container from "@/app/components/Container";
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
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside.'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool.'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island.'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake.'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities.'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle.'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities.'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic regions.'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is close to a cave.'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert.'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn.'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is luxury.'
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
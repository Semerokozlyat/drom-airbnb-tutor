import {IconType} from "react-icons";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import qs from 'query-string';

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

export default function CategoryBox( { icon: Icon, label, selected }: CategoryBoxProps ) {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label,  // when browsing CategoryBoxes, selected label will be added to the current query
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;    // it means remove current category from the search when it is clicked again (like toggle on and off)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);  // update URL query parameter in browser
    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
                flex 
                flex-col 
                items-center 
                justify-center 
                gap-2 
                p-3 
                border-b-2 
                hover:text-neutral-800
                transition
                cursor-pointer
                ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                { label }
            </div>
        </div>
    );
}
'use client';

import Modal from '@/app/components/modals/Modal';
import Heading from "@/app/components/Heading";
import Map from "@/app/components/Map";
import {categories} from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import useRentModal from '@/app/hooks/useRentModal';
import {useMemo, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import dynamic from "next/dynamic";

enum STEPS {
    CATEGORY = 0,
    LOCATION =1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

export default function RentModal() {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset  } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',   // Must be named as field in the "Listing" model of Prisma schema!
            price: 1,
            title: '',
            description: ''
        }
    })
    // This code (extracted functions) is required to connect "CategoryInput" component with the Form's "submit" function to
    //  actually pass all the selected fields.

    const category = watch('category');
    const location = watch('location');

    // This part means: re-import Map component every time location is changed.
    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false,
    }), [location]);

    // We need custom function for "setValue" from above to be able to re-render page.
    const setValueCustom = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
           return 'Create';  // Set the button label to 'Create' if user is on the last step.
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;  // There is no 'Back' button on the first step.
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
               "
            >
                { categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => {
                                setValueCustom('category', category)
                            }}
                            selected={ category === item.label }  // The "category" here is taken from "watch('category')" above.
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                )) }
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help potential customers find you!"
                />
                <CountrySelect
                    value={location}  // this location is the one from func "watch(location)" above. Required to save location choice on Next and Back buttons.
                    onChange={(value) => setValueCustom('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
            title="Advertise your home!"
            body={bodyContent}
        />
    );
}
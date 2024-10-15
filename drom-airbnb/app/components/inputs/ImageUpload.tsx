'use client';

import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export default function ImageUpload( { onChange, value }: ImageUploadProps) {
    // Note: in guide, the "Cloudinary" portal is used with "next-cloudinary" Next.js package.
    // TODO: find an alternative and implement image files uploading.

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        // TODO: replace with real image upload widget
        <div>
            <TbPhotoPlus size={50} /> UploadWidget
            <div className="font-semibold text-lg">
                Click to upload
            </div>
            {value && (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        alt="Upload"
                        fill
                        style={{ objectFit: 'cover' }}
                        src="/images/generic-avatar.jpg"    // TODO: replace with actual uploaded image
                    />
                </div>
            )}
        </div>
    );
}
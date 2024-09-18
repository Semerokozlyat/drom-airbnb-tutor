'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '@/app/components/Avatar';
import MenuItem from '@/app/components/navbar/MenuItem';
import {useCallback, useState} from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {User} from "@prisma/client";

interface UserMenuProps {
    currentUser?: User | null
}

export default function UserMenu( { currentUser }: UserMenuProps ) {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    return (
      <div className="relative">
          <div className="flex flex-row items-center gap-3">
              <div
                  onClick={() => {}}
                  className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
              >
                  Advertise your home
              </div>
              <div
                  onClick={toggleOpen}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition cursor-pointer"
              >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                      <Avatar />
                  </div>
              </div>
          </div>
          {isOpen && (     // render only if menu is open
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                      { currentUser ? (
                          <>
                              <MenuItem onClick={() => {}} label="Login"/>
                              <MenuItem onClick={() => {}} label="Sign up"/>
                          </>
                      ) : (
                          <>
                              <MenuItem onClick={loginModal.onOpen} label="Login"/>
                              <MenuItem onClick={registerModal.onOpen} label="Sign up"/>
                          </>
                      )}
                  </div>
              </div>
          )}
      </div>
    );
}
'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '@/app/components/Avatar';
import MenuItem from '@/app/components/navbar/MenuItem';
import {useCallback, useState} from "react";
import { signOut } from 'next-auth/react';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {SafeUser} from "@/app/types";
import LoginModal from "@/app/components/modals/LoginModal";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

export default function UserMenu( { currentUser }: UserMenuProps ) {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
            return;  // return from function and redirect to the Log In modal if user is not logged in.
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

    return (
      <div className="relative">
          <div className="flex flex-row items-center gap-3">
              <div
                  onClick={onRent}
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
                      <Avatar src={currentUser?.image} />
                  </div>
              </div>
          </div>
          {isOpen && (     // render only if menu is open
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                      { currentUser ? (
                          <>
                              <MenuItem onClick={() => {}} label="My trips"/>
                              <MenuItem onClick={() => {}} label="Favourites"/>
                              <MenuItem onClick={() => {}} label="My reservations"/>
                              <MenuItem onClick={() => {}} label="My properties"/>
                              <MenuItem onClick={rentModal.onOpen} label="Advertise my home"/>
                              <hr />
                              <MenuItem onClick={() => signOut()} label="Logout"/>
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
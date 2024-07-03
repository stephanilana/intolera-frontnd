import React, { 
  useState, 
  useCallback, 
  Fragment, 
  useContext, 
  KeyboardEvent, 
} from "react"; 
import { 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuItems, 
  Transition, 
} from "@headlessui/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Person from "@/public/person.svg";
config.autoAddCss = false; /* eslint-disable import/first */
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPhotoFilm,
  faUser,
  faCog,
  faEllipsis,
  faSpinner,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faSquarePlus,
  faCompass,
  faHeart as farHeart,
  faBookmark,
  faPaperPlane,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";

import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { classNames } from "./Register/Helpers";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  console.log(user, "usernavbar");

  library.add(
    faHouse,
    faMagnifyingGlass,
    faPhotoFilm,
    faUser,
    faCog,
    faEllipsis,
    faSpinner,
    fasHeart,
    faCommentDots,
    faSquarePlus,
    faCompass,
    farHeart,
    faBookmark,
    faPaperPlane,
    faFaceSmile,
    faUserPlus
  );

  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search/${e.target.value}`);
    }
  };

  const handleMobileSearchClick = () => {
    router.push("/search");
  };
  return (
    <>
      <nav className="border-b-1 sticky top-0 z-50 min-h-fit w-full border bg-white">
        <div className="">
          <div className="flex flex-row items-center py-1">
            <div className="basis-1/2 pl-3 lg:p-0 ">
              <Link href="/">
                <span className="ml-1 rounded-md bg-blue-100 p-2 font-bold lg:ml-4">
                  INTOLERA
                </span>
              </Link>
            </div>
            <div className="hidden basis-1/2 md:block">
              <div className="relative">
                <FontAwesomeIcon
                  icon="magnifying-glass"
                  className="absolute left-3 top-3 text-gray-300"
                />
                <input
                  id="search"
                  className="w-80 rounded-lg bg-gray-100 p-2 pl-10 align-middle placeholder:font-light focus:outline-0"
                  placeholder="Search"
                  type="text"
                  onKeyDown={handleSearchKeyPress}
                />
              </div>
            </div>
            <div className="basis-1/2">
              <ul className="flex flex-row justify-end space-x-6 p-2 text-2xl">
                <li className="md:hidden">
                  <button onClick={handleMobileSearchClick}>
                    <FontAwesomeIcon icon="magnifying-glass" />
                  </button>
                </li>
                <li>
                  <Link href="/friendsRequests" title="Solicitações de Amizade">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </li>
                <li>
                  <Link
                    className="cursor-pointer"
                    href="/addPost"
                    title="Novo post"
                  >
                    <FontAwesomeIcon icon={["far", "square-plus"]} />
                  </Link>
                </li>
                <li>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-block h-8 w-8 justify-center bg-white text-sm font-medium text-gray-700">
                        <Image
                          className="rounded-full"
                          src={
                            user && user!.profilePicture
                              ? "data:image/svg;base64," + user!.profilePicture
                              : Person
                          }
                          alt={"Foto de Perfil"}
                          width={100}
                          height={100}
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block cursor-pointer px-4 py-2 text-sm"
                                )}
                                href={`/profilePage/${user && user._id}`}
                              >
                                <FontAwesomeIcon icon="user" className="mr-3" />
                                Profile
                              </Link>
                            )}
                          </MenuItem>

                          <MenuItem>
                            {({ active }) => (
                              <Link
                                href={"/editProfile"}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block cursor-pointer px-4 py-2 text-sm"
                                )}
                              >
                                <FontAwesomeIcon icon="cog" className="mr-3" />
                                Edit profile
                              </Link>
                            )}
                          </MenuItem>
                        </div>
                        <div className="py-1">
                          <MenuItem>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full cursor-pointer px-4 py-2 text-left text-sm"
                                )}
                                onClick={() => logout()}
                              >
                                Log Out
                              </span>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

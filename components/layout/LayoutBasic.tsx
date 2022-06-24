/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "../Loading";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    signIn();
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex items-center flex-shrink-0 w-48">
                    <Image
                      src="/img/snoopforms-logo.svg"
                      alt="snoopForms logo"
                      width={300}
                      height={53}
                    />
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              width={32}
                              height={32}
                              src="/img/avatar-placeholder.png"
                              alt="profile"
                              className="rounded-full"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => signOut()}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-ui-gray-dark hover:text-black w-full text-left"
                                  )}
                                >
                                  Sign Out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
                <div className="flex items-center -mr-2 sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 bg-white rounded-md text-ui-gray-dark hover:text-ui-gray-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-4 pb-3 border-t border-ui-gray-light">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src="/img/avatar-placeholder.png"
                      alt="user avatar"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-base font-medium text-ui-gray-dark hover:text-ui-gray-dark hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>{children}</main>
    </div>
  );
}

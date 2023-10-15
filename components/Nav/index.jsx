import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { userService } from "../../services";
import { redirect } from "next/dist/server/api-utils";
import Router, {useRouter} from 'next/router'

export default function App() {

  const [users, setUsers] = useState(null);
  const {logout} = userService;
  
  const router = useRouter();

  const refreshLogout = () => {
    logout();
    setUsers(userService.userValue);
  }

  useEffect(() => {
    setUsers(userService.userValue)
  },[])

  return (
    <Navbar isBordered>
      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {users != null && <DropdownItem key="profile" className="h-14 gap-2">
              <p>logado com</p>
              <p className="font-semibold">{users.username}</p>
            </DropdownItem>}
            <DropdownItem key="settings" onClick={() => Router.push('/paciente')} >Paciente</DropdownItem>
            <DropdownItem key="team_settings" onClick={() => Router.push('/paciente/programa')}>Vinculo de Programa e Paciente</DropdownItem>
            {users != null && <DropdownItem onClick={refreshLogout} key="logout" color="danger">
              Sair
            </DropdownItem>}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

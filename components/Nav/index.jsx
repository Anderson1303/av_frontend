import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { userService } from "../../services";
import { redirect } from "next/dist/server/api-utils";
import Router, {useRouter} from 'next/router'
import { api } from "../../services/api";
import { ButtonDelete } from "../Button/ButtonDelete";
import { ButtonAdd } from "../Button/ButtonAdd";

export default function App({eventsType}) {

  const [users, setUsers] = useState(null);
  const [stateWhatsapp,setStateWhatsapp] = useState("PENDENT");
  const {logout} = userService;
  
  const router = useRouter();

  const refreshLogout = () => {
    logout();
    setUsers(userService.userValue);
  }

  useEffect(() => {
    setUsers(userService.userValue)
    statusSession();
  },[])

  const statusSession = async () => {
    const idtokenverdinho = (await api.get('verdinho/session')).data.data;
    if(idtokenverdinho.length > 0){
        const results = await api.get(`http://localhost:3000/session/status/${idtokenverdinho[0].value}`);
        setStateWhatsapp(results.data.state)
      }
  }

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
            {eventsType.map(item => {
              return <DropdownItem key={item.name_program} onClick={() => Router.push(`/evento/${item.name_program}`)} >Evento {item.name_program}</DropdownItem>
            })}
            <DropdownItem key="settings" onClick={() => Router.push('/paciente')} >Paciente</DropdownItem>
            <DropdownItem key="team_settings" onClick={() => Router.push('/paciente/programa')}>Vinculo de Programa e Paciente</DropdownItem>
            {users != null && <DropdownItem onClick={refreshLogout} key="logout" color="danger">
              Sair
            </DropdownItem>}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      {stateWhatsapp == "CONNECTED" && <span className="connected">Conectado</span>}
      {stateWhatsapp != "CONNECTED" && stateWhatsapp != "PENDENT" && <span className="no-connected">Não Conectado</span>}
      {stateWhatsapp == "PENDENT" && <span className="pendent">Pendente</span>}
    </Navbar>
  );
}

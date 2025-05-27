import { Button } from "./components/ui/button";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "./components/ui/dropdown-menu"
import { useState } from "react";
import { Input } from "./components/ui/input";

function App() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger isOpen={isOpen}>
        <span>Sort By</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Input placeholder="Search" variant="dropdown-input"></Input>
        <DropdownMenuItem>Alphabetical A-Z</DropdownMenuItem>
        <DropdownMenuItem>Alphabetical A-Z</DropdownMenuItem>
        <DropdownMenuItem>Power (High to low)</DropdownMenuItem>
        <DropdownMenuItem>Power (Low to high)</DropdownMenuItem>
        <DropdownMenuItem>HP (High to low)</DropdownMenuItem>
        <DropdownMenuItem>HP (Low to high)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  ) 
}

export default App

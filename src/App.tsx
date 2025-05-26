import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "./components/ui/dropdown-menu"
import { Button } from "./components/ui/button";
import { useState } from "react";


function App() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild isOpen={isOpen}>
        <Button disabled>Input content</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>פריט ראשון</DropdownMenuItem>
        <DropdownMenuItem>פריט שני</DropdownMenuItem>
        <DropdownMenuItem>פריט שלישי</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default App

import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import items from "./data/pokemon_.json";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger isOpen={isOpen}>
          <button>Input content</button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Input placeholder="Search" variant="dropdown-input" />

          {items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              icon={
                <img
                  src={item.image.thumbnail}
                  alt={item.name.english}
                />
              }
              label={item.name.english}
              value={item.base.HP}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default App;

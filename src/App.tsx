import { Button } from "../src/components/ui/button"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button variant="primary" >Click me</Button>
      <Button variant="primary" size="md" disabled>Click me</Button>
      <Button variant="primary" size="lg" disabled>Click me</Button>
      <Button variant="secondary" size="lg" disabled>Click me</Button>
      <Button variant="secondary" size="lg" >Click me</Button>
      <Button variant="secondary" size="lg" disabled>Click me</Button>
    </div>
  )
}

export default App

import { createCliRenderer, type CliRenderer } from ".."
import { setupCommonDemoKeys } from "./lib/standalone-keys"
import { ParentRenderable } from "../renderables/Parent"

let renderer: CliRenderer | null = null
let root: ParentRenderable | null = null

export function run(rendererInstance: CliRenderer): void {
  renderer = rendererInstance
  renderer.setBackgroundColor("#001122")

  const screenWidth = renderer.width
  const screenHeight = renderer.height

  // Create a centered scroll area that takes up 80% of screen
  const scrollWidth = Math.floor(screenWidth * 0.8)
  const scrollHeight = Math.floor(screenHeight * 0.8)
  const scrollX = Math.floor((screenWidth - scrollWidth) / 2)
  const scrollY = Math.floor((screenHeight - scrollHeight) / 2)

  root = new ParentRenderable(renderer, {
    width: scrollWidth,
    height: scrollHeight,
    position: "absolute",
    left: scrollX,
    top: scrollY,
  })

  renderer.root.add(root)
  root.focus()
}

export function destroy(rendererInstance: CliRenderer): void {
  if (root) {
    rendererInstance.root.remove(root.id)
    root.destroy()
    root = null
  }

  renderer = null
}

if (import.meta.main) {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
  })

  run(renderer)
  setupCommonDemoKeys(renderer)
  renderer.start()
}

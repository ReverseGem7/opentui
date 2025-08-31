import {
    OptimizedBuffer,
    parseColor,
    Renderable,
    type RenderableOptions,
    type RenderContext,
  } from ".."
  
  export class ChildRenderable extends Renderable {
    constructor(ctx: RenderContext, options: RenderableOptions) {
      super(ctx, options)
    }
  
    protected renderSelf(buffer: OptimizedBuffer, deltaTime: number): void {
      buffer.fillRect(this.x, this.y, this.width, this.height, parseColor("#fff"))
    }
  }
  
  export class ParentRenderable extends Renderable {
    protected focusable: boolean = true
  
    protected child: ChildRenderable
  
    constructor(ctx: RenderContext, options: RenderableOptions) {
      super(ctx, { ...options, buffered: true })
  
      this.child = new ChildRenderable(ctx, {
        position: "absolute",
        top: 0,
        right: 0,
        width: 2,
        height: 100,
        onMouse(event) {
          console.log("My hitbox is on: ", event.type, event.x, event.y);
        },
      })
  
      super.add(this.child)
    }
  }
  
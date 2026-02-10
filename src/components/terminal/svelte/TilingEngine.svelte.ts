// import { systemState } from "./SystemState.svelte";

export type SplitDirection = "horizontal" | "vertical";

interface TilingNode {
  children?: TilingNode[];
  direction?: SplitDirection;
  id: string;
  ratio?: number; // 0-1 for split ratio
  type: "container" | "window";
}

/**
 * Tiling Engine for Antigravity Workspace.
 * Manages a tree structure representing the i3 tiling layout.
 */
class TilingEngine {
  get root() {
    return this._root;
  }

  private _root = $state<TilingNode>({
    children: [],
    direction: "horizontal",
    id: "root",
    type: "container",
  });

  /**
   * Resizes the ratio between siblings in a container
   */
  resizeRatio(_nodeId: string, _delta: number) {
    // Logic to adjust ratios in siblings
  }

  /**
   * Splits a tiling window into two by transforming the node tree.
   */
  split(targetId: null | string, direction: SplitDirection) {
    if (!targetId) return;
    console.log(`Splitting ${targetId} ${direction}`);

    // Recursive find and replace
    const traverse = (node: TilingNode): TilingNode => {
      if (node.id === targetId && node.type === "window") {
        // Return a new container holding the old window and a placeholder
        return {
          children: [
            { ...node },
            {
              id: `win-${Math.random().toString(36).substring(2, 11)}`,
              type: "window",
            },
          ],
          direction,
          id: `container-${targetId}-${Math.random().toString(36).substring(2, 7)}`,
          ratio: 0.5,
          type: "container",
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(traverse),
        };
      }
      return node;
    };

    this._root = traverse(this._root);
  }
}

export const tilingEngine = new TilingEngine();

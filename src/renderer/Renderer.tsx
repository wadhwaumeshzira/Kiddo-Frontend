import React from 'react';
import { getComponent } from './ComponentRegistry';
import { SDUINode } from '../types/SDUITypes';
import { UnknownComponent } from '../components/fallback/UnknownComponent';

interface RendererProps {
  nodes: SDUINode[];
}

export const Renderer = React.memo(({ nodes }: RendererProps) => {
  if (!nodes || nodes.length === 0) return null;

  return (
    <>
      {nodes.map((node) => {
        const Component = getComponent(node.type);

        if (!Component) {
          return <UnknownComponent key={node.id} type={node.type} />;
        }

        // Recursively pass children to support nested layouts
        const hasChildren = 'children' in node && Array.isArray((node as any).children);

        return (
          <Component key={node.id} {...(node as any).props}>
            {hasChildren && <Renderer nodes={(node as any).children} />}
          </Component>
        );
      })}
    </>
  );
});

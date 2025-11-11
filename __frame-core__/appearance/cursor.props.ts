export type CursorType = 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing';

export interface CursorProps {
  type: CursorType;
}
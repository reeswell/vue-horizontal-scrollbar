import type { Ref } from 'vue'

export type ElementSelector = string | (() => HTMLElement | null | undefined) | HTMLElement | null


export interface ScrollInfo {
  scrollLeft: number
  maxScroll: number
  scrollPercent: number
}


export interface HorizontalScrollbarProps {
  /** Target scroll container selector */
  targetSelector: ElementSelector
  /** Target content selector */
  contentSelector: ElementSelector
  /** Whether to auto show/hide scrollbar */
  autoShow?: boolean
  /** Minimum scroll distance to show scrollbar */
  minScrollDistance?: number
  /** Scrollbar height in pixels */
  height?: number
  /** Enable keyboard control */
  enableKeyboard?: boolean
  /** Scroll step for keyboard navigation */
  scrollStep?: number
  /** Minimum thumb width */
  minThumbWidth?: number
  /** Teleport to target element */
  teleportTo?: string
  /** Throttle delay for scroll events */
  throttleDelay?: number
  /** Z-index for the scrollbar */
  zIndex?: number
  /** Disable the scrollbar */
  disabled?: boolean
  /** ARIA label for accessibility */
  ariaLabel?: string
}


export interface HorizontalScrollbarEmits {
  /** Emitted when scrolling occurs */
  scroll: [info: ScrollInfo]
  /** Emitted when scrollbar is clicked */
  click: [event: MouseEvent]
  /** Emitted when dragging starts */
  dragStart: [event: MouseEvent | TouchEvent]
  /** Emitted when dragging ends */
  dragEnd: [event: MouseEvent | TouchEvent]
  /** Emitted on keyboard interaction */
  keydown: [event: KeyboardEvent]
  /** Emitted when component is ready */
  ready: []
  /** Emitted on errors */
  error: [error: Error]
}

/**
 * Component expose interface
 */
export interface HorizontalScrollbarExpose {
  /** Scroll to specific position */
  scrollToPosition: (position: number) => void
  /** Scroll to end */
  scrollToEnd: () => void
  /** Update scroll information */
  updateScrollInfo: () => void
  /** Current scroll position */
  scrollLeft: Ref<number>
  /** Maximum scroll position */
  maxScroll: Ref<number>
  /** Scroll percentage */
  scrollPercent: Ref<number>
}


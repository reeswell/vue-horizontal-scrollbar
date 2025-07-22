import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import VueHorizontalScrollbar from '../src/components/VueHorizontalScrollbar.vue'

// Mock lodash throttle
vi.mock('lodash-es', () => ({
  throttle: vi.fn((fn) => fn)
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn()
}))

describe('VueHorizontalScrollbar', () => {
  let wrapper: any
  let mockTarget: HTMLElement
  let mockContent: HTMLElement

  beforeEach(() => {
    // Create mock DOM elements
    mockTarget = document.createElement('div')
    mockContent = document.createElement('div')

    // Set element properties
    Object.defineProperty(mockTarget, 'clientWidth', { value: 300 })
    Object.defineProperty(mockTarget, 'scrollLeft', { value: 0, writable: true })
    Object.defineProperty(mockContent, 'scrollWidth', { value: 600 })

    document.body.appendChild(mockTarget)
    document.body.appendChild(mockContent)

    // Mock querySelector
    vi.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '.target') return mockTarget
      if (selector === '.content') return mockContent
      return null
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('renders correctly', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content'
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick() // Wait for component initialization

    expect(wrapper.find('.vue-horizontal-scrollbar-container').exists()).toBe(true)
  })

  it('emits ready event on initialization', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content'
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    expect(wrapper.emitted('ready')).toBeTruthy()
  })

  it('scrolls to position correctly', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content'
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    wrapper.vm.scrollToPosition(100)
    expect(mockTarget.scrollLeft).toBe(100)
  })

  it('handles keyboard navigation with shift + arrow keys', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content',
        scrollStep: 50
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    // Test Shift + ArrowRight
    const rightKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      shiftKey: true
    })
    wrapper.vm.handleKeyDown(rightKeyEvent)
    expect(mockTarget.scrollLeft).toBe(50)

    // Test Shift + ArrowLeft
    const leftKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      shiftKey: true
    })
    wrapper.vm.handleKeyDown(leftKeyEvent)
    expect(mockTarget.scrollLeft).toBe(0)
  })

  it('does not respond to arrow keys without shift key', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content',
        scrollStep: 50
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    // Test ArrowRight without shift
    const rightKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      shiftKey: false
    })
    wrapper.vm.handleKeyDown(rightKeyEvent)
    expect(mockTarget.scrollLeft).toBe(0)

    // Test ArrowLeft without shift
    const leftKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      shiftKey: false
    })
    wrapper.vm.handleKeyDown(leftKeyEvent)
    expect(mockTarget.scrollLeft).toBe(0)
  })

  it('does not respond when disabled', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content',
        disabled: true
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    // Check if thumb exists before triggering
    const thumb = wrapper.find('.vue-horizontal-scrollbar-thumb')

    if (thumb.exists()) {
      await thumb.trigger('mousedown')
      expect(wrapper.emitted('dragStart')).toBeFalsy()
    } else {
      // Alternative: test disabled state through component method
      const mouseEvent = new MouseEvent('mousedown', { clientX: 100 })
      wrapper.vm.handleThumbMouseDown(mouseEvent)
      expect(wrapper.emitted('dragStart')).toBeFalsy()
    }
  })

  it('shows container when autoShow is true and scroll distance is sufficient', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content',
        autoShow: true,
        minScrollDistance: 50
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    // Trigger scroll info update
    wrapper.vm.updateScrollInfo()

    expect(wrapper.vm.showScrollbar).toBe(true)
  })

  it('exposes correct API methods', async () => {
    wrapper = mount(VueHorizontalScrollbar, {
      props: {
        targetSelector: '.target',
        contentSelector: '.content'
      },
      global: {
        stubs: { Teleport: { template: '<div><slot /></div>' } }
      }
    })

    await nextTick()
    await nextTick()

    expect(typeof wrapper.vm.scrollToPosition).toBe('function')
    expect(typeof wrapper.vm.scrollToEnd).toBe('function')
    expect(typeof wrapper.vm.updateScrollInfo).toBe('function')
    expect(typeof wrapper.vm.scrollLeft).toBe('number')
    expect(typeof wrapper.vm.maxScroll).toBe('number')
    expect(typeof wrapper.vm.scrollPercent).toBe('number')
  })
})

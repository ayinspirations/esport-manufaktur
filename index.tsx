
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global suppression and architectural fix for ResizeObserver loop errors
if (typeof window !== 'undefined') {
  // Start a fresh visit at the top. scrollRestoration = 'manual' stops the
  // browser restoring the previous scroll offset on reload, and the immediate
  // scrollTo below applies while the page is still at its initial position.
  //
  // There used to be a second scrollTo(0, 0) on the window 'load' event. That
  // event does not fire when the page becomes usable -- it waits for *every*
  // subresource, including the case-study videos and the multi-megabyte
  // photos. On a normal connection it lands several seconds in, by which time
  // the visitor has already started reading, and it yanked them back to the
  // top mid-scroll. Startup intent is fully covered by the two lines above,
  // which run before anyone can scroll.
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // 1. Monkey-patch ResizeObserver to prevent the error at the source
  // This wraps the observer callback in requestAnimationFrame to decouple layout changes from the observation turn.
  const RO = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends RO {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          callback(entries, observer);
        });
      });
    }
  };

  // 2. Fallback suppression for existing/cached errors or browser-specific edge cases
  const isResizeObserverError = (error: any) => {
    const message = (typeof error === 'string' ? error : error?.message || error?.reason?.message || '').toString();
    return (
      message.includes('ResizeObserver loop completed with undelivered notifications') || 
      message.includes('ResizeObserver loop limit exceeded')
    );
  };

  // Suppress from console.error
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args.length > 0 && isResizeObserverError(args[0])) return;
    originalError.apply(console, args);
  };

  // Suppress from window error events
  window.addEventListener('error', (e) => {
    if (isResizeObserverError(e.message) || isResizeObserverError(e.error)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    // Suppress synchronous throws of non-Error values from external scripts (HubSpot, etc.)
    if (e.error !== null && e.error !== undefined && !(e.error instanceof Error)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);

  // Suppress from unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    if (isResizeObserverError(e.reason)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    // Suppress non-Error rejections from external scripts (HubSpot, Framer Motion cancel, etc.)
    // Real app errors always use `new Error(...)`, so non-Error rejections are safe to suppress.
    if (!(e.reason instanceof Error)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

'use client'

import { useEffect } from 'react'

const SELECTOR = 'a[title="icon"] > img[src^="data:image/svg+xml"]'

function recolorSvgDataUri(img: HTMLImageElement) {
  const src = img.getAttribute('src') || ''
  const commaIdx = src.indexOf(',')
  if (commaIdx === -1) return

  try {
    const header = src.slice(0, commaIdx + 1)
    let svg = decodeURIComponent(src.slice(commaIdx + 1))

    // Replace common fill declarations with #ccffff
    svg = svg
      // style="... fill: ...; ..."
      .replace(/fill:\s*[^;"']+;?/gi, 'fill:#ccffff;')
      // fill="#000", fill='black', fill="rgb(0,0,0)" etc
      .replace(/fill\s*=\s*"\s*#[0-9a-fA-F]{3,6}\s*"/gi, 'fill="#ccffff"')
      .replace(/fill\s*=\s*'\s*#[0-9a-fA-F]{3,6}\s*'/gi, "fill='#ccffff'")
      .replace(/fill\s*=\s*"\s*rgb\([^\)]*\)\s*"/gi, 'fill="#ccffff"')
      .replace(/fill\s*=\s*'\s*rgb\([^\)]*\)\s*'/gi, "fill='#ccffff'")

    // Ensure top-level svg has a default fill as a fallback
    svg = svg.replace(
      /<svg(\s+[^>]*?)?>/i,
      (m, attrs = '') => {
        if (/\sfill\s*=\s*['"][^'"]+['"]/i.test(attrs)) {
          // Replace existing fill on <svg>
          const newAttrs = attrs.replace(/(\sfill\s*=\s*['"]).*?(['"])/i, `$1#ccffff$2`)
          return `<svg${newAttrs}>`
        }
        return `<svg${attrs} fill="#ccffff">`
      }
    )

    const newSrc = header + encodeURIComponent(svg)
    if (newSrc !== src) {
      img.setAttribute('src', newSrc)
    }
  } catch {
    // no-op if decoding fails
  }
}

export function SvgColorEnforcer() {
  useEffect(() => {
    const applyAll = () => {
      document.querySelectorAll<HTMLImageElement>(SELECTOR).forEach(recolorSvgDataUri)
    }

    // Initial pass
    applyAll()

    // Observe future additions/changes
    const observer = new MutationObserver(() => applyAll())
    observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src'] })

    return () => observer.disconnect()
  }, [])

  return null
} 
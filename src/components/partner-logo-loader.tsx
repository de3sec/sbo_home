'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import PartnerLogo from "../assets/partnerslogo.svg"

export function PartnerLogoLoader() {
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(true), 2700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[650px] aspect-square lg:order-last rounded-xl overflow-hidden">
      {showLogo ? (
        <Image
          src={PartnerLogo}
          alt="SBO Tech Shopify App Development Services - Custom E-commerce Solutions"
          fill
          priority
          sizes="(min-width: 1280px) 650px, (min-width: 1024px) 550px, 100vw"
          className="object-contain animate-slide-up-fade"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="partner-loader flex items-center justify-center">
            <div className="loader relative" aria-hidden="true">
              <div className="box box0"><div /></div>
              <div className="box box1"><div /></div>
              <div className="box box2"><div /></div>
              <div className="box box3"><div /></div>
              <div className="box box4"><div /></div>
              <div className="box box5"><div /></div>
              <div className="box box6"><div /></div>
              <div className="box box7"><div /></div>
              <div className="ground"><div /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
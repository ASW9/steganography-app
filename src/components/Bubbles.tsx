'use client'
import { useEffect, useState, useRef } from 'react'

interface Orb {
  id: number
  size: number
  duration: number
  baseX: number
  baseY: number
  x: number
  y: number
  glow: number
  velX: number
  velY: number
  noiseOffsetX: number
  noiseOffsetY: number
}

export default function Bubbles() {
  const [orbs, setOrbs] = useState<Orb[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const createOrb = (yPos = window.innerHeight + 100): Orb => ({
        id: Date.now() + Math.random(),
        size: Math.random() * 60 + 40,
        duration: Math.random() * 20 + 25,
        baseX: Math.random() * window.innerWidth,
        baseY: yPos,
        x: Math.random() * window.innerWidth,
        y: yPos,
        glow: Math.random() * 0.3 + 0.2,
        velX: 0,
        velY: -0.15 - Math.random() * 0.1, // Reduced base velocity
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000
      })

    // Create initial orbs distributed across the screen
    const initialOrbs = Array.from({ length: 12 }, () => createOrb(Math.random() * window.innerHeight))
    setOrbs(initialOrbs)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Brownian motion using simplex noise approximation
    const noise = (x: number, y: number) => {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      return (Math.sin(X * 12.9898 + Y * 78.233) * 43758.5453123) % 1
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      timeRef.current += 0.005 // Very slow time progression

      setOrbs(prevOrbs => {
        return prevOrbs.map(orb => {
          // Calculate random drift using noise
          const noiseX = noise(orb.noiseOffsetX + timeRef.current, 0)
          const noiseY = noise(0, orb.noiseOffsetY + timeRef.current)
          
          // Reduced random drift
          const randomDriftX = (noiseX - 0.5) * 0.1  // Reduced from 0.2
          const randomDriftY = (noiseY - 0.5) * 0.1  // Reduced from 0.2

          // Calculate distance from mouse
          const dx = mousePos.x - orb.x
          const dy = mousePos.y - orb.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Reduced mouse influence
          const influence = Math.min(50 / (distance + 100), 0.02)
          
          // Update velocities
          let newVelX = orb.velX + randomDriftX
          let newVelY = orb.velY + randomDriftY

          if (distance < 300) {
            newVelX += dx * influence * 0.0005  // Reduced from 0.001
            newVelY += dy * influence * 0.0005  // Reduced from 0.001
          }

          // Stronger damping for slower movement
          newVelX *= 0.99
          newVelY *= 0.99

          // Update position
          let newX = orb.x + newVelX
          let newY = orb.y + newVelY

          // Loop orbs within viewport
          if (newY < -100) {
            newY = window.innerHeight + Math.random() * 50
            newX = Math.random() * window.innerWidth
            newVelX = 0
            newVelY = -0.15 - Math.random() * 0.1  // Reduced reset velocity
          }

          // Gentler bounce off screen edges
          if (newX < 0) {
            newX = 0
            newVelX = Math.abs(newVelX) * 0.3 + Math.random() * 0.1
          } else if (newX > window.innerWidth) {
            newX = window.innerWidth
            newVelX = -Math.abs(newVelX) * 0.3 - Math.random() * 0.1
          }

          return {
            ...orb,
            x: newX,
            y: newY,
            velX: newVelX,
            velY: newVelY,
            noiseOffsetX: orb.noiseOffsetX + 0.0005,  // Slower noise progression
            noiseOffsetY: orb.noiseOffsetY + 0.0005   // Slower noise progression
          }
        })
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setOrbs(prevOrbs => {
        return prevOrbs.map(orb => {
          if (orb.x > window.innerWidth) {
            return {
              ...orb,
              x: Math.random() * window.innerWidth
            }
          }
          return orb
        })
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Rest of the render code remains the same
  return (
    <div ref={containerRef} className="bubble-container">
      {orbs.map(orb => {
        const dx = mousePos.x - orb.x
        const dy = mousePos.y - orb.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const deformation = Math.max(0, 1 - distance / 150) * 0.3
        const angle = Math.atan2(dy, dx)

        return (
          <div
            key={orb.id}
            style={{
              position: 'absolute',
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.x}px`,
              top: `${orb.y}px`,
              transform: `
                translate(-50%, -50%)
                scale(
                  ${1 + deformation * Math.cos(angle)},
                  ${1 + deformation * Math.sin(angle)}
                )
              `,
              background: `
                radial-gradient(circle at center,
                  rgba(123, 44, 191, ${orb.glow}) 0%,
                  rgba(92, 33, 143, ${orb.glow * 0.7}) 40%,
                  rgba(61, 22, 95, ${orb.glow * 0.4}) 60%,
                  transparent 100%
                )
              `,
              boxShadow: `
                0 0 20px rgba(123, 44, 191, ${orb.glow * 0.5}),
                0 0 40px rgba(123, 44, 191, ${orb.glow * 0.3}),
                0 0 60px rgba(123, 44, 191, ${orb.glow * 0.1})
              `,
              borderRadius: '50%',
              transition: 'transform 0.15s ease-out',
              pointerEvents: 'none'
            }}
          />
        )
      })}
    </div>
  )
}
import React, { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

const Confetti = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    return () => myConfetti.reset()
  }, [])

  return <div className="w-[100vh] ">
     <canvas ref={canvasRef} className="min-w-[100vh]  fixed inset-0 z-50  pointer-events-none" />
  </div>
}

export default Confetti


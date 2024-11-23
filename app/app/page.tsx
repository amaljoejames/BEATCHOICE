'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function GlitteryText() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    let frame: number
    const animate = () => {
      const time = Date.now() / 1000
      const hue = (time * 10) % 360
      const y = Math.sin(time * 2) * 10
      const rotateY = Math.sin(time) * 10

      text.style.color = `hsl(${hue}, 100%, 70%)`
      text.style.textShadow = 
        `0 0 10px hsl(${hue}, 100%, 80%)`,
        `0 0 20px hsl(${hue}, 100%, 80%)`,
        `0 0 30px hsl(${hue}, 100%, 80%)`,
        `0 0 40px hsl(${hue}, 100%, 80%)`
      
      text.style.transform = `translateY(${y}px) rotateY(${rotateY}deg)`

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div 
      ref={textRef}
      className="text-[10rem] font-bold transition-all duration-100 ease-linear"
      style={{ perspective: '1000px' }}
    >
      BeatChoice
    </div>
  )
}

function InfoPopup({ title, description }: { title: string; description: string }) {
  return (
    <Card className="p-4 shadow-lg bg-black/40 backdrop-blur-md text-white max-w-xs mx-auto mb-4 border border-white/20">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </Card>
  )
}

export default function LandingPage() {
  const [showPopups, setShowPopups] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleProceedButtonClick = () => {
    if (session) {
      router.push('/SELECTION') // Redirect to selection page if logged in
    } else {
      alert('Please login first')
    }
  }

  const handleLogin = () => signIn()
  const handleLogout = () => signOut()

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/323/842/334/neon-aesthetic-wallpaper-preview.jpg)'}}>
      <div className="min-h-screen bg-black/50">
        <header className="p-4 flex justify-between items-center backdrop-blur-sm bg-black/10">
          {/* Top left BeatChoice - smaller size */}
          <div className="text-4xl font-bold text-white">BeatChoice</div> 

          <nav className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:text-white/80">About</Button>
            <Button variant="ghost" className="text-white hover:text-white/80">Features</Button>
            <Button variant="ghost" className="text-white hover:text-white/80">Contact</Button>
            {session ? (
              <Button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Logout
              </Button>
            ) : (
              <Button onClick={handleLogin} className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Sign In
              </Button>
            )}
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Centered BeatChoice Branding */}
          <div className="h-[50vh] mb-8 flex items-center justify-center">
            <GlitteryText />
          </div>

          {/* Proceed to Selection Button Below Branding */}
          <div className="mb-8 text-center">
            <Button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              size="lg"
              onClick={handleProceedButtonClick}
            >
              Proceed to Selection
            </Button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Let Your Fans Choose the Beat</h2>
            <p className="text-xl text-white/80 mb-6">Engage your audience like never before. Give them the power to shape your music.</p>
            <Button 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20" 
              size="lg" 
              onClick={() => setShowPopups(true)}
            >
              Learn More
            </Button>
          </div>

          {showPopups && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoPopup
                title="Fan Engagement"
                description="Let your fans vote on which beat you should use for your next track."
              />
              <InfoPopup
                title="Real-time Collaboration"
                description="Stream your creative process and let fans influence your music in real-time."
              />
              <InfoPopup
                title="Analytics Dashboard"
                description="Get insights into your fans' preferences and engagement levels."
              />
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">Unlimited Beats</h3>
              <p className="text-white/80">Upload as many beats as you want. Give your fans plenty of options.</p>
            </Card>
            <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">High-Quality Audio</h3>
              <p className="text-white/80">Stream your music in crystal clear quality to showcase your talent.</p>
            </Card>
            <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">Community Building</h3>
              <p className="text-white/80">Foster a dedicated fanbase that's invested in your creative process.</p>
            </Card>
            <Card className="p-6 bg-black/40 backdrop-blur-md border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">Live Sessions</h3>
              <p className="text-white/80">Host live streaming sessions and interact with your fans in real-time.</p>
            </Card>
          </div>
        </main>

        <footer className="mt-12 p-4 text-center text-white/60">
          <p>&copy; 2024 BeatChoice. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

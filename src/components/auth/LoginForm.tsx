'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, Mail, UserPlus } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()
  const [mode, setMode]       = useState<'login' | 'signup'>('login')
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      router.push('/album')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-panel">
      <div className="auth-brand">
        <div className="brand-mark" aria-hidden="true">26</div>
        <div className="campaign-kicker">WE ARE</div>
        <h1 className="auth-title">FIFA World Cup 26</h1>
        <p className="auth-subtitle">
          Panini Official Sticker Collection
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="input-wrap">
            <Mail size={18} aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Senha</label>
          <div className="input-wrap">
            <Lock size={18} aria-hidden="true" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="primary-button"
        >
          {loading ? (
            'Processando'
          ) : mode === 'login' ? (
            <>
              Entrar
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              Criar conta
              <UserPlus size={18} />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError('') }}
          className="link-button"
        >
          {mode === 'login' ? 'Não tem conta? Criar agora' : 'Já tem conta? Entrar'}
        </button>
      </form>
    </div>
  )
}

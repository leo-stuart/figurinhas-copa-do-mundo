'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/app/actions/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Lock, Mail, UserPlus } from 'lucide-react'
import Logo26 from '@/components/brand/Logo26'

function safeReturn(raw: string | null): string {
  if (!raw) return '/album'
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/album'
  return raw
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = safeReturn(searchParams.get('return'))
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
      const result = mode === 'login'
        ? await signIn(email, password)
        : await signUp(email, password)
      if (result.error) {
        setError(result.error)
        return
      }
      router.push(returnTo)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-panel">
      <div className="auth-brand-row">
        <Logo26 size={56} showFifa={true} showTrophy={true} />
      </div>

      <div className="hero-kicker">A espera está quase no fim</div>
      <h1 className="auth-title">
        {mode === 'login' ? 'Entre no álbum' : 'Crie sua conta'}
      </h1>
      <p className="auth-subtitle">
        Marque suas figurinhas, controle repetidas e acompanhe o progresso rumo às 48 nações da Copa do Mundo FIFA 26.
      </p>

      <form onSubmit={handleSubmit}>
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

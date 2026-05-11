import LoginForm from '@/components/auth/LoginForm'
import Tunnel26 from '@/components/brand/Tunnel26'

export default function AuthPage() {
  return (
    <main className="auth-shell">
      <aside className="auth-stage" aria-hidden="true">
        <div className="auth-stage-inner">
          <Tunnel26 baseSize={180} step={1.2} ringCount={10} />
        </div>
        <div className="auth-stage-caption">
          We Are 26
        </div>
      </aside>

      <div className="auth-stage-mobile" aria-hidden="true">
        <Tunnel26 baseSize={120} step={1.18} ringCount={7} />
      </div>

      <div className="auth-form-wrap">
        <LoginForm />
      </div>
    </main>
  )
}

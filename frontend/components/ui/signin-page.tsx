"use client"

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LucideIcon } from "lucide-react";
import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1';

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-card border border-border rounded-lg ${className}`}>
    {children}
  </div>
);

// Form Header Component
interface FormHeaderProps {
  title: string;
  subtitle: string;
}

const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <div className="text-center space-y-2">
    <h1 className="text-3xl font-bold tracking-tight text-foreground">
      {title}
    </h1>
    <p className="text-muted-foreground">
      {subtitle}
    </p>
  </div>
);

// Input Field Component
interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  required?: boolean;
  className?: string;
}

const InputField = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  className = ""
}: InputFieldProps) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 pl-10 pr-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ${className}`}
        required={required}
      />
    </div>
  </div>
);

// Password Field Component
interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  required?: boolean;
  className?: string;
}

const PasswordField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  required = false,
  className = ""
}: PasswordFieldProps) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 pl-10 pr-10 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ${className}`}
        required={required}
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>
);

// Button Component
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  variant = "primary",
  onClick,
  children,
  className = "",
  fullWidth = false,
  disabled = false
}: ButtonProps) => {
  const baseStyles = "h-11 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-primary-foreground shadow-lg hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-background hover:bg-secondary text-foreground"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

// Animated Blob Component
interface AnimatedBlobProps {
  color: string;
  position: string;
  delay?: string;
}

const AnimatedBlob = ({ color, position, delay = "" }: AnimatedBlobProps) => (
  <div className={`absolute ${position} w-72 h-72 ${color} rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob ${delay}`} />
);

// Gradient Wave Component
const GradientWave = () => (
  <div className="absolute inset-0 opacity-20">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 560">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path fill="url(#gradient1)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" />
    </svg>
  </div>
);

// Hero Section Component
const HeroSection = ({ title, description, icon }: { title: string, description: string, icon?: React.ReactNode }) => (
  <div className="text-center space-y-6 max-w-md">
    {icon && (
      <div className="inline-flex rounded-full p-4 bg-white/10 backdrop-blur-sm text-white mb-4">
        {icon}
      </div>
    )}
    <h2 className="text-3xl lg:text-4xl font-bold text-white">
      {title}
    </h2>
    <p className="text-lg text-white/80">
      {description}
    </p>
  </div>
);

// Main Component
interface SignInProps {
  onSuccess: (userData: any, token: string) => void;
}

const SignIn = ({ onSuccess }: SignInProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const res = await axios.post(`${API_URL}/auth/login`, formData);
        onSuccess({ email: res.data.email, role: res.data.role }, res.data.access_token);
      } else {
        await axios.post(`${API_URL}/auth/signup`, { email, password, role });
        alert('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(isLogin ? 'Login failed' : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-background">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <FormHeader
            title={isLogin ? "Welcome back" : "Create account"}
            subtitle={isLogin ? "Sign in to continue" : "Join our industrial task platform"}
          />

          <Card className="p-6 sm:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                id="email"
                type="email"
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <PasswordField
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? "Processing..." : (isLogin ? "Sign in" : "Sign up")}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:opacity-80 font-medium transition-opacity duration-300"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </Card>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0">
          <AnimatedBlob color="bg-purple-500/30" position="top-0 -left-4" />
          <AnimatedBlob color="bg-cyan-500/30" position="top-0 -right-4" delay="animation-delay-2000" />
          <AnimatedBlob color="bg-indigo-500/30" position="-bottom-8 left-20" delay="animation-delay-4000" />
        </div>
        <GradientWave />
        <div className="relative z-10 flex items-center justify-center p-12 w-full">
          <HeroSection
            title="Secure Authentication"
            description="Your data is protected with industry-standard encryption. Experience the next level of task management."
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

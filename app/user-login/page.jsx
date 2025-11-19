// 'use client';
// import React, { useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Head from 'next/head';
// import Header from '@/components/layout/Header';
// import Icon from '@/components/layout/AppIcon';
// import LoginForm from './components/LoginForm';
// import SocialLogin from './components/SocialLogin';
// import RoleIndicator from './components/RoleIndicator';
// import SecurityFeatures from './components/SecurityFeatures';

// const UserLogin = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is already logged in
//     const authToken = localStorage.getItem('authToken');
//     const userRole = localStorage.getItem('userRole');

//     if (authToken && userRole) {
//       // Redirect to appropriate dashboard
//       switch (userRole) {
//         case 'applicant': router.push('/applicant-dashboard');
//           break;
//         case 'employer': router.push('/employer-dashboard');
//           break;
//         case 'admin': router.push('/admin-dashboard');
//           break;
//         default:
//           router.push('/landing-page');
//       }
//     }
//   }, [router]);

//   return (
//     <>
//       <Head>
//         <title>Sign In - JobEazy | Access Your Account</title>
//         <meta name="description" content="Sign in to your JobEazy account to access personalized job opportunities, manage applications, and connect with employers." />
//         <meta name="keywords" content="login, sign in, job portal, career, employment, JobEazy" />
//       </Head>
//       <div className="min-h-screen bg-background">
//         <Header isAuthenticated={false} />

//         <main className="pt-16">
//           <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-6xl mx-auto">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//                 {/* Left Side - Branding & Info */}
//                 <div className="hidden lg:block">
//                   <div className="text-center lg:text-left">
//                     <Link href="/landing-page" className="inline-flex items-center space-x-3 mb-8">
//                       <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
//                         <Icon name="Briefcase" size={24} color="white" />
//                       </div>
//                       <span className="text-2xl font-bold text-foreground">JobEazy</span>
//                     </Link>

//                     <h1 className="text-4xl font-bold text-foreground mb-4">
//                       Welcome Back
//                     </h1>
//                     <p className="text-lg text-muted-foreground mb-8">
//                       Sign in to continue your career journey and access thousands of job opportunities tailored for you.
//                     </p>

//                     <div className="space-y-6">
//                       <div className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
//                           <Icon name="Target" size={20} className="text-accent" />
//                         </div>
//                         <div className="text-left">
//                           <h3 className="font-semibold text-foreground">Personalized Job Matching</h3>
//                           <p className="text-sm text-muted-foreground">AI-powered recommendations based on your profile</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
//                           <Icon name="TrendingUp" size={20} className="text-success" />
//                         </div>
//                         <div className="text-left">
//                           <h3 className="font-semibold text-foreground">Career Growth Tracking</h3>
//                           <p className="text-sm text-muted-foreground">Monitor your application progress and success rate</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
//                           <Icon name="Users" size={20} className="text-warning" />
//                         </div>
//                         <div className="text-left">
//                           <h3 className="font-semibold text-foreground">Professional Network</h3>
//                           <p className="text-sm text-muted-foreground">Connect with industry professionals and recruiters</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Side - Login Form */}
//                 <div className="w-full max-w-md mx-auto lg:mx-0">
//                   <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-8">

//                     {/* Mobile Logo */}
//                     <div className="lg:hidden text-center mb-8">
//                       <Link href="/landing-page" className="inline-flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//                           <Icon name="Briefcase" size={20} color="white" />
//                         </div>
//                         <span className="text-xl font-bold text-foreground">JobEazy</span>
//                       </Link>
//                     </div>

//                     <RoleIndicator />

//                     {/* Social Login */}
//                     <SocialLogin />

//                     {/* Login Form */}
//                     <div className="mt-6">
//                       <LoginForm />
//                     </div>

//                     {/* Navigation Links */}
//                     <div className="mt-8 text-center space-y-4">
//                       <div className="flex items-center justify-center space-x-4 text-sm">
//                         <Link
//                           href="/landing-page"
//                           className="text-muted-foreground hover:text-foreground transition-micro flex items-center space-x-1"
//                         >
//                           <Icon name="ArrowLeft" size={14} />
//                           <span>Back to Home</span>
//                         </Link>
//                         <span className="text-border">|</span>
//                         <Link
//                           href="/user-registration"
//                           className="text-primary hover:text-primary/80 transition-micro"
//                         >
//                           Create Account
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Security Features - Mobile Only */}
//                   <div className="lg:hidden">
//                     <SecurityFeatures />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         {/* Footer */}
//         <footer className="bg-card border-t border-border py-8">
//           <div className="max-w-7xl mx-auto px-4 text-center">
//             <div className="flex items-center justify-center space-x-6 mb-4">
//               <Link href="/landing-page" className="text-sm text-muted-foreground hover:text-foreground transition-micro">
//                 About Us
//               </Link>
//               <Link href="/landing-page" className="text-sm text-muted-foreground hover:text-foreground transition-micro">
//                 Contact
//               </Link>
//               <Link href="/landing-page" className="text-sm text-muted-foreground hover:text-foreground transition-micro">
//                 Privacy Policy
//               </Link>
//               <Link href="/landing-page" className="text-sm text-muted-foreground hover:text-foreground transition-micro">
//                 Terms of Service
//               </Link>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               © {new Date()?.getFullYear()} JobEazy. All rights reserved.
//             </p>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default UserLogin;

// src/pages/user-login.jsx or src/app/user-login/page.jsx depending on your Next.js setup
'use client';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import RoleIndicator from './components/RoleIndicator';
import SocialLogin from './components/SocialLogin';
import LoginForm from './components/LoginForm';
import SecurityFeatures from './components/SecurityFeatures';
import Icon from '@/components/layout/AppIcon';
import Link from 'next/link';

const UserLogin = () => {
  return (
    <>
      <Head>
        <title>Sign In - JobEazy</title>
      </Head>

      <div className="min-h-screen bg-background">
        <Header isAuthenticated={false} />

        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="hidden lg:block">
                  <div className="text-center lg:text-left">
                    <Link href="/landing-page" className="inline-flex items-center space-x-3 mb-8">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <Icon name="Briefcase" size={24} color="white" />
                      </div>
                      <span className="text-2xl font-bold text-foreground">JobEazy</span>
                    </Link>

                    <h1 className="text-4xl font-bold text-foreground mb-4">Welcome Back</h1>
                    <p className="text-lg text-muted-foreground mb-8">Sign in to continue your career journey</p>

                    {/* features */}
                    <div className="space-y-6">
                      {/* feature items */}
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="bg-card border border-border rounded-xl p-8 shadow-elevation-2">
                    <div className="lg:hidden text-center mb-8">
                      <Link href="/landing-page" className="inline-flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <Icon name="Briefcase" size={20} color="white" />
                        </div>
                        <span className="text-xl font-bold text-foreground">JobEazy</span>
                      </Link>
                    </div>

                    <RoleIndicator />
                    <SocialLogin />

                    <div className="mt-6">
                      <LoginForm />
                    </div>

                    <div className="mt-8 text-center">
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <Link href="/landing-page" className="text-muted-foreground hover:text-foreground flex items-center">
                          <Icon name="ArrowLeft" size={14} />
                          <span>Back to Home</span>
                        </Link>
                        <span className="text-border">|</span>
                        <Link href="/user-registration" className="text-primary hover:text-primary/80">Create Account</Link>
                      </div>
                    </div>
                  </div>

                  <div className="lg:hidden mt-6">
                    <SecurityFeatures />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} JobEazy</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserLogin;

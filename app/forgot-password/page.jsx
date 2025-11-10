import React from 'react';
import Head from "next/head";
import Header from '../../components/layout/Header';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import HelpSection from './components/HelpSection';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Forgot Password - JobEazy</title>
        <meta name="description" content="Reset your JobEazy account password securely. Enter your email to receive a password reset link." />
        <meta name="keywords" content="forgot password, reset password, JobEazy, account recovery" />
      </Head>
      <Header isAuthenticated={false} />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding & Information */}
              <div className="hidden lg:block">
                <div className="max-w-lg">
                  <h1 className="text-4xl font-bold text-foreground mb-6">
                    Secure Account Recovery
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Don't worry, it happens to the best of us. We'll help you regain access to your JobEazy account quickly and securely.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mt-1">
                        <span className="text-primary font-semibold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Enter Your Email</h3>
                        <p className="text-sm text-muted-foreground">
                          Provide the email address associated with your account
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mt-1">
                        <span className="text-primary font-semibold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Check Your Email</h3>
                        <p className="text-sm text-muted-foreground">
                          We'll send you a secure reset link within minutes
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mt-1">
                        <span className="text-primary font-semibold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Reset Password</h3>
                        <p className="text-sm text-muted-foreground">
                          Create a new secure password and regain access
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-muted/50 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                        <span className="text-success text-xs">✓</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">Trusted by 50,000+ professionals</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your account security is our top priority. All reset requests are encrypted and monitored.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full">
                <ForgotPasswordForm />
                <HelpSection />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">J</span>
              </div>
              <span className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} JobEazy. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-micro">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-micro">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-micro">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;
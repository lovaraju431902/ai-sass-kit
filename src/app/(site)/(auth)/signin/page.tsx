'use client';

import Link from 'next/link';
import { SignInWithGithub, SignInWithGoogle } from '../_components/social-auth';
import SignInForm from './signin-form';
import { RevealAnimation } from "@/components/animation/RevealAnimation";


export default function SignInPage() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="wrapper">
        <div className="relative max-w-[600px] mx-auto">
          <RevealAnimation delay={0.1}>
            <div className="contact-wrapper border p-8 sm:p-14 relative z-30 bg-white dark:bg-dark-primary dark:border-dark-primary border-gray-100">
              <div className="text-center mb-8">
                <RevealAnimation delay={0.2} direction='left'>
                  <h3 className="text-gray-800 dark:text-white/90 font-bold text-3xl mb-2">
                    Sign In
                  </h3>
                </RevealAnimation>
                <RevealAnimation delay={0.3} direction='right'>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your email and password to sign in!
                  </p>
                </RevealAnimation>
              </div>
              <RevealAnimation delay={0.4} direction='up'>
                <div className="flex flex-col sm:flex-row justify-center gap-y-3.5 gap-x-5">

                  <SignInWithGoogle />


                  <SignInWithGithub />

                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.6} direction='down'>
                <div className="relative py-3 sm:py-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="p-2 text-gray-400 bg-white dark:bg-dark-primary sm:px-5 sm:py-2">
                      Or
                    </span>
                  </div>
                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.7} direction='left'>
                <div>
                  <SignInForm />
                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.7} direction='right'>
                <div className="mt-5">
                  <p className="text-gray-700 dark:text-gray-400 text-sm">
                    Don’t have an account?{' '}
                    <Link
                      href="/signup"
                      className="text-sm font-semibold text-primary-500"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </RevealAnimation>
            </div>
          </RevealAnimation>
        </div>
      </div>

      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 z-0">
        <svg
          width="930"
          height="760"
          viewBox="0 0 930 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.3" filter="url(#filter0_f_9248_10254)">
            <circle cx="380.335" cy="380.335" r="179.665" fill="#FF58D5" />
          </g>
          <g opacity="0.7" filter="url(#filter1_f_9248_10254)">
            <circle cx="549.665" cy="380.335" r="179.665" fill="#4E6EFF" />
          </g>
          <defs>
            <filter
              id="filter0_f_9248_10254"
              x="0.669922"
              y="0.6698"
              width="759.33"
              height="759.33"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_9248_10254"
              />
            </filter>
            <filter
              id="filter1_f_9248_10254"
              x="170"
              y="0.6698"
              width="759.33"
              height="759.33"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_9248_10254"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  );
}

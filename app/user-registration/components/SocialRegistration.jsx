'use client';
import React from 'react';
import Image from 'next/image';
import Button from '../../../components/shared/button/page';

const SocialRegistration = ({ onSocialRegister }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: '/assets/icons/google-icon.svg', 
      bgColor: 'bg-[#f9f9f9]',
      hoverBg: 'hover:bg-green-400', 
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
    },
  ];

  return (
    <div className="mb-8">
      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Quick Registration</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            fullWidth
            onClick={() => onSocialRegister(provider.id)}
            className={`flex items-center justify-center gap-3 py-3 border ${provider.borderColor} ${provider.bgColor} ${provider.textColor} rounded-lg transition-all duration-200 ${provider.hoverBg}`}
          >
            <Image
              src={provider.icon}
              alt={`${provider.name} icon`}
              width={20}
              height={20}
            />
            <span className="font-medium">Continue with {provider.name}</span>
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="relative mt-6 mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or register with</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import AutoCompleteInput from '@/components/shared/select/page';
import MultiSelectInput from '@/components/shared/multiselect-input/page';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import apiRoutes from '@/common/constants/apiRoutes';
import { apiRequest } from '@/common/api/apiService';
import CommonUserFields from './CommonUserFields';
import { AVAILABILITY } from '@/common/constants/enum';
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
const ContractJobForm = ({ role, onSubmit, isLoading }) => {
  const [errors, setErrors] = useState({});
  const { selectedDomainId } = useSelector((state) => state.jobDomain);
  const { selectedRoleId } = useSelector((state) => state.role);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobDomain: '',
    roleId: '',
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    address: '',
    longitude: '',
    latitude: '',
    skillType: [],
    availability: '',
    expectedDailyWage: '',
    contractReg: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // if (!formData.agreeToTerms) {
    //   newErrors.agreeToTerms = 'Please accept the terms and conditions';
    // }
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // // Encrypt password
    // const encryptedPassword = CryptoJS.AES.encrypt(
    //   formData.password,
    //   process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default_secret_key'
    // ).toString();

    let encryptedPassword = formData.password; // default = original value

    if (formData.password && formData.password.trim() !== "") {
      encryptedPassword = CryptoJS.AES.encrypt(
        formData.password,
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default_secret_key'
      ).toString();
    }

    // Device info
    const deviceInfo = await getDeviceInfo();

    // Clean payload
    const payload = {
      name: formData.name,
      email: formData.email,
      password: encryptedPassword,
      mobile: formData.mobile,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      deviceInfo,
      roleId: selectedRoleId,
      jobDomain: selectedDomainId,
      availability: formData.availability,
      skillType: formData.skillType,
      expectedDailyWage: formData.expectedDailyWage,
    };

    try {
      const response = await apiRequest(apiRoutes.applicantRegister, 'POST', payload);
      console.log('Registration success:', response);
      onSubmit(response);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: error.message || 'Registration failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/*Common user fields */}
      <CommonUserFields formData={formData} onChange={handleChange} />

      {/*Contract Job-specific fields */} 

      <MultiSelectInput
        label="Skill Type"
        placeholder='Enter your Skill types'
        value={formData.skillType}
        onChange={(updatedTags) => handleChange('skillType', updatedTags)}
        required
        formSubmitted={formSubmitted}
      />

      <AutoCompleteInput
        label="Availability"
        options={AVAILABILITY}
        value={formData.availability}
        onSelect={(option) => handleChange('availability', option?.value || '')}
        placeholder="Select an option"
      />


      <Input
        label="Expected Daily Wage"
        type="number"
        placeholder="Enter your expected daily pay"
        value={formData.expectedDailyWage}
        onChange={(e) => handleChange('expectedDailyWage', e.target.value)}
      />

      {/* <div className="flex items-start space-x-3 mt-4">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeToTerms: e.target.checked })
          }
          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
          I agree to the{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
      )} */}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="py-3"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/user-login"
            className="text-primary hover:underline font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ContractJobForm;

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import AutoCompleteInput from '@/components/shared/select/page';
import CommonUserFields from './CommonUserFields';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import CryptoJS from 'crypto-js';
const NearbyJobForm = ({ roleId, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    jobDomain: '',
    roleId: roleId || '',
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    latitude: '',
    longitude: '',
    preferredWorkRadius: '',
    experience: '',
    expectedSalary: '',
    jobType: '',
    agreeToTerms: false,
  });

  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [loadingJobTypes, setLoadingJobTypes] = useState(true);
  const hasFetched = useRef(false);
  const { selectedDomainId } = useSelector((state) => state.jobDomain);
  const { selectedRoleId } = useSelector((state) => state.role);
  const [errors, setErrors] = useState({});

  // Fetch Job Types
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchJobTypes = async () => {
      try {
        setLoadingJobTypes(true);
        const response = await apiRequest(apiRoutes.getJobType, 'POST');
        const jobData = response?.data?.docs || [];

        const formatted = jobData.map(item => ({
          value: item.id,
          label: item.name,
        }));

        setJobTypeOptions(formatted);
      } catch (error) {
        console.error('Error fetching job types:', error);
      } finally {
        setLoadingJobTypes(false);
      }
    };

    fetchJobTypes();
  }, []);
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // Handle form submit
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
      jobType: formData.jobType,
      experience: formData.experience,
      expectedSalary: formData.expectedSalary,
      preferredWorkRadius: formData.preferredWorkRadius,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Common fields */}
      <CommonUserFields
        formData={formData}
        setFormData={setFormData}
        onChange={handleChange}
      />
      {/* Nearby-specific fields */}
      {/* <Input
        label="Preferred Work Radius (km)"
        value={formData.preferredWorkRadius}
        onChange={(e) => handleChange('preferredWorkRadius', e.target.value)}
      />
      <Input
        label="Experience (Years)"
        value={formData.experience}
        onChange={(e) => handleChange('experience', e.target.value)}
      />
      <Input
        label="Expected Salary"
        value={formData.expectedSalary}
        onChange={(e) => handleChange('expectedSalary', e.target.value)}
      />
      <AutoCompleteInput
        label="Job Type"
        options={jobTypeOptions}
        value={formData.jobType}
        onSelect={(value) => handleChange('jobType', value)}
        disabled={loadingJobTypes}
        placeholder={loadingJobTypes ? 'Loading job types...' : 'Select job type'}
      /> */}
      {/* Terms Checkbox */}
      {/* <div className="flex items-start space-x-3 mt-4">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
          I agree to the{' '}
          <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </label>
      </div> */}
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
          <Link href="/user-login" className="text-primary hover:underline font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default NearbyJobForm;

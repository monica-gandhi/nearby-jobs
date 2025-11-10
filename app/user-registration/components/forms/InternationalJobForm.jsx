'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import AutoCompleteInput from '@/components/shared/select/page';
import CommonUserFields from './CommonUserFields';
import { PASSPORT_CONFIRMATION, VISA_STATUS } from '@/common/constants/enum';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { useSelector } from 'react-redux';
const InternationalJobForm = ({ role, onSubmit, isLoading }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    jobDomain: '',
    roleId: '',
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    latitude: '',
    longitude: '',
    passportConfirmation: '',
    passportNo: '',
    passportValidity: '',
    preferredCountry: '',
    experience: '',
    visaStatus: '',
    expectedSalary: '',
    workCategory: '',
    internationalReg: false,
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [workCategoryOptions, setWorkCategoryOptions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingExperience, setLoadingExperience] = useState(false);
  const [loadingWorkCategory, setLoadingWorkCategory] = useState(false);

  const hasFetchedCountries = useRef(false);
  const hasFetchedExperience = useRef(false);
  const hasFetchedWorkCategory = useRef(false);
  const { selectedDomainId } = useSelector((state) => state.jobDomain);
  const { selectedRoleId } = useSelector((state) => state.role);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // ✅ Fetch preferred countries
  useEffect(() => {
    if (hasFetchedCountries.current) return;
    hasFetchedCountries.current = true;

    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const response = await apiRequest(apiRoutes.getCountry, 'POST');
        const countryData = response?.data?.docs || [];

        const formatted = countryData.map(item => ({
          value: item.id,
          label: item.name,
        }));

        setCountryOptions(formatted);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);


  // ✅ Fetch work category options
  useEffect(() => {
    if (hasFetchedWorkCategory.current) return;
    hasFetchedWorkCategory.current = true;

    const fetchWorkCategory = async () => {
      try {
        setLoadingWorkCategory(true);
        const response = await apiRequest(apiRoutes.getWorkCategory, 'POST');
        const workData = response?.data?.docs || [];

        const formatted = workData.map(item => ({
          value: item.id,
          label: item.name,
        }));

        setWorkCategoryOptions(formatted);
      } catch (error) {
        console.error('Error fetching work categories:', error);
      } finally {
        setLoadingWorkCategory(false);
      }
    };

    fetchWorkCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      deviceInfo: navigator.userAgent,
      jobDomain: selectedDomainId,
      internationalReg: formData.internationalReg,
      passportConfirmation: formData.passportConfirmation,
      passportNo: formData.passportNo,
      passportValidity: formData.passportValidity,
      preferredCountry: formData.preferredCountry,
      experience: formData.experience,
      visaStatus: formData.visaStatus,
      expectedSalary: formData.expectedSalary,
      workCategory: formData.workCategory,
      roleId: selectedRoleId,
    };

    try {
      const response = await apiRequest(apiRoutes.applicantRegister, 'POST', params);
      console.log('Registration success:', response);
      onSubmit(response);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: error.message || 'Registration failed' });
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Common user fields */}
      <CommonUserFields formData={formData} onChange={handleChange} />

      {/* Passport confirmation */}
      <AutoCompleteInput
        label="Do you currently hold a valid passport?"
        options={PASSPORT_CONFIRMATION}
        value={formData.passportConfirmation}
        onSelect={(value) => handleChange('passportConfirmation', value)}
        placeholder="Select an option"
      />

      {/* Passport details */}
      {formData.passportConfirmation === 'Yes' && (
        <>
          <Input
            label="Passport Number"
            value={formData.passportNo}
            onChange={(e) => handleChange('passportNo', e.target.value)}
          />
          <Input
            label="Passport Validity"
            type="date"
            value={formData.passportValidity}
            onChange={(e) => handleChange('passportValidity', e.target.value)}
          />
        </>
      )}

      {/* Preferred Country */}
      <AutoCompleteInput
        label="Preferred Country"
        options={countryOptions}
        value={formData.preferredCountry}
        onSelect={(value) => handleChange('preferredCountry', value)}
        placeholder={loadingCountries ? 'Loading countries...' : 'Select your preferred country'}
        disabled={loadingCountries}
      />

      {/* Experience */}
      <Input
        label="Experience"
        value={formData.experience}
        onChange={(e) => handleChange('experience', e.target.value)}
        placeholder="Enter your experience"
      />

      {/* Work Category */}
      <AutoCompleteInput
        label="Work Category"
        options={workCategoryOptions}
        value={formData.workCategory}
        onSelect={(value) => handleChange('workCategory', value)}
        placeholder={loadingWorkCategory ? 'Loading categories...' : 'Select work category'}
        disabled={loadingWorkCategory}
      />

      {/* Expected Salary */}
      <Input
        label="Expected Salary"
        value={formData.expectedSalary}
        onChange={(e) => handleChange('expectedSalary', e.target.value)}
        placeholder="Enter your expected salary"
      />

      {/* Visa Status */}
      <AutoCompleteInput
        label="Visa Status"
        options={VISA_STATUS}
        value={formData.visaStatus}
        onSelect={(value) => handleChange('visaStatus', value)}
        placeholder="Select an option"
      />



      {/* Terms & Conditions */}
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

export default InternationalJobForm;

'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/components/shared/input/page';
import GoogleMapPicker from '@/components/shared/google-location/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError } from '@/common/toast/toastService';

const CommonUserFields = ({ formData, onChange }) => {
    const [countryCode, setCountryCode] = useState('');
    const [countryCodes, setCountryCodes] = useState([]);
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await apiRequest(apiRoutes.getCountry, 'POST');
                const docs = response?.data?.docs || [];

                if (docs.length) {
                    const activeCountries = docs.filter(
                        (item) => item.status === 'Active'
                    );

                    const formattedCodes = activeCountries.map((item) => ({
                        label: `${item.name} (${item.code})`, // show name + code
                        value: item.code,
                    }));

                    setCountryCodes(formattedCodes);

                    const india = activeCountries.find((item) => item.name === 'India');
                    if (india?.code) {
                        setCountryCode(india.code);
                    } else if (formattedCodes.length) {
                        setCountryCode(formattedCodes[0].value);
                    }
                }
            } catch (error) {
                showError('Failed to load country codes');
            }
        };

        fetchCountryCodes();
    }, []);

    const handleLocationSelect = (lat, lng, address) => {
        onChange('latitude', lat);
        onChange('longitude', lng);
        onChange('address', address);
    };

    const handleMobileChange = (e) => {
        const mobileNumber = e.target.value;
        const fullNumber = `${countryCode}${mobileNumber}`;
        onChange('mobile', fullNumber);
    };

    useEffect(() => {
        if (formData.confirmPassword && formData.password) {
            setPasswordError(
                formData.password !== formData.confirmPassword
                    ? 'Passwords do not match'
                    : ''
            );
        } else {
            setPasswordError('');
        }
    }, [formData.password, formData.confirmPassword]);

    return (
        <>
            <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => onChange('name', e.target.value)}
            />

            {/* <Input
                label="Mobile Number"
                showCountryCode
                countryCode={countryCode}
                countryCodeOptions={countryCodes}
                onCountryCodeChange={setCountryCode}
                value={formData.mobile?.replace(countryCode, '') || ''}
                onChange={handleMobileChange}
            /> */}

            {/* <Input
                label="Email"
                value={formData.email}
                onChange={(e) => onChange('email', e.target.value)}
            /> */}

            <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => onChange('password', e.target.value)}
            />

            {/* <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => onChange('confirmPassword', e.target.value)}
            /> */}

            {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
            )}

            {/* <GoogleMapPicker
                label="Work Location"
                initalAddress={formData.address || ''}
                initialLat={formData.latitude || ''}
                initialLng={formData.longitude || ''}
                onLocationSelect={handleLocationSelect}
            /> */}
        </>
    );
};

export default CommonUserFields;

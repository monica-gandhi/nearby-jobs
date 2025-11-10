'use client';
import React from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import GoogleMapPicker from '@/components/shared/google-location/page';
const EmployerBasicDetails = () => (
    <form className="space-y-4">
        <Input label="Mobile Number" type="tel" />
        <GoogleMapPicker />
        <Input label="Authorised Person Name" />
        <Input label="Authorised Person Email" />
        <Input label="Authorised Person Mobile" />
        <Input label="Number of Employees" type="number" />
        <Input label="GST License Number" />
        <Button fullWidth>Next</Button>
    </form>
);

export default EmployerBasicDetails;

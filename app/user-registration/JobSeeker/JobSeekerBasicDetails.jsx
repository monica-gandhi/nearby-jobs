'use client';
import React, { useState, useEffect, useRef } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import AutoCompleteInput from '@/components/shared/select/page';
import GoogleMapPicker from '@/components/shared/google-location/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { GENDERS } from '@/common/constants/enum';
const JobSeekerBasicDetails = ({ formData = {}, onChange,onNext }) => {
    const [idType, setIdType] = useState('aadhar');
    const hasFetched = useRef(false);
    const [idImage, setIdImage] = useState(null);
    const [gender, setGender] = useState('');
    const [jobTypeOptions, setJobTypeOptions] = useState([]);
    const [loadingJobTypes, setLoadingJobTypes] = useState(true);
    const [workCategoryOptions, setWorkCategoryOptions] = useState([]);
    const [loadingWorkCategory, setLoadingWorkCategory] = useState(false);
    const hasFetchedWorkCategory = useRef(false);
    const [qualificationOptions, setQualificationOptions] = useState([]);
    const [loadingQualifications, setLoadingQualifications] = useState(true);
    const hasFetchedQualification = useRef(false);
    const [form, setForm] = useState({
        gender: '',
        mobile: '',
        qualification: '',
        jobType: '',
        jobCategory: '',
        aadharNo: '',
        panNo: '',
        address: '',
        longitude: '',
        latitude: '',
    });
    const [errors, setErrors] = useState({});

    /** -------------------------
     * LOCATION HANDLER
     * -------------------------
     */
    const handleLocationSelect = (lat, lng, address) => {
        onChange({ ...formData, latitude: lat, longitude: lng, address });
    };


    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

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

    useEffect(() => {
        if (hasFetchedQualification.current) return;
        hasFetchedQualification.current = true;

        const fetchQualification = async () => {
            try {
                setLoadingQualifications(true);
                const response = await apiRequest(apiRoutes.getQualification, 'POST');
                const qualificationData = response?.data?.docs || [];

                const formatted = qualificationData.map(item => ({
                    value: item.id,
                    label: item.name,
                }));

                setQualificationOptions(formatted);
            } catch (error) {
                console.error('Error fetching qualification:', error);
            } finally {
                setLoadingQualifications(false);
            }
        };

        fetchQualification();
    }, []);
    /** -------------------------
     * FORM VALIDATION
     * -------------------------
     */
    const validate = () => {
        const newErrors = {};

        if (!form.mobile) newErrors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(form.mobile))
            newErrors.mobile = 'Enter a valid 10-digit mobile number';

        if (!form.qualification)
            newErrors.qualification = 'Qualification is required';

        if (!gender) newErrors.gender = 'Please select your gender';

        if (!form.jobType) newErrors.jobType = 'Job type is required';
        if (!form.jobCategory) newErrors.jobCategory = 'Job category is required';

        if (idType === 'aadhar') {
            if (!form.aadharNo) newErrors.aadharNo = 'Aadhar number is required';
            else if (!/^\d{12}$/.test(form.aadharNo))
                newErrors.aadharNo = 'Enter valid 12-digit Aadhar number';
        } else {
            if (!form.panNo) newErrors.panNo = 'PAN number is required';
            else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNo))
                newErrors.panNo = 'Enter valid PAN number (e.g., ABCDE1234F)';
        }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** -------------------------
     * FORM SUBMIT
     * -------------------------
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formDataToSend = {
            ...form,
            gender,
            idType,
            idImage,
        };

        console.log('Validated Form Data:', formDataToSend);

        // Send updated form data to parent (optional)
        if (onChange) onChange(formDataToSend);

        // Move to next step
        if (typeof onNext === 'function') onNext();
    };


    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {/* ---------- Gender ---------- */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 items-center mt-2">
                    {GENDERS.map((g) => (
                        <label key={g.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value={g.value}
                                checked={gender === g.value}
                                onChange={() => setGender(g.value)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            {g.label}
                        </label>
                    ))}
                </div>

                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            {/* ---------- Mobile ---------- */}
            <div>
                <Input
                    label="Mobile Number"
                    type="tel"
                    required={true}
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className={`${errors.mobile ? 'border-red-500' : ''}`}
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>

            {/* ---------- Qualification ---------- */}
            <div>
                <AutoCompleteInput
                    label="Qualification"
                    required
                    options={qualificationOptions}
                    value={form.qualification}
                    onSelect={(value) => handleChange('qualification', value)}
                    placeholder={loadingQualifications ? 'Loading qualifications...' : 'Select qualification'}
                    disabled={loadingQualifications}
                />
                {errors.qualification && (
                    <p className="text-red-500 text-sm">{errors.qualification}</p>
                )}
            </div>



            {/* ---------- Job Type ---------- */}
            <div>
                <AutoCompleteInput
                    label="Job Type"
                    required
                    options={jobTypeOptions}
                    value={form.jobType}
                    onSelect={(value) => handleChange('jobType', value)}
                    disabled={loadingJobTypes}
                    placeholder={loadingJobTypes ? 'Loading job types...' : 'Select job type'}
                />
                {errors.jobType && (
                    <p className="text-red-500 text-sm">{errors.jobType}</p>
                )}
            </div>

            {/* ---------- Job Category ---------- */}
            <div>
                <AutoCompleteInput
                    label="Job Category"
                    required
                    options={workCategoryOptions}
                    value={form.jobCategory}   // <-- use local form state
                    onSelect={(value) => handleChange('jobCategory', value)}
                    placeholder={loadingWorkCategory ? 'Loading categories...' : 'Select work category'}
                    disabled={loadingWorkCategory}
                />

                {errors.jobCategory && (
                    <p className="text-red-500 text-sm">{errors.jobCategory}</p>
                )}
            </div>

            {/* ---------- ID Type Selection ---------- */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Select ID Proof Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 items-center">
                    {['aadhar', 'pan'].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="idType"
                                value={type}
                                checked={idType === type}
                                onChange={() => setIdType(type)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            {type === 'aadhar' ? 'Aadhar Card' : 'PAN Card'}
                        </label>
                    ))}
                </div>
            </div>

            {/* ---------- ID Number ---------- */}
            <div>
                <Input
                    label={idType === 'aadhar' ? 'Aadhar Number' : 'PAN Number'}
                    value={idType === 'aadhar' ? form.aadharNo || '' : form.panNo || ''}
                    required={true}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            ...(idType === 'aadhar'
                                ? { aadharNo: e.target.value }
                                : { panNo: e.target.value }),
                        }))
                    }
                    className={`${errors[idType === 'aadhar' ? 'aadharNo' : 'panNo'] ? 'border-red-500' : ''}`}
                />
                {errors[idType === 'aadhar' ? 'aadharNo' : 'panNo'] && (
                    <p className="text-red-500 text-sm">
                        {errors[idType === 'aadhar' ? 'aadharNo' : 'panNo']}
                    </p>
                )}

            </div>


            {/* ---------- Upload Identity Proof ---------- */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Identity Proof (Front & Back in a single image)
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdImage(e.target.files[0])}
                    className={`w-full rounded-lg border ${errors.idImage ? 'border-red-500' : 'border-gray-300'
                        } p-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.idImage && (
                    <p className="text-red-500 text-sm mt-1">{errors.idImage}</p>
                )}

                {idImage && (
                    <div className="mt-3">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <img
                            src={URL.createObjectURL(idImage)}
                            alt="Uploaded ID"
                            className="w-48 h-32 object-cover rounded-lg border"
                        />
                    </div>
                )}
            </div>

            {/* ---------- Work Location ---------- */}
            <GoogleMapPicker
                label="Work Location"
                required={true}
                initialAddress={formData.address || ''}
                initialLat={formData.latitude || ''}
                initialLng={formData.longitude || ''}
                onLocationSelect={handleLocationSelect}
            />

            {/* ---------- Submit ---------- */}
            <Button fullWidth type="submit">
                Next
            </Button>
        </form>
    );
};

export default JobSeekerBasicDetails;

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import AutoCompleteInput from '@/components/shared/select/page';
import GoogleMapPicker from '@/components/shared/google-location/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { GENDERS } from '@/common/constants/enum';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import { useRouter } from 'next/navigation';
import { showError, showSuccess } from '@/common/toast/toastService';

const JobSeekerBasicDetails = ({ formData = {}, onChange, onNext }) => {
    const [idType, setIdType] = useState('aadhar');
    const [idImage, setIdImage] = useState(null);
    const [gender, setGender] = useState('');
    const [jobTypeOptions, setJobTypeOptions] = useState([]);
    const [loadingJobTypes, setLoadingJobTypes] = useState(true);
    const [workCategoryOptions, setWorkCategoryOptions] = useState([]);
    const [loadingWorkCategory, setLoadingWorkCategory] = useState(false);
    const [qualificationOptions, setQualificationOptions] = useState([]);
    const [loadingQualifications, setLoadingQualifications] = useState(true);
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
        whatsappNo: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const hasFetchedJobType = useRef(false);
    const hasFetchedWorkCategory = useRef(false);
    const hasFetchedQualification = useRef(false);
    const router = useRouter();

    /** -------------------------
     * CLEAR ERROR helper
     * -------------------------*/
    const clearError = (field) => {
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    /** -------------------------
     * LOCATION HANDLER
     * -------------------------*/
    const handleLocationSelect = (lat, lng, address) => {
        setForm(prev => ({ ...prev, latitude: lat, longitude: lng, address }));
        clearError('address');
        if (typeof onChange === 'function') {
            onChange({ ...formData, latitude: lat, longitude: lng, address });
        }
    };

    /** -------------------------
     * INPUT HANDLER (now clears error)
     * -------------------------*/
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        clearError(field);
    };

    /** -------------------------
     * FETCH JOB TYPE, CATEGORY, QUALIFICATION
     * -------------------------*/
    useEffect(() => {
        if (hasFetchedJobType.current) return;
        hasFetchedJobType.current = true;

        const fetchJobTypes = async () => {
            try {
                setLoadingJobTypes(true);
                const response = await apiRequest(apiRoutes.getJobType, 'POST');
                const data = response?.data?.docs || [];
                setJobTypeOptions(data.map(item => ({ value: item.id, label: item.name })));
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
                const data = response?.data?.docs || [];
                setWorkCategoryOptions(data.map(item => ({ value: item.id, label: item.name })));
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
                const data = response?.data?.docs || [];
                setQualificationOptions(data.map(item => ({ value: item.id, label: item.name })));
            } catch (error) {
                console.error('Error fetching qualifications:', error);
            } finally {
                setLoadingQualifications(false);
            }
        };
        fetchQualification();
    }, []);

    /** -------------------------
     * FORM VALIDATION
     * -------------------------*/
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
        if (!form.address) newErrors.address = 'Work location is required';
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
     * IDENTITY PROOF UPLOAD (Separate API)
     * -------------------------*/
    const uploadIdentityProof = async (jobseekerId, file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('id', jobseekerId);
        formData.append('file', file);

        const token = localStorage.getItem('authToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : null;

        try {
            console.debug('Uploading identity proof:', jobseekerId, file.name);
            const response = await apiRequest(apiRoutes.jobSeekerIdentityProofUpdate, 'POST', formData, headers);
            if (response?.status === 200 || response?.success || response?.data?.status) {
                console.log('✅ Identity proof uploaded successfully');
                return true;
            } else {
                console.warn('❌ Identity proof upload failed:', response);
                return false;
            }
        } catch (error) {
            console.error('Error uploading identity proof:', error);
            return false;
        }
    };

    /** -------------------------
     * FORM SUBMIT
     * -------------------------*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setErrors({});
        setSuccessMsg('');
        setLoading(true);

        try {
            const deviceInfo = await getDeviceInfo();
            const storedVerifyId = localStorage.getItem('verifyId');
            if (storedVerifyId) deviceInfo.verifyId = storedVerifyId;

            const payload = {
                id: form.id || localStorage.getItem('jobseekerId') || undefined,
                gender,
                qualification: form.qualification,
                mobile: form.mobile ? `+91${form.mobile}` : undefined,
                jobType: form.jobType,
                workCategory: form.jobCategory,
                address: form.address,
                latitude: form.latitude,
                longitude: form.longitude,
                deviceInfo,
                aadharNo: idType === 'aadhar' ? form.aadharNo : undefined,
                panNo: idType === 'pan' ? form.panNo : undefined,
                whatsappNo: form.whatsappNo ? `+91${form.whatsappNo}` : undefined,
            };

            const token = localStorage.getItem('authToken');
            const headers = token ? { Authorization: `Bearer ${token}` } : null;

            console.debug('Submitting BasicDetails payload:', payload);
            const response = await apiRequest(apiRoutes.jobSeekerBasicDetail, 'POST', payload, headers);

            const ok = response && (response.success || response.status === 200 || response.data?.status);
            if (ok) {
                // show server message if provided, otherwise fallback
                showSuccess(response?.message || '✅ Basic details submitted successfully!');

                const jobseekerId = payload.id || localStorage.getItem('jobseekerId');
                if (idImage && jobseekerId) {
                    const uploadSuccess = await uploadIdentityProof(jobseekerId, idImage);
                    if (!uploadSuccess) console.warn('Identity proof upload failed.');
                }

                if (typeof onChange === 'function') onChange(payload);
                if (typeof onNext === 'function') onNext();
                else router.push('/mobile-verification');
            } else {
                const msg = response?.message || 'Failed to save details';
                showError(msg);
                setErrors({ api: msg });
            }
        } catch (err) {
            console.error('Error saving basic details:', err);
            showError('Something went wrong. Please try again.');
            setErrors({ api: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    /** -------------------------
     * RENDER
     * -------------------------*/
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
                                onChange={() => {
                                    setGender(g.value);
                                    clearError('gender');
                                }}
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
                    required
                    value={form.mobile}
                    onChange={(e) => {
                        setForm({ ...form, mobile: e.target.value });
                        clearError('mobile');
                    }}
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
                    onSelect={(value) => {
                        handleChange('qualification', value);
                        clearError('qualification');
                    }}
                    placeholder={loadingQualifications ? 'Loading qualifications...' : 'Select qualification'}
                    disabled={loadingQualifications}
                />
                {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
            </div>

            {/* ---------- Job Type ---------- */}
            <div>
                <AutoCompleteInput
                    label="Job Type"
                    required
                    options={jobTypeOptions}
                    value={form.jobType}
                    onSelect={(value) => {
                        handleChange('jobType', value);
                        clearError('jobType');
                    }}
                    placeholder={loadingJobTypes ? 'Loading job types...' : 'Select job type'}
                    disabled={loadingJobTypes}
                />
                {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
            </div>

            {/* ---------- Job Category ---------- */}
            <div>
                <AutoCompleteInput
                    label="Job Category"
                    required
                    options={workCategoryOptions}
                    value={form.jobCategory}
                    onSelect={(value) => {
                        handleChange('jobCategory', value);
                        clearError('jobCategory');
                    }}
                    placeholder={loadingWorkCategory ? 'Loading categories...' : 'Select work category'}
                    disabled={loadingWorkCategory}
                />
                {errors.jobCategory && <p className="text-red-500 text-sm">{errors.jobCategory}</p>}
            </div>

            {/* ---------- ID Type ---------- */}
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
                                onChange={() => {
                                    setIdType(type);
                                    // clear the opposite field error when switching
                                    clearError(type === 'aadhar' ? 'aadharNo' : 'panNo');
                                }}
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
                    required
                    onChange={(e) => {
                        const raw = e.target.value || '';
                        if (idType === 'aadhar') {
                            const v = raw.replace(/\D/g, '').slice(0, 12);
                            setForm((prev) => ({ ...prev, aadharNo: v }));
                            clearError('aadharNo');
                        } else {
                            const v = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
                            setForm((prev) => ({ ...prev, panNo: v }));
                            clearError('panNo');
                        }
                    }}
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

            <div>
                <Input
                    label="Whatsapp Number (optional)"
                    type="tel"
                    value={form.whatsappNo}
                    onChange={(e) => {
                        setForm({ ...form, whatsappNo: e.target.value });
                        clearError('whatsappNo');
                    }}
                    className={`${errors.whatsappNo ? 'border-red-500' : ''}`}
                />
                {errors.whatsappNo && <p className="text-red-500 text-sm">{errors.whatsappNo}</p>}
            </div>

            {/* ---------- Work Location ---------- */}
            <GoogleMapPicker
                label="Work Location"
                required
                initialAddress={formData.address || ''}
                initialLat={formData.latitude || ''}
                initialLng={formData.longitude || ''}
                onLocationSelect={handleLocationSelect}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}


            {/* ---------- Submit ---------- */}
            <Button fullWidth type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Next'}
            </Button>
        </form>
    );
};

export default JobSeekerBasicDetails;

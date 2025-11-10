'use client';
import React, { useEffect } from 'react';
import Icon from '../../../components/layout/AppIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDomains,setSelectedDomainId } from '@/common/store/slices/jobDomainSlice';

const JobTypeSelector = ({ selectedJobType, onJobTypeChange }) => {
  const dispatch = useDispatch();
  const { domains } = useSelector((state) => state.jobDomain);

  const jobTypes = [
    {
      id: 'nearbyjob',
      label: 'Nearby Jobs',
      icon: 'MapPin',
      description: 'Find opportunities in your city and nearby areas',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'international',
      label: 'International Jobs',
      icon: 'Globe',
      description: 'Explore global career opportunities worldwide',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      id: 'contract',
      label: 'Contract Work',
      icon: 'FileText',
      description: 'Freelance and project-based assignments',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  // ✅ Fetch job domains once
  useEffect(() => {
    dispatch(fetchJobDomains());
  }, [dispatch]);

  // 🪄 When user selects a job type
  const handleSelect = (typeId) => {
    onJobTypeChange(typeId);

    const matchedDomain = domains.find(
      (d) => d.name?.toLowerCase() === typeId?.toLowerCase()
    );

    if (matchedDomain) {
      dispatch(setSelectedDomainId(matchedDomain.id));
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Job Interest</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handleSelect(type.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${selectedJobType === type.id
                ? `${type.borderColor} ${type.bgColor} border-solid`
                : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-md ${selectedJobType === type.id ? type.bgColor : 'bg-gray-100'}`}>
                <Icon
                  name={type.icon}
                  size={20}
                  className={selectedJobType === type.id ? type.color : 'text-gray-600'}
                />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${selectedJobType === type.id ? type.color : 'text-gray-900'}`}>
                  {type.label}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobTypeSelector;

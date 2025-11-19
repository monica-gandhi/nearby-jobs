const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiRoutes = {
  //Admin api's
  adminLogin: `${BASE_URL}/auth/login`,
  //Admin api's end

  //Jobseeker api's
  jobSeekerGoogleSignIn: `${BASE_URL}/jobseeker/googleSignUp`,
  jobSeekerNormalSignIn: `${BASE_URL}/jobseeker/signUp`,
  jobSeekerLogin:`${BASE_URL}/jobseeker/login`,
  jobSeekerLogout:`${BASE_URL}/jobseeker/logout`,
  jobSeekerEmailOtp: `${BASE_URL}/jobseeker/emailOtp`,
  jobSeekerEmailVerify: `${BASE_URL}/jobseeker/emailVerification`,
  jobSeekerBasicDetail: `${BASE_URL}/jobseeker/basicDetails`,
  jobSeekerIdentityProofUpdate: `${BASE_URL}/jobseeker/identityProofUpdate`,
  jobSeekerMobileOtp: `${BASE_URL}/jobseeker/mobileOtp`,
  jobSeekerMobileVerify: `${BASE_URL}/jobseeker/mobileVerification`,
  jobSeekerResumeUpload: `${BASE_URL}/jobseeker/resumeUpdate`,
  jobSeekerProfileImageUpdate: `${BASE_URL}/jobseeker/profileImageUpdate`,
  jobSeekerUpdate: `${BASE_URL}/jobseeker/update`,
  getJobSeekersList: `${BASE_URL}/jobseeker/list`,
  viewJobSeeker: `${BASE_URL}/jobseeker/view`,
  updateJobSeeker: `${BASE_URL}/jobseeker/update`,
  deleteJobSeeker: `${BASE_URL}/jobseeker/delete`,
  //Jobseeker api's end

  //Role api's
  getRoles: `${BASE_URL}/role/list`,
  addRole: `${BASE_URL}/role/add`,
  viewRole: `${BASE_URL}/role/view`,
  updateRole: `${BASE_URL}/role/update`,
  deleteRole: `${BASE_URL}/role/delete`,
  //Role api's end

  //Job Type api's
  getJobType: `${BASE_URL}/jobType/list`,
  addJobType: `${BASE_URL}/jobType/add`,
  viewJobType: `${BASE_URL}/jobType/view`,
  updateJobType: `${BASE_URL}/jobType/update`,
  deleteJobType: `${BASE_URL}/jobType/delete`,
  //Job Type api's end

  //Job Domain api's
  getJobDomain: `${BASE_URL}/jobDomain/list`,
  addJobDomain: `${BASE_URL}/jobDomain/add`,
  viewJobDomain: `${BASE_URL}/jobDomain/view`,
  updateJobDomain: `${BASE_URL}/jobDomain/update`,
  deleteJobDomain: `${BASE_URL}/jobDomain/delete`,
  //Job Domain api's end

  //Country api's 
  getCountry: `${BASE_URL}/country/list`,
  addCountry: `${BASE_URL}/country/add`,
  viewCountry: `${BASE_URL}/country/view`,
  updateCountry: `${BASE_URL}/country/update`,
  deleteCountry: `${BASE_URL}/country/delete`,
  //Country api's end

  //Work Category api's
  getWorkCategory: `${BASE_URL}/workCategory/list`,
  addWorkCategory: `${BASE_URL}/workCategory/add`,
  viewWorkCategory: `${BASE_URL}/workCategory/view`,
  updateWorkCategory: `${BASE_URL}/workCategory/update`,
  deleteWorkCategory: `${BASE_URL}/workCategory/delete`,
  //Work Category api's end

  //State api's
  getStates: `${BASE_URL}/state/list`,
  addStates: `${BASE_URL}/state/add`,
  viewStates: `${BASE_URL}/state/view`,
  updateStates: `${BASE_URL}/state/update`,
  deleteStates: `${BASE_URL}/state/delete`,
  //State api's end


  //Qualification api's
  getQualification: `${BASE_URL}/qualification/list`,
  addQualification: `${BASE_URL}/qualification/add`,
  viewQualification: `${BASE_URL}/qualification/view`,
  updateQualification: `${BASE_URL}/qualification/update`,
  deleteQualification: `${BASE_URL}/qualification/delete`,
  //Qualification api's end
};
export default apiRoutes;

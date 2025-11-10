export const getRoleFromId = (id) => {
  if (!id) return null;
  if (id.startsWith("Admin")) return "admin";
  if (id.startsWith("Applicant")) return "applicant";
  if (id.startsWith("Employer")) return "employer";
  return null;
};
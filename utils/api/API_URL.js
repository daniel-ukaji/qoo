// Auth
export const ENROllMENT = "authentication/initiate-enrollment";
export const COMPLETE_ENROLLMENT = "authentication/complete-enrollment";
export const RESEND_OTP = "authentication/resend-otp";
export const LOGIN = "authentication/login";
export const ME = "authentication/user-details";
export const PASSWORD_RESET = "authentication/initiate-password-reset";
export const COMPLETE_PASSWORD_RESET = "authentication/complete-password-reset";

// Properties
export const GETPROPETIES = "property/read";
export const GETPROPERTY = "property/read-by-property-id";
export const GETPROPERTYHOSTID = "property/read-by-host-id";
export const UPDATEPROPERTY = "property/update";
export const EDITPROPERTYBYID = "property/read-by-property-name";
export const CREATEPROPERTY = "property/create"


// Bookings
export const GETBOOKING = "booking/read-by-host-id";
export const GETBOOKINGS = "booking/read";
export const CREATEBOOKINGS = "booking/create";
export const GETBOOKINGRENTER = "booking/read-by-user-id";
export const SCHEDULEBOOKINGS = "booking/schedule-inspection";

// Payment
export const CREATEPAYMENT = "payment/create-payment";
export const VERIFYPAYMENT = "payment/verify-payment";
export const PAYOUT = "payment/payout";
export const ADDPAYOUT = "user/add-payout-account";

// User
export const VERIFYPROFILE = "user/verify-profile";
export const UPDATEPROFILE = "User/update";
export const READBYUSERID = "user/read-by-user-id";

// Image
export const IMAGEURL = "uploadimage2s3"


"use server";

// Helper function to verify authentication
// Replace this logic with your actual auth library (e.g., auth() from NextAuth/Auth.js)
async function checkAuth() {
  // const session = await auth();
  // if (!session) throw new Error("Unauthorized");
  // return session;

  const isAuthenticated = false; // FIXME: Implement actual auth logic
  if (!isAuthenticated) {
    throw new Error("Unauthorized access attempt.");
  }
}

export async function sendSubscribeData(
  prevState: unknown,
  subscribeFormData: FormData,
) {
  // 1. Authorize the user before executing any API call
  await checkAuth();
  // Perform server-side processing with the form data
  subscribeFormData.append("_wpcf7_unit_tag", "65f4655");

  try {
    const response = await fetch(
      `https://api.chevronyeshiva.org/wp-json/contact-form-7/v1/contact-forms/2703/feedback`,
      {
        method: "POST",
        body: subscribeFormData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to send form data.");
    }

    const result = await response.json();

    if (result.invalid_fields && result.invalid_fields.length > 0) {
      result.invalid_fields_object = {};
      result.invalid_fields.forEach((field: any) => {
        result.invalid_fields_object[field.field] = field.message;
      });
    }
    result.payload = subscribeFormData;

    //console.log("Form data sent successfully:", result);
    return result;
  } catch (error) {
    //console.error("Error sending form data:", error);
    //throw error;
    return {
      success: false,
      error: "Failed to send form data.",
      message: "An unexpected error occurred. Please try again later.",
      payload: subscribeFormData,
    };
  }
}

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

export async function sendFormData(prevState: unknown, formData: FormData) {
  try {
    // 1. Authorize the user before executing any API call
    await checkAuth();

    formData.append("_wpcf7_unit_tag", "b1eeb74");

    const response = await fetch(
      "https://api.chevronyeshiva.org/wp-json/contact-form-7/v1/contact-forms/2049/feedback",
      {
        method: "POST",
        body: formData,
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

    result.payload = formData;
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to send form data.",
      message:
        error.message === "Unauthorized access attempt."
          ? "You must be logged in to perform this action."
          : "An unexpected error occurred. Please try again later.",
      payload: formData,
    };
  }
}

export async function sendSubscribeData(
  prevState: unknown,
  formData: FormData,
) {
  try {
    // 1. Authorize the user before executing any API call
    await checkAuth();

    formData.append("_wpcf7_unit_tag", "66876f8");

    const response = await fetch(
      "https://api.chevronyeshiva.org/wp-json/contact-form-7/v1/contact-forms/2790/feedback",
      {
        method: "POST",
        body: formData,
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

    result.payload = formData;
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to send form data.",
      message:
        error.message === "Unauthorized access attempt."
          ? "You must be logged in to perform this action."
          : "An unexpected error occurred. Please try again later.",
      payload: formData,
    };
  }
}

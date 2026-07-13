"use server";

export async function sendSubscribeData(
  prevState: unknown,
  subscribeFormData: FormData,
) {
  // Perform server-side processing with the form data
  const email = subscribeFormData.get("form-email") as string;
  console.log("Email:", email);
  console.log("Form Data:", subscribeFormData);
  // Perform server-side processing with the form data
  subscribeFormData.append("_wpcf7_unit_tag", "0bfccca");

  try {
    const response = await fetch(
      `https://dovp7.sg-host.com/wp-json/contact-form-7/v1/contact-forms/2702/feedback`,
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
      result.payload = subscribeFormData;
    }

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

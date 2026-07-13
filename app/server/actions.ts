"use server";

export async function sendFormData(prevState: unknown, formData: FormData) {
  //   const name = formData.get("form-name") as string;
  //   const family = formData.get("form-family") as string;
  //   const phone = formData.get("form-phone") as string;
  //   const email = formData.get("form-email") as string;
  //   const message = formData.get("form-message") as string;

  // Perform server-side processing with the form data
  formData.append("_wpcf7_unit_tag", "b1eeb74");
  // For example, you can send an email, store it in a database, etc.
  try {
    const response = await fetch(
      "https://dovp7.sg-host.com/wp-json/contact-form-7/v1/contact-forms/2049/feedback",
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
      result.payload = formData;
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
      payload: formData,
    };
  }

  // Simulating a delay for demonstration purposes
  //await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a response or any relevant data
  //return { success: true, name, family, phone, email, message };
}

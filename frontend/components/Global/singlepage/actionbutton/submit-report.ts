"use server";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

interface FormDataProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  title: string;
  currentPageUrl: string;
}

export async function submitReport({
  firstName,
  lastName,
  email,
  message,
  title,
  currentPageUrl,
}: FormDataProps) {
  // console.log("working");
  const SUBMIT_FORM = gql`
    mutation SubmitGfForm($id: ID!, $fieldValues: [FormFieldValuesInput!]!) {
      submitGfForm(input: { id: $id, fieldValues: $fieldValues }) {
        entry {
          id
        }
        confirmation {
          type
          message # The message HTML - if the confirmation type is a "MESSAGE".
          url # The redirect URL - if the confirmation type is a "REDIRECT".
        }
        errors {
          message
        }
      }
    }
  `;
  // console.log(formData);

  const fieldValues = [
    {
      id: 9,
      nameValues: {
        first: firstName,
        last: lastName,
      },
    },
    {
      id: 4,
      emailValues: {
        value: email,
      },
    },
    {
      id: 6,
      value: message,
    },
    {
      id: 8,
      value: title,
    },
    {
      id: 7,
      value: currentPageUrl,
    },
  ];

  // console.log(fieldValues);
  try {
    const { data } = await getClient().mutate({
      mutation: SUBMIT_FORM,
      variables: {
        id: "2",
        fieldValues: fieldValues,
      },
      context: {
        headers: {
          Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
        },
      },
    });
    // console.log(data);

    // if (data.submitGfForm.errors) {
    //   throw new Error(data.submitGfForm.errors[0].message);
    // }

    return { success: true, successMessage: "Report submitted successfully!" };
  } catch (error) {
    // console.error("Error submitting form:", error);
    return { error: true, errorMessage: "Failed to submit form" };
  }
}

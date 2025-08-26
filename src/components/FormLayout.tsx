import React from "react";

interface FormLayoutProps {
  title: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  submitText?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  onSubmit,
  children,
  submitText = "Submit",
}) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-6 max-w-4xl w-full mx-auto">
      {/* Title */}
      <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>

      {/* Form Content */}
      <div className="space-y-6">{children}</div>

      {/* Submit Button (opsional) */}
      {onSubmit && (
        <div className="pt-2">
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          >
            {submitText}
          </button>
        </div>
      )}
    </div>
  );
};

export default FormLayout;
